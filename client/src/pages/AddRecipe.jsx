import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { RECIPE_STATUS } from "../../../server/utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDashboardContext } from "./DashboardLayout";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

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
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add recipe</h4>
        <div className="form-center">
          <FormRow type="text" labelText="recipe name" name="title" />
          {/* image upload will be added */}
          <FormRow
            type="text"
            labelText="recipe description"
            name="description"
          />
          <FormRowSelect
            name="recipeStatus"
            labelText="Recipe Status"
            defaultValue={RECIPE_STATUS.TESTING}
            list={Object.values(RECIPE_STATUS)}
          />

          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddRecipe;
