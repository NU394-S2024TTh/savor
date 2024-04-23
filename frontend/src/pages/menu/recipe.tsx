import "../../themes/styles.css";

import { CardActionArea } from "@mui/material";
// import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// import { set } from "firebase/database";
// import * as React from "react";
// import { useState } from "react";
import Fridge from "../../components/fridge/Fridge";

interface Recipe {
	name: string;
	image: string;
	whatYouHave: string[];
	whatYouNeed: string[];
	steps: string[];
}

interface RecipeProps {
	recipe: Recipe;
	recipeIndex: number;
	recipeOpen: number;
	handleOpen: (index: number) => void;
	handleClose: () => void;
}

function Recipe({ recipe, recipeIndex, recipeOpen, handleOpen, handleClose }: RecipeProps) {
	// console.log(recipe);
	if (recipeOpen == -1) {
		return (
			<div>
				<Card onClick={() => handleOpen(recipeIndex)} onKeyDown={() => handleOpen(recipeIndex)}>
					<CardActionArea LinkComponent={Fridge}>
						<div style={{ maxHeight: "120px" }}>
							<img src={recipe.image} alt={recipe.name} />
						</div>
						<div
							style={{
								position: "relative",
								bottom: 0,
								left: 0,
								width: "100%",
								backgroundColor: "white",
								opacity: 0.8,
								padding: "0.5em"
							}}
						>
							<div className=" w-11/12 items-center justify-center pl-6 pt-6">
								<Typography
									gutterBottom
									variant="h6"
									component="div"
									style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
								>
									{recipe.name}
								</Typography>
							</div>
							<CardContent style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
								{/* <Typography variant="body2" color="text.secondary" justifyContent="center"> */}
								<div className="AccordionContent opacity_text">
									<p>Available Ingredients: {recipe.whatYouHave.join(", ")}</p>
									{recipe.whatYouNeed.length > 0 && (
										<p>Missing Ingredients: {recipe.whatYouNeed.join(", ")}</p>
									)}
								</div>
							</CardContent>
						</div>
					</CardActionArea>
				</Card>
			</div>
		);
	} else if (recipeOpen == recipeIndex) {
		return (
			<>
				<div>
					<Card
						sx={{ backgroundColor: "white" }}
						style={{ padding: 1 }}
						onClick={handleClose}
						onKeyDown={handleClose}
					>
						<CardActionArea LinkComponent={Fridge}>
							<CardMedia
								className="recipe_img"
								component="img"
								height="80"
								sx={{ objectFit: "contain" }}
								image={recipe.image}
							/>
							<div className=" w-11/12 items-center justify-center pl-6 pt-6">
								<Typography gutterBottom variant="h6" component="div">
									{recipe.name}
								</Typography>
							</div>
							<CardContent>
								{/* <Typography variant="body2" color="text.secondary" justifyContent="center"> */}
								<div className="AccordionContent">
									<p>Available Ingredients: {recipe.whatYouHave.join(", ")}</p>
									{recipe.whatYouNeed.length > 0 && (
										<p>Missing Ingredients: {recipe.whatYouNeed.join(", ")}</p>
									)}
								</div>
								<br></br>
								<p>
									<h2>Cooking Steps:</h2>
								</p>
								{recipe.steps.map((step: string, index: number) => (
									<Typography
										key={index}
										variant="body2"
										color="text.secondary"
										justifyContent="center"
									>
										<div className="AccordionContent">
											<p>
												{index + 1}. {step}
											</p>
										</div>
									</Typography>
								))}
							</CardContent>
						</CardActionArea>
					</Card>
				</div>
			</>
		);
	} else {
		return <></>;
	}
}

export default Recipe;
