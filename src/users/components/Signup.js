/* Packages */
import React, { useContext, useState } from "react";
import { Form, Formik, Field} from "formik";
import * as Yup from "yup";

/* CSS */
import "./Login.css";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';

/* Components */
const Signup = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [failRes, setFailRes] = useState(false);
  const [failResMsg, setFailResMsg] = useState(
    "Sign up failed ,please try again"
  );

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const signInSchema = Yup.object().shape({
    
    name: Yup.string().required("Name is required").min( 3, "min. 3 characters" ),

    email: Yup.string().email().required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "too short - min. 6 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain uppercase letter & 1 special character.'),
      
  });

  const submitHandler = async (values) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_USER_ROUTE}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        
        setFailRes(true);
        setFailResMsg(responseData.msg);
        throw new Error(responseData.msg);
      }

      
      auth.login(responseData.userId, responseData.token);
      setFailRes(false);
      history.push("/");
    } catch (err) {
      setFailRes(true);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
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
                <label htmlFor="name">Name</label>
                <Field
                  type="name"
                  name="name"
                  id="name"
                  className={errors.name && touched.name ? "input-error" : null}
                />
                <span className={formik.errors.name ? "error" : "no-error"}>
                  {touched.name &&
                    (formik.errors.name ? formik.errors.name : "✓")}
                </span>
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <span className={formik.errors.email ? "error" : "no-error"}>
                  {touched.email &&
                    (formik.errors.email ? formik.errors.email : "✓")}
                </span>
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <span className={formik.errors.password ? "error" : "no-error"}>
                  {touched.password &&
                    (formik.errors.password ? formik.errors.password : "✓")}
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
                  Sign Up
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Signup;
