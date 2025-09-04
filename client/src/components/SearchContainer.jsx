import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { RECIPE_STATUS, RECIPE_SORT_BY } from "../../../server/utils/constants";
import { useAllRecipesContext } from "../pages/AllRecipes";
import { useRef } from "react";

const SearchContainer = () => {
  const { searchValues } = useAllRecipesContext();
  const { search, recipeStatus, sort } = searchValues;

  const timerRef = useRef(); // value persists between renders (not reset like normal variables)
  const debounce = (e) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      submit(e.currentTarget.form);
    }, 1000);
  };

  const submit = useSubmit();
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>

        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            labelText="recipe status"
            name="recipeStatus"
            list={["all", ...Object.values(RECIPE_STATUS)]}
            defaultValue={recipeStatus}
            onChange={debounce}
          />

          <FormRowSelect
            labelText="sort"
            name="sort"
            list={Object.values(RECIPE_SORT_BY)}
            defaultValue={sort}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <Link to="/dashboard/all-recipes" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
