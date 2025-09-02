import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDashboardContext } from "./DashboardLayout";

export const action = async ({ request }) => {
  // Send formData instead of JSON
  const formData = await request.formData();

  const file = formData.get("avatar");
  if (file && file.size > 1000000) {
    toast.error("Image size too large");
    return null;
  }

  try {
    await axios.patch("/api/users/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return null;
};

const Profile = () => {
  const { user } = useDashboardContext();
  const { name, lastname, email } = user;

  return (
    <Wrapper>
      {/* sending a file to the server */}
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          {/* file input */}
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 1 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>

          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastname"
            labelText="last name"
            defaultValue={lastname}
          />
          <FormRow type="text" name="email" defaultValue={email} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
