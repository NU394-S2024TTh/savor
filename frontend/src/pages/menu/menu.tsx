import "../../themes/styles.css";

import Alert from "@mui/material/Alert";
import { get } from "firebase/database";
import React, { useEffect, useState } from "react";
import { TbRefresh } from "react-icons/tb";

import { ItemRow } from "../../components/table/Table";
import { useUserItemsRef } from "../../firebase/firebasefunctions";
import processFood from "../../process/generaterecipe.mjs";
import Recipe from "./recipe";
import Reload from "./reload";

function MenuPage() {
	const [loading, setLoading] = useState(false);

	// const [rows] = useState(() => {
	// 	// Try to get the data from localStorage
	// 	const savedRows = localStorage.getItem("rows");

	// 	// If there is data in localStorage, parse it; otherwise, use TEST_DATA
	// 	return savedRows ? JSON.parse(savedRows) : [];
	// });

	const [rows, setRows] = useState<ItemRow[]>([]);
	const [unsplash_key_idx, setUnsplash_key_idx] = useState(0);
	const dbRef = useUserItemsRef();

	useEffect(() => {
		// Fetch existing data from the database and set it to rows
		get(dbRef)
			.then((snapshot) => {
				if (snapshot.exists()) {
					setRows(snapshot.val());
				} else {
					console.log("No data available");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []); // Empty dependency array to only run once on mount

	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const fetchImage = async (query: string) => {
		const unsplash_keys = [""]; // substitute with a list of API keys
		const unsplash_key = unsplash_keys[unsplash_key_idx % unsplash_keys.length];
		const data = await fetch(
			`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${unsplash_key}&per_page=1`
		);
		const dataJ = await data.json();
		const result = dataJ.results;
		return result[0].urls.regular;
		// setImgres(result);
	};

	const handleOnRefresh = async () => {
		console.log(rows);
		if (rows.length === 0) {
			alert("Please add items to generate recipes!");
			<Alert severity="warning">Please add some items before generating recipes!</Alert>;
			return;
		}
		const foods = rows.map((row: ItemRow) => row.item);
		setLoading(true);
		let res = [];
		try {
			res = await processFood(foods, 3);
		} catch (e) {
			alert("Unexpected value in JSON, Try again!");
			<Alert severity="warning">Unexpected value in JSON, Try again!</Alert>;
			setLoading(false);
		}
		try {
			for (let i = 0; i < res.length; i++) {
				console.log(res[i].name);
				let img_url = "";
				img_url = await fetchImage(res[i].name);
				res[i].image = img_url;
			}
		} catch (e) {
			alert("Unexpected return from unsplash, try another API!");
			<Alert severity="warning">Unexpected return from unsplash, switching to another API</Alert>;
			setUnsplash_key_idx(unsplash_key_idx + 1);
			setLoading(false);
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
			<div className="flex max-h-screen flex-col items-center bg-[#faf9f6]">
				<div className="fixed right-5 top-5 z-50 self-end px-4 py-2">
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
				</div>
				<div className="items-center justify-center">
					<Reload />
				</div>
			</div>
		);
	} else {
		return (
			<div className="flex min-h-screen flex-1 flex-col items-center bg-[#faf9f6]">
				<div className="fixed right-5 top-5 z-50 self-end px-4 py-2">
					<button onClick={handleOnRefresh} className="">
						<TbRefresh
							className="min-h-8 min-w-8 cursor-pointer stroke-gray-500"
							aria-hidden="true"
						/>
					</button>
				</div>
				<div className="flex flex-1 flex-col items-center justify-center">
					<h1 className="HomePageTitle mt-6" style={{ marginTop: "30%" }}>
						Menu
					</h1>
				</div>

				<div className=" flex flex-1 flex-col items-center justify-center">
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
			</div>
		);
	}
}

export default MenuPage;
