import "./Fridge.css";
import "../themes/styles.css";

import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";

import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import processImage from "../process/extract.mjs";
import { database } from "./../firebase/firebase";

interface ItemRow {
	image: any;
	item: string;
	expirationInfo: string;
	purchaseDate: string;
}

function Fridge() {
	const [images, setImages] = useState([]);
	const maxNumber = 69;
	const [modalOpen, setModalOpen] = useState(false);
	const [rows, setRows] = useState([]);
	const [rowToEdit, setRowToEdit] = useState(null);
	const updateQuery = ref(database, "items");

	const onChange = async (imageList: any, addUpdateIndex: any) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		setImages(imageList);

		const response = await processImage(imageList[0]["data_url"]);
		console.log(response);

		// set the response ({items: ['Apple', 'Banana', ...]  expirationInfo: ['123', '43', ... ]}) to the form
		const newRows: ItemRow[] = [];
		console.log("response.items.length");
		console.log(response.items.length);
		for (let i = 0; i < response.items.length; i++) {
			newRows.push({
				image: "UP",
				item: response.items[i],
				expirationInfo: response.expirationInfo[i],
				purchaseDate: new Date().toISOString()
			});
		}
		console.log("newRows");
		console.log(newRows);
		const allRows = [...rows, ...newRows];
		setRows(allRows);
		console.log("allRows");
		console.log(allRows);
		set(updateQuery, allRows);
	};

	const handleDeleteRow = (targetIndex: number) => {
		const allRowsCopy = [...rows];
		delete allRowsCopy[targetIndex];
		setRows(rows.filter((_, idx) => idx !== targetIndex));
		set(updateQuery, allRowsCopy);
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

	useEffect(() => {
		const query = ref(database, "items");
		return onValue(query, (snapshot) => {
			setRows([]);
			const data = snapshot.val();

			if (snapshot.exists()) {
				Object.values(data).map((item) => {
					setRows((items) => [...items, item]);
				});
			}
		});
	}, []);

	return (
		<div className="Fridge flex min-h-screen flex-col items-center">
			<button onClick={() => setModalOpen(true)} className="Button large green mb-4 mt-8">
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
					dragProps
				}) => (
					// write your building UI
					<div className="upload__image-wrapper items-center">
						{imageList.length == 0 && (
							<button
								style={isDragging ? { color: "red" } : undefined}
								className="Button large green mb-4 mt-8"
								onClick={onImageUpload}
								{...dragProps}
							>
								Upload Receipt
							</button>
						)}
						&nbsp;
						{imageList.map((image, index) => (
							<div key={index} className="image-item flex flex-col items-center">
								<img src={image["data_url"]} alt="" width="100" />
								<div className="image-item__btn-wrapper mt-2 space-x-2">
									<button className="Button large green mb-4" onClick={() => onImageUpdate(index)}>
										Update
									</button>
									<button className="Button large green mb-4" onClick={() => onImageRemove(index)}>
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
