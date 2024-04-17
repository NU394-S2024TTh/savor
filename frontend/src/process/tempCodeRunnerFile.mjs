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