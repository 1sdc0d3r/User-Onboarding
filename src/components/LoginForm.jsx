import React, { useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched, isSubmitting }) {
  return (
    <Form className="form">
      <div className="name-email">
        <div className="form-name form-field">
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}
          <Field name="name" placeholder="Name" type="text" />
        </div>
        <div className="form-email form-field">
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
          <Field name="email" placeholder="Email" type="email" />
        </div>
      </div>
      <div className="skill-pass">
        <div className="form-skill form-field">
          <Field name="skill" component="select">
            <option value="novice">Novice</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </Field>
        </div>
        <div className="form-pass form-field">
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
          <Field name="password" placeholder="Password" type="password" />
        </div>
      </div>
      <div className="tos-btn">
        <div className="form-tos form-field">
          {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}
          <label className="form-tos-label">
            <Field name="tos" type="checkbox" checked={values.tos} />: Accept
            ToS
          </label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="form-submit-btn"
        >
          {isSubmitting ? "Submitting" : "Submit!"}
        </button>
      </div>
    </Form>
  );
}

const CreateFormikForm = ({ userList, newUser, sort }) => {
  // function sort(arr) {
  //   let nameArray = [];
  //   let newUserList = [];

  //   for (let i = 0; i < arr.length; i++) {
  //     nameArray.push(arr[i].name);
  //   }
  //   nameArray.sort();
  //   for (let j = 0; j < nameArray.length; j++) {
  //     newUserList.push(arr.find(e => e.name === nameArray[j]));
  //   }
  //   newUser(newUserList);
  // }

  useEffect(() => sort(userList), []);

  // userList !== sort(userList) ? console.log(true) : console.log(false);
  // if (userList !== sort(userList)) {
  // sort(userList);
  //   }

  const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, tos, skill }) {
      return {
        name: name || "",
        skill: skill || "novice",
        email: email || "",
        password: password || "",
        tos: tos || false
      };
    },

    validationSchema: yup.object().shape({
      name: yup
        .string()
        .min(3, "Too Short!")
        .required("Name Required!"),
      email: yup
        .string()
        .min(4)
        .email("Email not valid!"),
      password: yup
        .string()
        .min(6, "Password must be 6 characters or longer!")
        .required("Password is Required!"),
      tos: yup.boolean().oneOf([true], "Please accept Terms and Conditions")
    }),

    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
      setTimeout(() => {
        if (!userList.find(e => values.email === e.email)) {
          axios
            .post("https://reqres.in/api/users", values)
            .then(
              res => (
                console.log(res),
                setSubmitting(false),
                newUser([
                  ...userList,
                  {
                    name: res.data.name,
                    email: res.data.email,
                    skill: res.data.skill,
                    password: res.data.password
                  }
                ])
              )
            )
            .then(console.log(userList)) //? this should log the state with the new object correct?
            .catch(err => console.log("error", err), setSubmitting(false))
            .finally(resetForm());
        } else {
          setSubmitting(false);
          setErrors({ email: "That email is already taken" });
        }
      }, 500);
    }
  })(LoginForm);
  return <FormikLoginForm />;
};

export default CreateFormikForm;
