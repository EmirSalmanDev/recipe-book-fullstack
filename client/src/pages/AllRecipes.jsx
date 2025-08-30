import { RecipesContainer, RecipeCard } from "../components";
import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import Wrapper from "../assets/wrappers/AllRecipes";
import SearchContainer from "../components/SearchContainer";

export const loader = async ({ request }) => {
  try {
    const { data } = await axios.get("/api/recipes");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllRecipesContext = createContext();

const AllRecipes = () => {
  const data = useLoaderData();

  return (
    <>
      <Wrapper>
        <AllRecipesContext.Provider value={{ data }}>
          <SearchContainer />
          <RecipesContainer />
        </AllRecipesContext.Provider>
      </Wrapper>
    </>
  );
};

export const useAllRecipesContext = () => useContext(AllRecipesContext);

export default AllRecipes;
