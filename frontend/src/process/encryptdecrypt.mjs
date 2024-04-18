import CryptoJS from "crypto-js";
import { get, ref } from "firebase/database";

import { database } from "../firebase/firebase";

// redefine to whatever key you want, follow AES key encryption rules. these are stock and are not safe
var key = "6268890F-9B58-484C-8CDC-34F9C6A9";
var iv = "6268890F-9B58-48";

function decryptAES(ciphertext, key, iv) {
	var ciphertextWA = CryptoJS.enc.Hex.parse(ciphertext);
	var keyWA = CryptoJS.enc.Utf8.parse(key);
	var ivWA = CryptoJS.enc.Utf8.parse(iv);
	var ciphertextCP = { ciphertext: ciphertextWA };
	var decrypted = CryptoJS.AES.decrypt(ciphertextCP, keyWA, { iv: ivWA });
	return decrypted.toString(CryptoJS.enc.Utf8);
}

// function encryptAES(plaintext, key, iv) {
// 	var keyWA = CryptoJS.enc.Utf8.parse(key);
// 	var ivWA = CryptoJS.enc.Utf8.parse(iv);
// 	var encrypted = CryptoJS.AES.encrypt(plaintext, keyWA, { iv: ivWA });
// 	return encrypted.cip hertext.toString(CryptoJS.enc.Hex);
// }

async function getEncryptedAPIKey() {
	try {
		const snapshot = await get(ref(database, "/openai_api_key"));
		if (snapshot.exists()) {
			const data = snapshot.val();
			return data;
		} else {
			return null; // or appropriate fallback value
		}
	} catch (error) {
		console.error(error);
		return null; // or re-throw the error, depending on how you want to handle failures
	}
}

export async function getOpenAIAPIKey() {
	const encryptedKey = await getEncryptedAPIKey();
	const apiKey = decryptAES(encryptedKey, key, iv);
	return apiKey;
}
