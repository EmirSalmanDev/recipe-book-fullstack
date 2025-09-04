import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { RECIPE_STATUS, RECIPE_SORT_BY } from "../../../server/utils/constants";
import { useAllRecipesContext } from "../pages/AllRecipes";

const SearchContainer = () => {
  const { searchValues } = useAllRecipesContext();
  const { search, recipeStatus, sort } = searchValues;

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
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
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
