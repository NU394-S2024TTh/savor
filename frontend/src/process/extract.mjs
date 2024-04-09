import fs from "fs";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { Buffer } from "buffer";
import { getOpenAIAPIKey } from "./encryptdecrypt.mjs";


function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}

function readFileAsDataURL(file) {
  // file is a dataURL
  console.log('----');
  console.log(dataURItoBlob(file));
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(dataURItoBlob(file));
  });
}

export default async function processImage(imagePath) {

  const apiKey = await getOpenAIAPIKey();

  // Multi-modal
  const vision = new ChatOpenAI({
		modelName: "gpt-4-vision-preview",
		maxOutputTokens: 2048,
		openAIApiKey: apiKey
	});
  // const image = fs.readFileSync(imagePath).toString("base64");
  let image = await readFileAsDataURL(imagePath);
  console.log('image to be put into OPENAI!!!!');
  console.log(image);

  const input2 = [
		new HumanMessage({
			content: [
				{
					type: "text",
					text:
						"Please list all items bought in the attached image of the receipt. Then, for each item, provide the usual expiration days. Also, try to make a give the full name of the item, like Good&Gather Hummus instead of GG Hummus. Lastly, please give the number of days each item could expire in, prefixed with [Least number of days] a positive number. Here are the examples of the output:\n" +
						"1. Good&Gather Yogurt: Usually Expire in 2-3 weeks; [Least number of days] 14\n" +
						"2. Lettuce: Usually Expire in 7-10 days; [Least number of days] 7\n" +
						"3. Canned beans: This is a type of food that can be stored as long as 1-2 years. However, it is still suggested to have it ASAP. [Least number of days] 365\n" +
						"Ambiguous Items: GOOD&GATHER, Smartly\n" +
						"Not food: Blogilates, Basketball, T-shirt\n"
				},
				{
					type: "image_url",
					image_url: `${image}`
				}
			]
		})
	];

  const res2 = await vision.invoke(input2);

  // parse the response

  // loop the string and find the expiration days
  const expirationInfo = [];
  const expirationDays = [];
  const items = [];
  const lines = res2.content.split("\n");
  for (const line of lines) {
    if (line.includes(":")) {
      // regex to extract the item and information string
      const regex = /^(\d+)\.\s(.+?):\s(.+)\[Least number of days\]\s(\d+).*$/;
      const match = line.match(regex);
      if (match) {
        items.push(match[2]);
        expirationInfo.push(match[3]);
        expirationDays.push(match[4]);
        console.log(match[2]);
        console.log(match[3]);
        console.log(match[4]);
      }
    }
  }

  // console.log(res2);
  // console.log(items);
  // console.log(expirationDays);

  // return a dictionary with items and expiration days

  return { items, expirationInfo, expirationDays };
}