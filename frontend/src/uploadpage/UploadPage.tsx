import {ArrowUpOnSquareIcon} from  "@heroicons/react/24/outline"
import processImage from "../process/extract.mjs";
import React, { useState } from "react";
import { TEST_DATA } from "../fridge/TestData";
import ImageUploading from "react-images-uploading";
import { update } from "firebase/database";
import LoadingPage from "./LoadingPage";
import { ItemRow } from "../components/Table";


function diff_days(purchaseDate: string) {
  const today = new Date();
  const _purchaseDate = new Date(purchaseDate);
  const diffTime = Math.abs(today.getTime() - _purchaseDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
  
function UploadPage(){
    const [images, setImages] = useState([]);
    const [rows, setRows] = useState(TEST_DATA);
    const maxNumber = 69;
    const [loading, setLoading] = useState(false)

    const uploadIconStyles = "max-w-[30vw] max-h-[30vw] stroke-gray-200 pt-10";

    const onChange = async (imageList: any, addUpdateIndex: any) => {
		// data for submit
        console.log("ImageList")
		console.log(imageList)
        console.log("here")
		setImages(imageList);
        localStorage.setItem('images', imageList);
        setLoading(true)
		const response = await processImage(imageList[0]["data_url"]);
        setLoading(false)

		console.log(response);
        
		// set the response ({items: ['Apple', 'Banana', ...]  expirationInfo: ['123', '43', ... ]}) to the form
		const newRows: ItemRow[] = [];
		console.log("response.items.length");
		console.log(response.items.length);

        /*
export interface ItemRow {
	image: any;
	item: string;
	expirationInfo: string;
	daysUntilExpiration: number;
	daysSincePurchase: number;
}
        */
		for (let i = 0; i < response.items.length; i++) {
			newRows.push({
				image: response.unicodes[i],
				item: response.items[i],
				expirationInfo: response.expirationInfo[i],
				daysUntilExpiration: response.expirationDays[i],
				daysSincePurchase:  diff_days(response.purchaseDate)
			});
		}
		console.log("newRows");
		console.log(newRows);
		setRows([...rows, ...newRows]); // rows is current state 

        const currentRows = JSON.parse(localStorage.getItem('rows') || '[]');
        const updatedRows = [...currentRows, ...newRows];
        var stringifiedUpdatedRows = JSON.stringify(updatedRows)
        console.log("ABc1233")
        console.log(stringifiedUpdatedRows)
        localStorage.setItem('rows', stringifiedUpdatedRows )

        // need custom event handlers for local storage changes
        window.dispatchEvent(new CustomEvent('SessionStorageChange', { detail: { key:'rows' ,value: stringifiedUpdatedRows } }));

	};

    return (
			<div className="flex h-screen flex-col items-center overflow-auto">
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
										<div
											key={index}
											className="flex flex-col items-center text-center"
										>
											<div className="flex flex-grow items-center mt-16 w-3/4">
												<img src={image["data_url"]} alt="" />
											</div>
											<div className="flex flex-col mt-12 flex flex-col space-y-4">
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