/* eslint-disable @typescript-eslint/no-explicit-any */
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
			expirationInfo: "",
			daysUntilExpiration: "",
			daysSincePurchase: ""
		}
	);
	const [errors, setErrors] = useState("");

	const validateForm = () => {
		if (
			formState.image &&
			formState.item &&
			formState.expirationInfo &&
			formState.daysUntilExpiration &&
			formState.daysSincePurchase
		) {
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
						<label htmlFor="expirationInfo">Expiration Info</label>
						<input name="expirationInfo" onChange={handleChange} value={formState.expirationInfo} />
					</div>
					<div className="form-group">
						<label htmlFor="daysUntilExpiration">Days Until Expiration</label>
						<input
							name="daysUntilExpiration"
							onChange={handleChange}
							value={formState.daysUntilExpiration}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="daysSincePurchase">Days Since Purchase</label>
						<input
							name="daysSincePurchase"
							onChange={handleChange}
							value={formState.daysSincePurchase}
						/>
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
