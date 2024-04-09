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
    const uploadIconStyles = "max-w-[30vw] max-h-[30vw] stroke-gray-200 pt-10";


    return(

        <div className="flex flex-col h-screen items-center pt-20">
            <h1 className="HomePageTitle pt-10"> Add Items </h1>
            <ArrowUpOnSquareIcon className={uploadIconStyles}/>
            <p className=" max-w-md pt-10 text-center UploadDescription"> Hit the green button down below to add items from your recipt </p>
            <Upload/>

        </div>
    );
}

  
function Upload(){
    const [images, setImages] = useState([]);
    const [rows, setRows] = useState(TEST_DATA);
    const maxNumber = 69;
    const [loading, setLoading] = useState(false)

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

    return(
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
          dragProps,
        }) => (
          // write your building UI
          // check that this updates the image list?
          <div className="upload__image-wrapper items-center">
            {imageList.length == 0 && (
              <button
                style={isDragging ? { color: 'red' } : undefined}
                className="Button large green mt-8 mb-4"
                onClick={onImageUpload}
                {...dragProps}
              >
                Upload Receipt 
              </button>
            )}
            &nbsp;
            {imageList.length > 0 && imageList.map((image, index) => (
              <div key={index} className="image-item flex flex-col items-center">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper mt-2 space-x-2">
                  <button
                    className="Button large green mb-4"
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </button>
                  <button
                    className="Button large green mb-4"
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </button>
                  <button
                    className="Button large green mb-4"
                    onClick={() => onChange(image,index)} // i think?
                  >
                    Submit Image
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    )

}
export default UploadPage;