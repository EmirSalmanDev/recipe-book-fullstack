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
    await axios.post("/api/auth/login", data);
    toast.success("Login successfull");
    return redirect("/dashboard");
  } catch (error) {
    // for displaying in components --> useActionData
    toast.error(error?.response?.data?.message); // safely access error message from backend if it exists
    return error;
  }
};

const Login = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
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
        <button type="button" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
