import fs from "fs";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { Buffer } from "buffer";


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

  // Multi-modal
  const vision = new ChatOpenAI({
    modelName: "gpt-4-vision-preview",
    maxOutputTokens: 2048,
    openAIApiKey:"--",
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
          text: "Please list all items bought in the attached image of the receipt. Then, for each item, provide the usual expiration days. Here are the examples of the output:\n"
            + "1. GG Yogurt: 2-3 weeks\n"
            + "2. Lettuce: 7-10 days\n"
            + "3. Canned beans: 1-2 years\n"
            + "Ambiguous Items: GOOD&GATHER, Smartly\n"
            + "Not food: Blogilates, Basketball, T-shirt\n"
        },
        {
          type: "image_url",
          image_url: `${image}`,
        },
      ],
    }),
  ];

  const res2 = await vision.invoke(input2);

  // parse the response

  // loop the string and find the expiration days
  const expirationInfo = [];
  const items = [];
  const lines = res2.content.split("\n");
  for (const line of lines) {
    if (line.includes(":")) {
      // regex to extract the item and information string
      const regex = /^(\d+)\.\s(.+):\s(.+)$/;
      const match = line.match(regex);
      if (match) {
        items.push(match[2]);
        expirationInfo.push(match[3]);
      }
    }
  }

  // console.log(res2);
  // console.log(items);
  // console.log(expirationDays);

  // return a dictionary with items and expiration days

  return { items, expirationInfo };
}