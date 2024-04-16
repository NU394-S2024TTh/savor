// import React, { useEffect, useState } from "react";

// // Recipe component
// function Recipe({ recipe }: { recipe: any }) {
//     return (
//         <div className="modal recipe_card">
//             {/* <img src={recipe.image} alt={recipe.name} className="image" /> */}
//             <div className="form-group">
//                 <input name="image" value={recipe.image} />
//             </div>
//             <h3>{recipe.name}</h3>
//             <div className="ingredientlist">
//                 <p>Available Ingredients: {recipe.availableIngredients.join(' ')}</p>
//                 {recipe.missingIngredients.length > 0 && (
//                     <p>Missing Ingredients: {recipe.missingIngredients.join(' ')}</p>
//                 )}
//                 {recipe.inStock && (
//                     <p>{`${recipe.inStock}/${recipe.totalIngredients} Ingredients In Stock`}</p>
//                 )}
//             </div>
//         </div>
//     );
// }

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Recipe({ recipe }: { recipe: any }) {
    return (
        <div style={{ padding: 30 }}>
            <Card sx={{ width: 0.6, pb: 5 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={recipe.image}
                    title={recipe.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {recipe.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <>
                            <p>Available Ingredients: {recipe.availableIngredients.join(' ')}</p>
                            {recipe.missingIngredients.length > 0 && (
                                <p>Missing Ingredients: {recipe.missingIngredients.join(' ')}</p>
                            )}
                            {recipe.inStock && (
                                <p>{`${recipe.inStock}/${recipe.totalIngredients} Ingredients In Stock`}</p>
                            )}
                        </>
                    </Typography>
                </CardContent>
            </Card>
        </div >
    );
}



export default Recipe;