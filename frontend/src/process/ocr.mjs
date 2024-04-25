/* eslint-disable @typescript-eslint/no-unused-vars */
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { db, storage } from "../firebase/firebase";

// OCR processing by Firebase Extensions: extractText function
// (https://extensions.dev/extensions/googlecloud/storage-extract-image-text)
// 1. upload image to Google Cloud Storage
// 2. extractText extension does the OCR processing:
//   a. the image is processed by the extractText function listening to the storage bucket
//   b. the extracted text is stored in Firestore
// 3. the extracted text is queried from Firestore

export const OCR = (file) => {
	return new Promise((resolve, reject) => {
		const uuid = uuidv4();
		console.log("uuid:", uuid);
		const imageRef = ref(storage, `receipts/${uuid}`);
		uploadBytes(imageRef, file).then(
			(snapshot) => {
				console.log("Uploaded a blob or file!", snapshot);
				// get the download URL
				getDownloadURL(snapshot.ref).then(async (url) => {
					console.log("File available at", url);
					// add the download URL to the realtime database
					// addImageURL(userId, url);

					// get the extractedText result by querying the Firestore database with the file path
					const metadata = snapshot.metadata;
					const fullUrl = `gs://${metadata.bucket}/${metadata.fullPath}`;
					console.log("fullUrl:", fullUrl);

					let extractedText = "";
					const extractedTextsRef = collection(db, "extractedText");
					const q = query(extractedTextsRef, where("file", "==", fullUrl));
					const unsubscribe = onSnapshot(q, (snapshot) => {
						console.log("snapshot:", snapshot);
						snapshot.docChanges().forEach((change) => {
							const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";
							// console.log(source, " data: ", change.doc.data());
							if (change.type === "added") {
								console.log("New extracted text:", change.doc.data());
								extractedText = change.doc.data().text;
								unsubscribe();
								resolve(extractedText);
							}
						});
					});
				});
			},
			(error) => {
				console.error("Error uploading image:", error);
				reject(error);
			}
		);
	});
};
