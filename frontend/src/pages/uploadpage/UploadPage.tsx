/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../themes/styles.css";

import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { update } from "firebase/database";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";

import { TEST_DATA } from "../../components/fridge/TestData";
import { ItemRow } from "../../components/table/Table";
import processImage from "../../process/extract.mjs";
import LoadingPage from "./LoadingPage";

function diff_days(purchaseDate: string) {
	const today = new Date();
	const _purchaseDate = new Date(purchaseDate);
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

function Upload(props: any) {
	const [images, setImages] = useState([]);
	const [rows, setRows] = useState(TEST_DATA);
	const maxNumber = 69;
	const [loading, setLoading] = useState(false);

	const uploadIconStyles = "max-w-[30vw] max-h-[30vw] stroke-gray-200 pt-10";

	const onChange = async (imageList: any, addUpdateIndex: any) => {
		// data for submit
		console.log("ImageList");
		console.log(imageList);
		console.log("here");
		setImages(imageList);
		localStorage.setItem("images", imageList);
	};

	const onSubmit = async () => {
		setLoading(true);
		const response = await processImage(images[0]["data_url"]);

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
				daysSincePurchase: diff_days(response.purchaseDate)
			});
		}
		console.log("newRows");
		console.log(newRows);
		setRows([...rows, ...newRows]);

		const currentRows = JSON.parse(localStorage.getItem("rows") || "[]");
		const updatedRows = [...currentRows, ...newRows];
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

	console.log(loading);

	return (
		<ImageUploading
			multiple
			value={images}
			onChange={onChange}
			maxNumber={maxNumber}
			dataURLKey="data_url"
		>
			{({
				imageList,
				onImageUpload,
				onImageRemoveAll,
				onImageUpdate,
				onImageRemove,
				isDragging,
				dragProps
			}) => (
				<div className="flex flex-col items-center justify-center">
					{!loading && (
						<div className="flex flex-col items-center justify-center">
							<div className="HomePageTitle mt-6"> Add Items </div>
							<ArrowUpOnSquareIcon className={props.uploadIconStyles} />
							<p className=" UploadDescription mx-20 max-w-md pt-6 text-center">
								{" "}
								Hit the green button down below to add items from your receipt!{" "}
							</p>
						</div>
					)}
					<div className="upload__image-wrapper items-center text-white">
						{imageList.length == 0 && !loading && (
							<button
								style={isDragging ? { color: "red" } : undefined}
								className="mb-4 mt-8 rounded-2xl bg-green-500 px-20 py-4"
								onClick={onImageUpload}
								{...dragProps}
							>
								Upload
							</button>
						)}
						&nbsp;
						{!loading &&
							imageList.map((image, index) => (
								<div key={index} className="UploadBtnCol flex flex-col items-center text-center">
									<div className="mt-16 flex w-3/4 flex-grow items-center">
										<img src={image["data_url"]} alt="" />
									</div>
									<div className="mt-12 flex flex flex-col flex-col space-y-4">
										<button
											className="rounded-2xl bg-green-500 px-20 py-4"
											onClick={() => onImageUpdate(index)}
										>
											Update
										</button>
										<button
											className="rounded-2xl bg-green-500 px-20 py-4"
											onClick={() => onImageRemove(index)}
										>
											Remove
										</button>
										<button
											className="rounded-2xl bg-green-500 px-20 py-4"
											onClick={() => onSubmit()} // i think?
										>
											Submit Image
										</button>
									</div>
								</div>
							))}
						{loading && <LoadingPage></LoadingPage>}
					</div>
				</div>
			)}
		</ImageUploading>
	);
	return (
		<div className="upPage flex h-screen flex-col items-center overflow-auto">
			<h1 className="HomePageTitle mt-6"> Add Items </h1>
			{images.length === 0 && (
				<div className="flex flex-grow flex-col items-center justify-center">
					<ArrowUpOnSquareIcon className={uploadIconStyles} />
					<p className=" UploadDescription mx-20 max-w-md pt-6 text-center">
						{" "}
						Hit the green button down below to add items from your receipt!{" "}
					</p>
				</div>
			)}
			<div className="mb-20 px-4">
				<ImageUploading
					multiple
					value={images}
					onChange={onChange}
					maxNumber={maxNumber}
					dataURLKey="data_url"
				>
					{({
						imageList,
						onImageUpload,
						onImageRemoveAll,
						onImageUpdate,
						onImageRemove,
						isDragging,
						dragProps
					}) => (
						// write your building UI
						// check that this updates the image list?
						<div className="upload__image-wrapper items-center text-white">
							{imageList.length == 0 && (
								<button
									style={isDragging ? { color: "red" } : undefined}
									className="mb-4 mt-8 rounded-2xl bg-green-500 px-20 py-4"
									onClick={onImageUpload}
									{...dragProps}
								>
									Upload
								</button>
							)}
							&nbsp;
							{imageList.length > 0 &&
								imageList.map((image, index) => (
									<div key={index} className="flex flex-col items-center text-center">
										<div className="mt-16 flex w-3/4 flex-grow items-center">
											<img src={image["data_url"]} alt="" />
										</div>
										<div className="mt-12 flex flex flex-col flex-col space-y-4">
											<button
												className="rounded-2xl bg-green-500 px-20 py-4"
												onClick={() => onImageUpdate(index)}
											>
												Update
											</button>
											<button
												className="rounded-2xl bg-green-500 px-20 py-4"
												onClick={() => onImageRemove(index)}
											>
												Remove
											</button>
											<button
												className="rounded-2xl bg-green-500 px-20 py-4"
												onClick={() => onChange(image, index)} // i think?
											>
												Submit Image
											</button>
										</div>
									</div>
								))}
						</div>
					)}
				</ImageUploading>
			</div>
		</div>
	);
}
export default UploadPage;
