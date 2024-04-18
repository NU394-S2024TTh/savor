
import React, { useEffect, useState } from "react";
import { TbRefresh } from "react-icons/tb";

import Recipe from "./recipe";
import processFood from "../../process/generaterecipe.mjs";
import Reload from "./reload";


function MenuPage() {
    const [loading, setLoading] = useState(false);

    const [rows, setRows] = useState(() => {
        // Try to get the data from localStorage
        const savedRows = localStorage.getItem("rows");

        // If there is data in localStorage, parse it; otherwise, use TEST_DATA
        return savedRows ? JSON.parse(savedRows) : [];
    });

    const [recipes, setRecipes] = useState<any[]>([]);

    const handleOnRefresh = async () => {
        const foods = rows.map((row: any) => row.item);
        setLoading(true);
        const res = await processFood(foods, 3);

        // for (let i = 0; i < res.length; i++) {
        //     console.log(i)
        //     const newRecipe = {
        //         name: res[i].name,
        //         image: '',
        //         availableIngredients: res[i].whatYouHave,
        //         missingIngredients: res[i].whatYouNeed,
        //         recipe: res[i].steps
        //     }
        //     setRecipes([...recipes, newRecipe]);
        // }

        // res.forEach((recipe: any) => {
        //     const newRecipe = {
        //         name: recipe.name,
        //         image: '',
        //         availableIngredients: recipe.whatYouHave,
        //         missingIngredients: recipe.whatYouNeed,
        //         recipe: recipe.steps
        //     }
        //     setRecipes([...recipes, newRecipe]);
        // })
        setRecipes(res);
        console.log(recipes);

        setLoading(false);
    }

    const handleOnclick = () => {
        console.log("ImageList");
        const foods = rows.map((row: any) => row.item);
        console.log(foods);
    }

    console.log(rows.map((row: any) => row.item));

    const [activeRecipe, setactiveRecipes] = useState(-1);
    const handleClose = () => { setactiveRecipes(-1) }
    const handleOpen = (index: number) => { setactiveRecipes(index) }
    if (loading) {
        return (<>
            <div className="flex min-h-screen flex-col items-center">
                <div className="fixed top-5 right-5 z-50 px-4 py-2 refresh_btn self-end">
                    <button onClick={handleOnRefresh} className="">
                        <TbRefresh
                            className="stroke-gray-500 min-h-8 min-w-8 cursor-pointer"
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
        </>);
    } else {
        return (
            <>
                <div className="flex min-h-screen flex-col items-center">
                    <div className="fixed top-5 right-5 z-50 px-4 py-2 refresh_btn self-end">
                        <button onClick={handleOnRefresh} className="">
                            <TbRefresh
                                className="stroke-gray-500 min-h-8 min-w-8 cursor-pointer"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-4xl font-bold">Menu</h1>
                        {/* <p className="text-xl">Coming soon.......</p> */}
                    </div>

                    <div className=" flex flex-col items-center justify-center w-2/3">
                        <div className="space-y-4 justify-center items-center w-full" >

                            {recipes.length > 0 && recipes.map((recipe, index) => (
                                <Recipe key={recipe.name} recipe={recipe} recipeIndex={index} recipeOpen={activeRecipe} handleClose={handleClose} handleOpen={handleOpen} />
                            ))}
                            {
                                recipes.length == 0 && <p className=" UploadDescription mx-20 max-w-md pt-6 text-center">
                                    {" "}
                                    Hit the refresh button on the upper right corner to generate recipes!{" "}
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default MenuPage;