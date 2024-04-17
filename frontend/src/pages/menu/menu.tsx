
import React, { useEffect, useState } from "react";
import { TbRefresh } from "react-icons/tb";

import Recipe from "./recipe";
// function MenuPage() {
//     return (
//         <div className="flex flex-col items-center justify-center">
//             <h1 className="text-4xl font-bold">Menu</h1>
//             <p className="text-xl">Coming soon...</p>
//         </div>
//     );
// }

// Sample data for the recipes
const recipes = [
    {
        name: 'Broccoli Tofu Stir-fry',
        image: '🥦',
        availableIngredients: ['🥦', '🍄', '🍚'],
        missingIngredients: ['🥩'],
        recipe: <>
            <p>
                <strong>Ingredients:</strong>
                <ul>
                    <li>🥦 Broccoli</li>
                    <li>🍄 Mushrooms</li>
                    <li>🍚 Rice</li>
                </ul>
                <strong>Prepare the Tofu:</strong>
                <ol>
                    <li>Press the Tofu: Wrap the block of tofu in paper towels or a clean kitchen towel. Place a heavy object on top (like a skillet or books) to press out excess water for about 15-30 minutes. Then cut the tofu into 1-inch cubes.</li>
                    <li>Marinate the Tofu: In a bowl, combine 1 tablespoon of soy sauce, 1 tablespoon of cornstarch, and 1/4 cup water. Add the tofu cubes and gently toss to coat. Let it marinate for about 10 minutes.</li>
                </ol>

                <strong>Make the Stir-Fry Sauce: </strong>
                <ol>
                    <li>Combine Ingredients: In another bowl, mix together 2 tablespoons of soy sauce, brown sugar, rice vinegar, and red pepper flakes. Set aside.</li>
                </ol>

                <ol>
                    <ul>Cook the Tofu: Heat 1 tablespoon of vegetable oil in a skillet or wok over medium-high heat. Add the marinated tofu cubes and fry until golden on all sides, about 5-7 minutes. Remove the tofu from the skillet and set aside.</ul>
                    <ul>Stir-Fry Broccoli: Add another tablespoon of vegetable oil to the skillet. Add the broccoli florets and stir-fry for about 3-4 minutes until they are bright green and slightly tender.</ul>
                    <ul>Add Garlic and Ginger: Add minced garlic and ginger to the skillet with the broccoli and stir-fry for another minute until fragrant.</ul>
                    <ul>Combine Tofu and Broccoli: Return the tofu to the skillet with the broccoli. Pour the stir-fry sauce over and toss everything together. Cook for another 2-3 minutes until everything is heated through and the sauce is slightly thickened.</ul>
                    <ul>Finish with Sesame Oil: Drizzle sesame oil over the stir-fry and toss to coat.</ul>
                </ol>

            </p>
        </>
    },
    {
        name: 'Spaghetti Bolognese',
        image: '🍝',
        availableIngredients: ['🍅', '🥕', '🌿'],
        missingIngredients: ['🥩', '🍝']
    },
    {
        name: 'Avocado Salad',
        image: '🥑',
        availableIngredients: ['🥑'],
        missingIngredients: [],
        inStock: 3,
        totalIngredients: 5
    }
];

function MenuPage() {

    const [activeRecipe, setactiveRecipes] = useState(-1);
    const handleClose = () => { setactiveRecipes(-1) }
    const handleOpen = (index: number) => { setactiveRecipes(index) }
    return (
        <>

            <div className="flex min-h-screen flex-col items-center">
                <div className="fixed top-5 right-5 z-50 px-4 py-2 refresh_btn self-end">
                    <button onClick={() => null} className="">
                        <TbRefresh
                            className="stroke-gray-500 min-h-8 min-w-8 cursor-pointer"
                            aria-hidden="true"
                        />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold">Menu</h1>
                    <p className="text-xl">Coming soon.......</p>
                </div>
                <div className=" flex flex-col items-center justify-center w-2/3">
                    <div className="space-y-4 justify-center items-center w-full" >

                        {recipes.map((recipe, index) => (
                            <Recipe key={recipe.name} recipe={recipe} recipeIndex={index} recipeOpen={activeRecipe} handleClose={handleClose} handleOpen={handleOpen} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}


export default MenuPage;