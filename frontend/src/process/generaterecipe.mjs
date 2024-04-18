import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

import { getOpenAIAPIKey } from "./encryptdecrypt.mjs";

export default async function processFood(FoodItems, numRecipes) {
	//fooditems is a list of strings of food names. numRecipes is the number of recipes you want generated. It's capped at 5, but that can be changed in prompting below.
	//returns array of values, consisting of the recipe name, what you have, what you need, and the steps.
	const apiKey = await getOpenAIAPIKey();
	const GPTcall = new ChatOpenAI({
		modelName: "gpt-3.5-turbo",
		maxOutputTokens: 2048,
		openAIApiKey: apiKey
	});

	const input = [
		new HumanMessage({
			content: [
				{
					type: "text",
					text:
						"Given the following list of food items, please generate 5 potential recipes using some of the items. These recipes do not need to use all items, and you are encouraged to use only items that group together as dictated by real recipes. Here are the items: \n" +
						`${FoodItems}` +
						"When generating recipes, please return mirroring the following format, with keys and values as follows:" +
						"name: broccoli stir fry. what you have: Oil, Garlic. what you need: Broccoli, Chili Flakes. steps: 1. Place ingredients into pan. 2. Stir fry until cooked thoroughly." +
						"The items given above are considered 'what you have'. For any recipe, items that you need for the recipe but were not listed above are considered 'what you need'. "
				}
			]
		})
	];

	const res2 = await GPTcall.invoke(input);
	// console.log(res2.content);

	const ELORanker = [
		new HumanMessage({
			content: [
				{
					type: "text",
					text:
						`I need assistance in choosing the best ${numRecipes} recipes out of these 5. Please select the top ${numRecipes} recipe(s) that are the most realistic. Consider parameters such as amounts used, flavor blends, as well as how well they mirror real world recipes. Once you select the top ${numRecipes} recipe(s), please simply reprint them; no rationale is needed. Please keep all keys and values intact. Do not omit anything from the recipe, including the 'Name:' portion. Here are the recipes: \n` +
						`${res2.content}` +
						"Then output those in json string format with variables name, whatYouHave (list of string), whatYouNeed (list of string), and steps (list of string). Make sure the variables are in camel case."
				}
			]
		})
	];

	const res3 = await GPTcall.invoke(ELORanker);

	const recipes = JSON.parse(res3.content);
	console.log(recipes);
	return recipes;
}

// processFood(["broccoli", "garlic", "oil"], 3);
