import { RecipesContainer, RecipeCard } from "../components";
import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import Wrapper from "../assets/wrappers/AllRecipes";
import SearchContainer from "../components/SearchContainer";

export const loader = async ({ request }) => {
  try {
    // Converts the query string parameters from the URL into a plain JavaScript object
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(), // spread
    ]);

    const { data } = await axios.get("/api/recipes", { params });
    return {
      data,
      searchValues: params,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllRecipesContext = createContext();

const AllRecipes = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <>
      <Wrapper>
        <AllRecipesContext.Provider value={{ data, searchValues }}>
          <SearchContainer />
          <RecipesContainer />
        </AllRecipesContext.Provider>
      </Wrapper>
    </>
  );
};

export const useAllRecipesContext = () => useContext(AllRecipesContext);

export default AllRecipes;
