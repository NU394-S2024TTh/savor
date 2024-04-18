import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

import { getOpenAIAPIKey } from "./encryptdecrypt.mjs";
async function processFood(FoodItems, numRecipes) {
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

	const ELORanker = [
		new HumanMessage({
			content: [
				{
					type: "text",
					text:
						`I need assistance in choosing the best ${numRecipes} recipes out of these 5. Please select the top ${numRecipes} recipe(s) that are the most realistic. Consider parameters such as amounts used, flavor blends, as well as how well they mirror real world recipes. Once you select the top ${numRecipes} recipe(s), please simply reprint them; no rationale is needed. Please keep all keys and values intact. Do not omit anything from the recipe text, including the 'Name:' portion. Here are the recipes: \n` +
						`${res2.content}`
				}
			]
		})
	];

	const res3 = await GPTcall.invoke(ELORanker);

	const regex =
		/name:\s*([^]+?)\s*what you have:\s*([^]+?)\s*what you need:\s*([^]+?)\s*steps:\s*([^]+)/gi;

	const matches = res3.content.matchAll(regex);

	const recipes = [];

	for (const match of matches) {
		const [, name, whatYouHave, whatYouNeed, steps] = match;
		const have = whatYouHave.trim().split(", ");
		const need = whatYouNeed.trim().split(", ");
		const stepsArray = steps
			.trim()
			.split(/\d+\./)
			.map((step) => step.trim())
			.filter((step) => step !== "");

		recipes.push({ name: name.trim(), have, need, steps: stepsArray });
	}

	return recipes.length > 0 ? recipes : "No Recipes Found.";
}

const fooditems = ["Bread", "Avocado", "Butter", "Eggs"];
console.log(await processFood(fooditems, 1));
