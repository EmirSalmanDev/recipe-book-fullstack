import React from "react";
import { StatsContainer } from "../components";
import ChartsContainer from "../components/ChartsContainer";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const response = await axios.get("/api/recipes/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyNewRecipes } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyNewRecipes?.length > 1 && (
        <ChartsContainer data={monthlyNewRecipes} />
      )}
    </>
  );
};

export default Stats;
