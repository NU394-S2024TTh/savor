import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

import { getOpenAIAPIKey } from "./encryptdecrypt.mjs";

async function processFood(FoodItems, numRecipes) {
	const apiKey = await getOpenAIAPIKey();
	const GPTcall = new ChatOpenAI({
		modelName: "gpt-3.5-turbo",
		maxOutputTokens: 2048,
		openAIApiKey: apiKey // replace with api key from important docs/files 
	});

	const input = [
		new HumanMessage({
			content: [
				{
					type: "text",
					text:
						"Given the following list of food items, please generate 5 potential recipes using some of the items. These recipes do not need to use all items, and you are encouraged to use only items that group together as dictated by real recipes. Here are the items: \n" +
						`${FoodItems}` +
						"When generating recipes, please return mirroring the following format:" +
						"name: broccoli stir fry. what you have: Oil, Garlic. what you need: Broccoli, Chili Flakes. steps: 1. Place ingredients into pan. 2. Stir fry until cooked thoroughly." +
						"The items given above are considered 'what you have'. For any recipe, items that you need for the recipe but were not listed above are considered 'what you need'. "
				}
			]
		})
	];

	const res2 = await GPTcall.invoke(input);
	console.log(res2.content);

	const ELORanker = [
		new HumanMessage({
			content: [
				{
					type: "text",
					text:
						`I need assistance in choosing the best ${numRecipes} recipes out of these 5. Please select the top ${numRecipes} recipe(s) that are the most realistic. Consider parameters such as amounts used, flavor blends, as well as how well they mirror real world recipes. Once you select the top ${numRecipes} recipe(s), please simply reprint them; no rationale is needed. Here are the recipes: \n` +
						`${res2.content}`
				}
			]
		})
	];

	const res3 = await GPTcall.invoke(ELORanker);
	console.log(res3.content);

	const regex = /Name: (.+)\nWhat you have: (.+)\nWhat you need: (.+)\nSteps: (.+)/;

	const [, name, have, need, steps] = res3.content.match(regex);

	const stepsArray = steps
		.split(/\d+\./)
		.map((step) => step.trim())
		.filter((step) => step !== "");

	const outputObject = {
		name: name.trim(),
		what_you_have: have.split(",").map((item) => item.trim()),
		what_you_need: need.split(",").map((item) => item.trim()),
		steps: stepsArray
	};

	console.log(outputObject);
}

const foods = ["Bread", "Avocado", "Eggs", "Butter"];

processFood(foods, 1);
