import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function FormikForm(props) {
  const formSubmit = (values, tools) => {
    console.log("values", values);
    console.log("tools", tools);
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log("res", res);
        tools.resetForm();
      })
      .catch(err => console.log("error", err))
      .finally();
  };

  const validate = () => {
    // validationSchema:
    Yup.object().shape({
      name: Yup.string()
        .min(3, "Too short!")
        .required("Name required!"),
      email: Yup.string()
        .email("Email not valid!")
        .required("Email required!"),
      password: Yup.string()
        .min(6)
        .required("Password is required!"),
      tos: Yup.required("Please accept Terms of Service")
    });
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", tos: false }}
      onSubmit={formSubmit}
      validation={validate}
      render={props => (
        <Form>
          {console.log("FormProps", props)}
          <Field placeholder="name" name="name" type="text" />
          <Field placeholder="email" name="email" type="email" />
          <Field placeholder="password" name="password" type="password" />
          <Field placeholder="" name="tos" type="checkbox" />
          <button type="submit">Submit</button>
        </Form>
      )}
    />
  );
}
