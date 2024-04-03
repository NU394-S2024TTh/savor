import fs from "fs";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";


export default async function processImage(imagePath) {

  // Multi-modal
  const vision = new ChatOpenAI({
    modelName: "gpt-4-vision-preview",
    maxOutputTokens: 2048,
  });
  const image = fs.readFileSync(imagePath).toString("base64");
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
          image_url: `data:image/png;base64,${image}`,
        },
      ],
    }),
  ];

  const res2 = await vision.invoke(input2);

  // parse the response

  // loop the string and find the expiration days
  const expirationDays = [];
  const items = [];
  const lines = res2.content.split("\n");
  for (const line of lines) {
    if (line.includes(":")) {
      // regex to extract the item and information string
      const regex = /^(\d+)\.\s(.+):\s(.+)$/;
      const match = line.match(regex);
      if (match) {
        items.push(match[2]);
        expirationDays.push(match[3]);
      }
    }
  }

  // console.log(res2);
  // console.log(items);
  // console.log(expirationDays);

  // return a dictionary with items and expiration days

  return { items, expirationDays };
}