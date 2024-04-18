import React, { useState } from "react";
import { TbRefresh } from "react-icons/tb";

import { ItemRow } from "../../components/table/Table";
import processFood from "../../process/generaterecipe.mjs";
import Recipe from "./recipe";
import Reload from "./reload";

interface Recipe {
	name: string;
	image: string;
	whatYouHave: string[];
	whatYouNeed: string[];
	recipe: string[];
}

function MenuPage() {
	const [loading, setLoading] = useState(false);

	const [rows] = useState(() => {
		// Try to get the data from localStorage
		const savedRows = localStorage.getItem("rows");

		// If there is data in localStorage, parse it; otherwise, use TEST_DATA
		return savedRows ? JSON.parse(savedRows) : [];
	});

	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const handleOnRefresh = async () => {
		const foods = rows.map((row: ItemRow) => row.item);
		setLoading(true);
		const res = await processFood(foods, 3);

		setRecipes(res);
		console.log(recipes);

		setLoading(false);
	};

	console.log(rows.map((row: ItemRow) => row.item));

	const [activeRecipe, setactiveRecipes] = useState(-1);
	const handleClose = () => {
		setactiveRecipes(-1);
	};
	const handleOpen = (index: number) => {
		setactiveRecipes(index);
	};
	if (loading) {
		return (
			<>
				<div className="flex min-h-screen flex-col items-center">
					<div className="refresh_btn fixed right-5 top-5 z-50 self-end px-4 py-2">
						<button onClick={handleOnRefresh} className="">
							<TbRefresh
								className="min-h-8 min-w-8 cursor-pointer stroke-gray-500"
								aria-hidden="true"
							/>
						</button>
					</div>
					<div className="flex flex-col items-center justify-center">
						<h1 className="text-4xl font-bold">Menu</h1>
						{/* <p className="text-xl">Coming soon.......</p> */}
					</div>
					<Reload />
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="flex min-h-screen flex-col items-center">
					<div className="refresh_btn fixed right-5 top-5 z-50 self-end px-4 py-2">
						<button onClick={handleOnRefresh} className="">
							<TbRefresh
								className="min-h-8 min-w-8 cursor-pointer stroke-gray-500"
								aria-hidden="true"
							/>
						</button>
					</div>
					<div className="flex flex-col items-center justify-center">
						<h1 className="text-4xl font-bold">Menu</h1>
						{/* <p className="text-xl">Coming soon.......</p> */}
					</div>

					<div className=" flex w-2/3 flex-col items-center justify-center">
						<div className="w-full items-center justify-center space-y-4">
							{recipes.length > 0 &&
								recipes.map((recipe, index) => (
									<Recipe
										key={recipe.name}
										recipe={recipe}
										recipeIndex={index}
										recipeOpen={activeRecipe}
										handleClose={handleClose}
										handleOpen={handleOpen}
									/>
								))}
							{recipes.length == 0 && (
								<p className=" UploadDescription mx-20 max-w-md pt-6 text-center">
									{" "}
									Hit the refresh button on the upper right corner to generate recipes!{" "}
								</p>
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default MenuPage;
