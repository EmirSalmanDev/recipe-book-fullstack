import React from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "../components";
import { Link, Form, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.post("/api/auth/register", data);
    toast.success("Registration successfull");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message); // safely access error message from backend if it exists
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="emirTestDefault" />
        <FormRow
          labelText="Last Name"
          type="text"
          name="lastname"
          defaultValue="salmanTestDefault"
        />
        <FormRow
          labelText="E-mail"
          type="text"
          name="email"
          defaultValue="emirTest@gmail.com"
        />
        <FormRow
          labelText="Password"
          type="text"
          name="password"
          defaultValue="secret123Test"
        />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
