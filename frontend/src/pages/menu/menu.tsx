import "../../themes/styles.css";

import React, { useState } from "react";
import { TbRefresh } from "react-icons/tb";

import { ItemRow } from "../../components/table/Table";
import processFood from "../../process/generaterecipe.mjs";
import Recipe from "./recipe";
import Reload from "./reload";
import Alert from '@mui/material/Alert';


function MenuPage() {
	const [loading, setLoading] = useState(false);
	const [imgres, setImgres] = useState([]);

	const [rows] = useState(() => {
		// Try to get the data from localStorage
		const savedRows = localStorage.getItem("rows");

		// If there is data in localStorage, parse it; otherwise, use TEST_DATA
		return savedRows ? JSON.parse(savedRows) : [];
	});

	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const fetchImage = async (query: string) => {
		const unsplash_key = "vD_HhjT5Txsal7RqgOA3pDsH41Vaxg68racp1ZRjdZ8"; // substitute with your own access key
		const data = await fetch(
			`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${unsplash_key}&per_page=1`
		);
		const dataJ = await data.json();
		const result = dataJ.results;
		return result[0].urls.regular
		// setImgres(result);
	};

	const handleOnRefresh = async () => {
		const foods = rows.map((row: ItemRow) => row.item);
		setLoading(true);
		let res = [];
		try {
			res = await processFood(foods, 3);
		} catch (e) {
			alert("Unexpected value in JSON, Try again!");
			<Alert severity="warning">Unexpected value in JSON, Try again!</Alert>
			setLoading(false);
		}

		for (let i = 0; i < res.length; i++) {
			console.log(res[i].name);
			let img_url = ""
			try {
				img_url = await fetchImage(res[i].name);
			} catch (e) {
				alert("Unexpected return from unsplash, try another API!");
				<Alert severity="warning">Unexpected return from unsplash, try another API</Alert>
				setLoading(false);
			}
			res[i].image = img_url;
		}
		setRecipes(res);
		setLoading(false);
	};

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
				<div className="flex min-h-screen flex-col items-center bg-[#faf9f6]">
					<div className="refresh_btn fixed right-5 top-5 z-50 self-end px-4 py-2">
						<button onClick={handleOnRefresh} className="">
							<TbRefresh
								className="min-h-8 min-w-8 cursor-pointer stroke-gray-500"
								aria-hidden="true"
							/>
						</button>
					</div>
					<div className="flex flex-col items-center justify-center">
						<h1 className="HomePageTitle mt-6" style={{ marginTop: "30%" }}>
							Menu
						</h1>
						{/* <p className="text-xl">Coming soon.......</p> */}
					</div>
					<div className="items-center justify-center">
						<Reload />
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="flex min-h-screen flex-col items-center bg-[#faf9f6]">
					<div className="refresh_btn fixed right-5 top-5 z-50 self-end px-4 py-2">
						<button onClick={handleOnRefresh} className="">
							<TbRefresh
								className="min-h-8 min-w-8 cursor-pointer stroke-gray-500"
								aria-hidden="true"
							/>
						</button>
					</div>
					<div className="flex flex-col items-center justify-center">
						<h1 className="HomePageTitle mt-6" style={{ marginTop: "30%" }}>
							Menu
						</h1>
						{/* <p className="text-xl">Coming soon.......</p> */}
					</div>

					<div className=" flex w-2/3 flex-col items-center justify-center" style={{ paddingBottom: "10%", paddingTop: "3%" }}>
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
							<div className="mb-10"></div>
							{recipes.length === 0 && (
								<div style={{ display: "flex", marginTop: "50%" }}>
									<p className="UploadDescription w-full text-center">
										Hit the refresh button on the upper right corner to generate recipes!
									</p>
								</div>
							)}
						</div>
					</div>
				</div >
			</>
		);
	}
}

export default MenuPage;
