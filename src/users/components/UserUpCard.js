/* Packages */
import React, { useContext, useState } from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";

/* CSS */
import "./UserUpCard.css";


import { AuthContext } from "../../shared/context/auth-context";

/* Components */
const UserUpCard = (props) => {
  const auth = useContext(AuthContext);
  const [failRes, setFailRes] = useState(false);
  const [failResMsg, setFailResMsg] = useState(
    "Sign up failed ,please try again"
  );

  const initialValues = {
    name: props.name,
    email: props.email,
  };

  const newBlogSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3, "min. 3 characters"),
    email: Yup.string().email().required("Email is required"),
  });

  const submitHandler = async (values) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + auth.token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: values.name,
        email: values.email,
      });

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(props.url, requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        setFailRes(true);
        setFailResMsg(responseData.msg);
        throw new Error(responseData.msg);
      }

      setFailRes(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setFailRes(true);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={newBlogSchema}
      onSubmit={(values) => {
        submitHandler(values);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            {failRes && <span className="error">{failResMsg}</span>}
            <Form>
              <div className="form-row">
                <label htmlFor="name" style={{ color: "black" }}>
                  Name
                </label>
                <Field
                  type="name"
                  name="name"
                  id="name"
                  style={{ color: "black" }}
                  className={errors.name && touched.name ? "input-error" : null}
                />
                <span className={formik.errors.name ? "error" : "no-error"}>
                  {touched.name &&
                    (formik.errors.name ? formik.errors.name : "✓")}
                </span>
              </div>
              <div className="form-row">
                <label htmlFor="email" style={{ color: "black" }}>
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  style={{ color: "black" }}
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <span className={formik.errors.email ? "error" : "no-error"}>
                  {touched.email &&
                    (formik.errors.email ? formik.errors.email : "✓")}
                </span>
              </div>
              <div className="submit-btn-wrap">
                <button
                  type="submit"
                  className={
                    !(dirty && isValid) ? "disabled-btn" : "enabled-btn"
                  }
                  disabled={!(dirty && isValid)}
                >
                  Update Data
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default UserUpCard;
