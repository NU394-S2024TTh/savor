import "./Fridge.css";
import "../themes/styles.css";

import { useState } from "react";
import ImageUploading from "react-images-uploading";

import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import processImage from "../process/extract.mjs";
import { TEST_DATA } from "./TestData";

function Fridge() {
	const [images, setImages] = useState([]);
	const maxNumber = 69;

	const onChange = async (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		setImages(imageList);

		const response = await processImage(imageList[0]["data_url"]);
		console.log(response);

		// set the response ({items: ['Apple', 'Banana', ...]  expirationInfo: ['123', '43', ... ]}) to the form
		const newRows = [];
		console.log("response.items.length");
		console.log(response.items.length);
		for (let i = 0; i < response.items.length; i++) {
			newRows.push({
				image: "UP",
				item: response.items[i],
        days: 5,
			});
		}
		console.log("newRows");
		console.log(newRows);
		setRows([...rows, ...newRows]);
	};

	const [modalOpen, setModalOpen] = useState(false);
	const [rows, setRows] = useState(TEST_DATA);
	const [rowToEdit, setRowToEdit] = useState(null);

	const handleDeleteRow = (targetIndex: number) => {
		setRows(rows.filter((_, idx) => idx !== targetIndex));
	};

	const handleEditRow = (idx: null) => {
		setRowToEdit(idx);

		setModalOpen(true);
	};

	const handleSubmit = (newRow: any) => {
		rowToEdit === null
			? setRows([...rows, newRow])
			: setRows(
					rows.map((currRow, idx) => {
						if (idx !== rowToEdit) return currRow;

						return newRow;
					})
				);
	};

	return (
    <div className="Fridge flex flex-col items-center">
      <button onClick={() => setModalOpen(true)} className="Button large green mt-8 mb-4">
        Add Item
      </button>
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />

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
            {imageList.map((image, index) => (
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
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default Fridge;
