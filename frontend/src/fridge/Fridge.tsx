import "./Fridge.css";
import "../themes/styles.css";

import { useState } from "react";
import ImageUploading from "react-images-uploading";

import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import processImage from "../process/extract.mjs";

function Fridge() {
	const [images, setImages] = useState([]);
	const maxNumber = 69;

	const onChange = async (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		setImages(imageList);

		const response = await processImage(imageList[0]["data_url"]);
		console.log(response);

		// set the response ({items: ['Apple', 'Banana', ...]  expirationDays: ['123', '43', ... ]}) to the form
		const newRows = [];
		console.log("response.items.length");
		console.log(response.items.length);
		for (let i = 0; i < response.items.length; i++) {
			newRows.push({
				image: "UP",
				item: response.items[i],
				days: response.expirationDays[i]
			});
		}
		console.log("newRows");
		console.log(newRows);
		setRows([...rows, ...newRows]);
	};

	const [modalOpen, setModalOpen] = useState(false);
	const [rows, setRows] = useState([
    {
      image: 'FB',
      item: 'Fresh Broccoli',
      days: 14,
    },
    {
      image: 'BG',
      item: 'Black Grapes',
      days: 7,
    },
    {
      image: 'AV',
      item: 'Avocado',
      days: 7,
    },
	]);
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
		<div className="Fridge">
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
					dragProps
				}) => (
					// write your building UI
					<div className="upload__image-wrapper">
						<button
							style={isDragging ? { color: "red" } : undefined}
							onClick={onImageUpload}
							{...dragProps}
						>
							Click or Drop here
						</button>
						&nbsp;
						<button onClick={onImageRemoveAll}>Remove all images</button>
						{imageList.map((image, index) => (
							<div key={index} className="image-item">
								<img src={image["data_url"]} alt="" width="100" />
								<div className="image-item__btn-wrapper">
									<button onClick={() => onImageUpdate(index)}>Update</button>
									<button onClick={() => onImageRemove(index)}>Remove</button>
								</div>
							</div>
						))}
					</div>
				)}
			</ImageUploading>
			<button onClick={() => setModalOpen(true)} className="Button large green mt-8">
				Add
			</button>
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
