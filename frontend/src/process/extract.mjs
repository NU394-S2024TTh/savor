import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import heic2any from "heic2any";

// import { Buffer } from "buffer";
// import fs from "fs";
import { getOpenAIAPIKey } from "./encryptdecrypt.mjs";
import { OCR } from "./ocr.mjs";

function dataURItoBlob(dataURI) {
	// handles the file
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	var byteString = atob(dataURI.split(",")[1]);

	// separate out the mime component
	var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);

	// create a view into the buffer
	var ia = new Uint8Array(ab);

	// set the bytes of the buffer to the correct values
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	// write the ArrayBuffer to a blob, and you're done
	var blob = new Blob([ab], { type: mimeString });
	return blob;
}

function readFileAsDataURL(file) {
	// Assuming `file` is a Data URL, we first need to check the MIME type.
	// The MIME type for HEIC images is 'image/heic'.
	const mimeType = file.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];

	return new Promise((resolve, reject) => {
		// If the file is HEIC, we convert it to JPG.
		if (mimeType === "image/heic") {
			heic2any({
				blob: dataURItoBlob(file),
				toType: "image/jpeg",
				quality: 0.8 // Adjust quality as needed
			})
				.then((conversionResult) => {
					// `conversionResult` is a Blob. Convert this blob to a DataURL.
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result);
					reader.onerror = reject;
					reader.readAsDataURL(conversionResult);
				})
				.catch(reject);
		} else {
			// If the file is not HEIC, proceed as before.
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(dataURItoBlob(file));
		}
	});
}

export default async function processImage(imagePath) {
	const apiKey = await getOpenAIAPIKey();

	const file = dataURItoBlob(imagePath);

	const extractedText = await OCR(file);

  // Text-only GPT 3.5 model
	const textAI = new ChatOpenAI({
		modelName: "gpt-3.5-turbo",
		maxOutputTokens: 2048,
		openAIApiKey: apiKey
	});

	const input2 = [
		new HumanMessage({
			content: [
				{
					type: "text",
					text:
						extractedText + "\n\n" +
						"Please list all items bought in the extracted text of the receipt from OCR shown above. First, extract the purchase date from the receipt. Then, for each item, provide the usual expiration days. Second, select a unicode symbol that suits the item the most. If it is hard to find one, consider the parent category of such item, e.g., fruit for sugar apple. Third, try to make a give the full name of the item, like Good&Gather Hummus instead of GG Hummus. Fourth, please give the number of days each item could expire in, prefixed with [Least number of days] a positive number. Here are the examples of the output:\n" +
						"[Purchase Date] 2022-01-01\n" +
						"1. Good&Gather Yogurt (unicode: 🐮): Usually Expire in 2-3 weeks; [Least number of days] 14\n" +
						"2. Lettuce (unicode: 🥬): Usually Expire in 7-10 days; [Least number of days] 7\n" +
						"3. Canned beans (unicode: 🫘): This is a type of food that can be stored as long as 1-2 years. However, it is still suggested to have it ASAP. [Least number of days] 365\n" +
						"Ambiguous Items: GOOD&GATHER, Smartly\n" +
						"Not food: Blogilates, Basketball, T-shirt\n"
				}
			]
		})
	];

	// // Multi-modal
	// const vision = new ChatOpenAI({
	// 	modelName: "gpt-4-vision-preview",
	// 	maxOutputTokens: 2048,
	// 	openAIApiKey: apiKey
	// });
	// // const image = fs.readFileSync(imagePath).toString("base64");
	
	// // ----------------------------------------------------------------

	// let image = await readFileAsDataURL(imagePath);
	// // console.log('image to be put into OPENAI!!!!');
	// // console.log(image);

	// const input2 = [
	// 	new HumanMessage({
	// 		content: [
	// 			{
	// 				type: "text",
	// 				text:
	// 					"Please list all items bought in the attached image of the receipt. First, extract the purchase date from the receipt. Then, for each item, provide the usual expiration days. Second, select a unicode symbol that suits the item the most. If it is hard to find one, consider the parent category of such item, e.g., fruit for sugar apple. Third, try to make a give the full name of the item, like Good&Gather Hummus instead of GG Hummus. Fourth, please give the number of days each item could expire in, prefixed with [Least number of days] a positive number. Here are the examples of the output:\n" +
	// 					"[Purchase Date] 2022-01-01\n" +
	// 					"1. Good&Gather Yogurt (unicode: 🐮): Usually Expire in 2-3 weeks; [Least number of days] 14\n" +
	// 					"2. Lettuce (unicode: 🥬): Usually Expire in 7-10 days; [Least number of days] 7\n" +
	// 					"3. Canned beans (unicode: 🫘): This is a type of food that can be stored as long as 1-2 years. However, it is still suggested to have it ASAP. [Least number of days] 365\n" +
	// 					"Ambiguous Items: GOOD&GATHER, Smartly\n" +
	// 					"Not food: Blogilates, Basketball, T-shirt\n"
	// 			},
	// 			{
	// 				type: "image_url",
	// 				image_url: `${image}`
	// 			}
	// 		]
	// 	})
	// ];

	const res2 = await textAI.invoke(input2);
	console.log(res2.content);

	// parse the response

	// loop the string and find the expiration days
	let purchaseDate = "";
	const expirationDays = [];
	const unicodes = [];
	const expirationInfo = [];
	const items = [];
	const lines = res2.content.split("\n");
	console.log("lines: %d", lines.length);
	for (const line of lines) {
		if (line.includes("[Purchase Date]")) {
			// console.log('Purchase Date detected');
			// console.log('line: %s', line);
			purchaseDate = line.replace("[Purchase Date]", "").trim();
		}
		if (line.includes(":")) {
			// console.log(': detected');
			// console.log('line: %s', line);
			// regex to extract the item and information string
			const regex =
				/^(\d+)\.\s(.+)\s+\(unicode:\s+(.*)\):\s(.+)\[Least number of days\]\s+(\d+).*$/;
			const match = line.match(regex);
			if (match) {
				console.log("matched!");
				items.push(match[2]);
				unicodes.push(match[3]);
				expirationInfo.push(match[4]);
				expirationDays.push(match[5]);
				// console.log(match[2]);
				// console.log(match[3]);
				// console.log(match[4]);
				// console.log(match[5]);
			}
		}
	}

	console.log(res2);
	console.log(items);
	// console.log(expirationDays);

	// return a dictionary with items and expiration days

	return { items, expirationInfo, expirationDays, unicodes, purchaseDate };
}
