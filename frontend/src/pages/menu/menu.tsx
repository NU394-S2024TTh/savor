
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
        missingIngredients: ['🥩']
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
                <div className=" flex flex-col items-center justify-center">
                    <div className="space-y-4 justify-center items-center" >

                        {recipes.map(recipe => (
                            <Recipe key={recipe.name} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}


export default MenuPage;