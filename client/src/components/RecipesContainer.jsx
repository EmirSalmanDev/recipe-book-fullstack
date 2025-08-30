import React from "react";
import RecipeCard from "./RecipeCard";
import Wrapper from "../assets/wrappers/RecipeContainer";
import { useAllRecipesContext } from "../pages/AllRecipes";

const RecipesContainer = () => {
  const { data } = useAllRecipesContext();
  const { recipes } = data;

  if (recipes.length === 0) {
    return (
      <Wrapper>
        <h2>No recipes to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="recipes">
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe._id} {...recipe} />;
        })}
      </div>
    </Wrapper>
  );
};

export default RecipesContainer;
