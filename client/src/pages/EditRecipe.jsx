import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { RECIPE_STATUS } from "../../../server/utils/constants";
import {
  Form,
  useNavigation,
  redirect,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const loader = async ({ params }) => {
  // param id from URL
  try {
    const { data } = await axios.get(`/api/recipes/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/all-recipes");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.patch(`/api/recipes/${params.id}`, data);
    toast.success("Recipe Edited Successfully");
    return redirect("/dashboard/all-recipes");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditRecipe = () => {
  // const params = useParams();
  const { recipe } = useLoaderData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="title" defaultValue={recipe.title} />
          <FormRow
            type="text"
            name="description"
            defaultValue={recipe.description}
          />
          <FormRowSelect
            list={Object.values(RECIPE_STATUS)}
            name="recipeStatus"
            defaultValue={recipe.recipeStatus}
            labelText="Recipe Status"
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditRecipe;
