import React from "react";
import RecipeCard from "./RecipeCard";
import Wrapper from "../assets/wrappers/RecipeContainer";
import { useAllRecipesContext } from "../pages/AllRecipes";
import PageBtncontainer from "./PageBtncontainer";

const RecipesContainer = () => {
  const { data } = useAllRecipesContext();
  const { recipes, totalRecipes, numOfPages } = data;

  if (recipes.length === 0) {
    return (
      <Wrapper>
        <h2>No recipes to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalRecipes} recipe{totalRecipes > 1 ? "s" : ""} found
      </h5>
      <div className="recipes">
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe._id} {...recipe} />;
        })}
      </div>
      <PageBtncontainer />
    </Wrapper>
  );
};

export default RecipesContainer;
