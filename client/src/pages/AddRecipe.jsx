import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { RECIPE_STATUS } from "../../../server/utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDashboardContext } from "./DashboardLayout";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.ingredients) data.ingredients = JSON.parse(data.ingredients);

  try {
    await axios.post("/api/recipes", data);
    toast.success("Added Recipe");
    return redirect("all-recipes");
  } catch (error) {
    toast.error(error?.response?.data?.message); // safely access error message from backend if it exists
    return error;
  }
};

const AddRecipe = () => {
  const { user } = useDashboardContext();
  const [ingredients, setIngredients] = useState([{ id: uuidv4(), value: "" }]);

  const addIngredient = () => {
    setIngredients([...ingredients, { id: uuidv4(), value: "" }]);
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add recipe</h4>
        <div className="form-center">
          <FormRow type="text" labelText="recipe name" name="title" />
          <FormRow
            type="text"
            labelText="recipe description"
            name="description"
          />
          <FormRowSelect
            name="recipeStatus"
            labelText="Recipe Status"
            defaultValue={RECIPE_STATUS.OTHER}
            list={Object.values(RECIPE_STATUS)}
          />

          {ingredients.map((ing) => (
            <div key={ing.id} className="ingredient-row">
              <input
                type="text"
                placeholder="Ingredient"
                value={ing.value}
                onChange={(e) => {
                  setIngredients(
                    ingredients.map((i) =>
                      i.id === ing.id ? { ...i, value: e.target.value } : i
                    )
                  );
                }}
                required
              />
              <button type="button" onClick={() => removeIngredient(ing.id)}>
                -
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            + Add Ingredient
          </button>

          {/* Send array with the help of hidden input*/}
          <input
            type="hidden"
            name="ingredients"
            value={JSON.stringify(ingredients.map((i) => i.value))}
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddRecipe;
