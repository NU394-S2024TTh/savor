/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "./Modal.css";

import React, { useState } from "react";
interface ModalProps {
	closeModal: () => void;
	onSubmit: (newRow: any) => void;
	defaultValue: any;
}

export const Modal: React.FC<ModalProps> = ({ closeModal, onSubmit, defaultValue }) => {
	const [formState, setFormState] = useState(
		defaultValue || {
			image: "",
			item: "",
			days: ""
		}
	);
	const [errors, setErrors] = useState("");

	const validateForm = () => {
		if (formState.image && formState.item && formState.days) {
			setErrors("");
			return true;
		} else {
			const errorFields = [];
			for (const [key, value] of Object.entries(formState)) {
				if (!value) {
					errorFields.push(key);
				}
			}
			setErrors(errorFields.join(", "));
			return false;
		}
	};

	const handleChange = (e: any) => {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (!validateForm()) return;

		onSubmit(formState);

		closeModal();
	};

	return (
		<div
			className="modal-container"
			onClick={(e) => {
				if ((e.target as HTMLElement).className === "modal-container") closeModal();
			}}
		>
			<div className="modal">
				<form>
					<div className="form-group">
						<label htmlFor="image">Item Image</label>
						<input name="image" onChange={handleChange} value={formState.image} />
					</div>
					<div className="form-group">
						<label htmlFor="item">Item Name</label>
						<input name="item" onChange={handleChange} value={formState.item} />
					</div>
					<div className="form-group">
						<label htmlFor="days">Days Remaining</label>
						<input name="days" onChange={handleChange} value={formState.days} />
					</div>
					{errors && <div className="error">{`Please include: ${errors}`}</div>}
					<button type="submit" className="btn" onClick={handleSubmit}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
