/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../themes/styles.css";

import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { get, set } from "firebase/database";
import { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";

import { ItemRow } from "../../components/table/Table";
import { useUserItemsRef } from "../../firebase/firebasefunctions";
import processImage from "../../process/extract.mjs";
import LoadingPage from "./LoadingPage";
import PurchaseDateSelectionPage from "./PurchaseDateSelectionPage";

function diff_days(purchaseDate: string) {
	const today = new Date();
	let _purchaseDate = new Date(purchaseDate);
	if (isNaN(_purchaseDate.getDate())) {
		_purchaseDate = new Date();
	}
	const diffTime = Math.abs(today.getTime() - _purchaseDate.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays;
}

function UploadPage() {
	const uploadIconStyles = "max-w-[30vw] max-h-[30vw] stroke-gray-200 pt-10";
	return (
		<div className="flex h-full flex-col items-center bg-[#faf9f6]">
			<Upload uploadIconStyles={uploadIconStyles} />
		</div>
	);
}

export interface Response {
	items: string[];
	unicodes: string[];
	expirationInfo: string[];
	expirationDays: number[];
	purchaseDate: string;
}

function Upload(props: any) {
	const [images, setImages] = useState([]);
	const [rows, setRows] = useState<ItemRow[]>([]);
	const maxNumber = 69;
	const [loading, setLoading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	const [noPurchaseDate, setNoPurchaseDate] = useState(false);

	const userRef = useUserItemsRef();

	useEffect(() => {
		get(userRef)
			.then((snapshot) => {
				if (snapshot.exists()) {
					setRows(snapshot.val());
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	const [response, setResponse] = useState<Response | null>(null);

	const onChange = async (imageList: any) => {
		// data for submit
		console.log("ImageList");
		console.log(imageList);
		console.log("here");
		setImages(imageList);
		localStorage.setItem("images", imageList);
	};

	const onSubmit = async () => {
		setLoading(true);
		const res = await processImage(images[0]["data_url"]);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setResponse(res!);
	};
	const processResponse = () => {
		if (response == null) {
			console.error("response is null", "color: black;");
			setLoading(false);
			return;
		}
		if (response.purchaseDate == "") {
			console.warn("No purchase date found in the receipt", "color: black;");
			setNoPurchaseDate(true);
			setLoading(false);
			return;
		}

		console.log(response);
		setLoading(false);

		const newRows: ItemRow[] = [];
		console.log("response.items.length");
		console.log(response.items.length);

		for (let i = 0; i < response.items.length; i++) {
			newRows.push({
				image: response.unicodes[i],
				item: response.items[i],
				expirationInfo: response.expirationInfo[i],
				daysUntilExpiration: response.expirationDays[i],
				daysSincePurchase: diff_days(response.purchaseDate),
				id: i
			});
		}
		console.log("newRows");
		console.log(newRows);

		setRows([...rows, ...newRows]);

		const currentRows = JSON.parse(localStorage.getItem("rows") || "[]");
		const updatedRows = [...currentRows, ...newRows];
		set(userRef, [...rows, ...newRows]);
		const stringifiedUpdatedRows = JSON.stringify(updatedRows);
		console.log("ABc1233");
		console.log(stringifiedUpdatedRows);
		localStorage.setItem("rows", stringifiedUpdatedRows);

		window.dispatchEvent(
			new CustomEvent("SessionStorageChange", {
				detail: { key: "rows", value: stringifiedUpdatedRows }
			})
		);
	};
	useEffect(processResponse, [response]);

	useEffect(() => {
		if (rows.length != 0 && userRef) {
			set(userRef, rows);
		}
	}, [rows]);
	console.log("loading: ", loading);
	return (
		<ImageUploading
			multiple
			value={images}
			onChange={onChange}
			maxNumber={maxNumber}
			dataURLKey="data_url"
			allowNonImageType={true}
		>
			{({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
				<div className="UploadBtnCol flex flex-col items-center justify-center">
					{!loading && !noPurchaseDate && (
						<div className="flex flex-col items-center justify-center">
							<div className="HomePageTitle mt-6 flex items-center justify-center"> Add Items </div>
							{!isUploaded && (
								<>
									<ArrowUpOnSquareIcon className={props.uploadIconStyles} />
									<p className=" UploadDescription pt-6 text-center">
										{" "}
										Hit the green button down below to add items from your receipt! (only jpg, jpeg,
										png are supported){" "}
									</p>
								</>
							)}
						</div>
					)}
					<div className="upload__image-wrapper items-center text-white">
						{imageList.length == 0 && !loading && (
							<button
								style={isDragging ? { color: "red" } : undefined}
								className="mb-4 mt-8 rounded-2xl bg-green-500 px-20 py-4"
								onClick={() => {
									onImageUpload();
									setIsUploaded(true);
								}}
								{...dragProps}
							>
								Upload
							</button>
						)}
						&nbsp;
						{!loading &&
							!noPurchaseDate &&
							imageList.map((image, index) => (
								<div key={index} className="UploadBtnCol flex flex-col items-center text-center">
									<div className="mt-16 flex w-3/4 flex-grow items-center">
										<img src={image["data_url"]} alt="" />
									</div>
									<div className="mt-12 flex flex flex-col flex-col space-y-4">
										<button
											className="rounded-2xl bg-green-500 px-20 py-4"
											onClick={() => {
												onImageUpdate(index);
												setIsUploaded(true);
											}}
										>
											Update
										</button>
										<button
											className="rounded-2xl bg-green-500 px-20 py-4"
											onClick={() => {
												onImageRemove(index);
												setIsUploaded(false);
											}}
										>
											Remove
										</button>
										<button
											className="rounded-2xl bg-green-500 px-20 py-4"
											onClick={() => onSubmit()}
										>
											Submit Image
										</button>
									</div>
								</div>
							))}
						{loading && !noPurchaseDate && <LoadingPage></LoadingPage>}
						{noPurchaseDate && (
							<PurchaseDateSelectionPage
								setResponse={setResponse}
								setNoPurchaseDate={setNoPurchaseDate}
							/>
						)}
					</div>
				</div>
			)}
		</ImageUploading>
	);
}
export default UploadPage;
