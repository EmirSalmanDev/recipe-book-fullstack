import React from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  try {
    await axios.delete(`/api/recipes/${params.id}`);
    toast.success("Recipe Deleted Successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return redirect("/dashboard/all-recipes");
};
