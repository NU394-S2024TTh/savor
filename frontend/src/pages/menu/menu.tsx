
import React, { useEffect, useState } from "react";

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
        image: 'path/to/broccoli-tofu-image.jpg', // Replace with the actual image path
        availableIngredients: ['🥦', '🍄', '🍚'],
        missingIngredients: ['🥩']
    },
    {
        name: 'Spaghetti Bolognese',
        image: 'path/to/spaghetti-image.jpg', // Replace with the actual image path
        availableIngredients: ['🍅', '🥕', '🌿'],
        missingIngredients: ['🥩', '🍝']
    },
    {
        name: 'Avocado Salad',
        image: 'path/to/avocado-salad-image.jpg', // Replace with the actual image path
        availableIngredients: ['🥑'],
        missingIngredients: [],
        inStock: 3,
        totalIngredients: 5
    }
];

// Recipe component
const Recipe = ({ recipe }: { recipe: any }) => (
    <div className="modal" style={styles.recipeCard}>
        <img src={recipe.image} alt={recipe.name} style={styles.image} />
        <h3>{recipe.name}</h3>
        <div style={styles.ingredientsList}>
            <p>Available Ingredients: {recipe.availableIngredients.join(' ')}</p>
            {recipe.missingIngredients.length > 0 && (
                <p>Missing Ingredients: {recipe.missingIngredients.join(' ')}</p>
            )}
            {recipe.inStock && (
                <p>{`${recipe.inStock}/${recipe.totalIngredients} Ingredients In Stock`}</p>
            )}
        </div>
    </div>
);

// Styles
const styles = {
    recipeCard: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '16px'
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '4px'
    },
    ingredientsList: {
        marginTop: '8px'
    },
};


function MenuPage() {
    return (
        <div>
            <main>
                {recipes.map(recipe => (
                    <Recipe key={recipe.name} recipe={recipe} />
                ))}
            </main>
        </div>
    );
}


export default MenuPage;