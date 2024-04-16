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
import "../../themes/styles.css";
import { CardActionArea } from '@mui/material';

function Recipe({ recipe }: { recipe: any }) {
    // return (
    //     <div style={{ padding: 30, display: 'flex', justifyContent: 'center' }}>
    //         <Card sx={{ width: 0.6, pb: 5 }}>
    //             <CardActionArea>
    //                 {/* <CardMedia
    //                 sx={{ height: 140 }}
    //                 image={recipe.image}
    //                 title={recipe.name}
    //             /> */}
    //                 <div className=" pt-6 flex w-11/12 items-center justify-center">
    //                     <div className=" flex w-3/12 items-center justify-center text-5xl">
    //                         {recipe.image}
    //                     </div>

    //                     <Typography gutterBottom variant="h6" component="div">
    //                         {recipe.name}
    //                     </Typography>
    //                 </div>
    //                 <CardContent>
    //                     <Typography variant="body2" color="text.secondary" justifyContent="center">
    //                         <div className='AccordionContent'>
    //                             <p>Available Ingredients: {recipe.availableIngredients.join(' ')}</p>
    //                             {recipe.missingIngredients.length > 0 && (
    //                                 <p>Missing Ingredients: {recipe.missingIngredients.join(' ')}</p>
    //                             )}
    //                             {recipe.inStock && (
    //                                 <p>{`${recipe.inStock}/${recipe.totalIngredients} Ingredients In Stock`}</p>
    //                             )}
    //                         </div>
    //                     </Typography>
    //                 </CardContent>
    //             </CardActionArea>
    //         </Card>
    //     </div >
    // );
    return (
        <Card sx={{}} style={{ padding: 1 }} >
            <CardActionArea>
                <CardMedia>
                    <div className=" pl-6 pt-6 w-11/12 items-center justify-center">
                        <div className="  w-3/12 items-center justify-center text-5xl">
                            {recipe.image}
                        </div>

                        <Typography gutterBottom variant="h6" component="div">
                            {recipe.name}
                        </Typography>
                    </div>
                </CardMedia>
                <CardContent>
                    <Typography variant="body2" color="text.secondary" justifyContent="center">
                        <div className='AccordionContent'>
                            <p>Available Ingredients: {recipe.availableIngredients.join(' ')}</p>
                            {recipe.missingIngredients.length > 0 && (
                                <p>Missing Ingredients: {recipe.missingIngredients.join(' ')}</p>
                            )}
                            {recipe.inStock && (
                                <p>{`${recipe.inStock}/${recipe.totalIngredients} Ingredients In Stock`}</p>
                            )}
                        </div>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}



export default Recipe;