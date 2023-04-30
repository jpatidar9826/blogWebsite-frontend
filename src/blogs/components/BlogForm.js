/* Packages */
import React, { useContext, useState } from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";

/* CSS */
import "./BlogForm.css";

import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

/* Components */
const BlogForm = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [failRes, setFailRes] = useState(false);
  const [failResMsg, setFailResMsg] = useState(
    "Sign up failed ,please try again"
  );

  const initialValues = {
    title: props.title,
    content: props.content,
  };

  const newBlogSchema = Yup.object().shape({
    title: Yup.string()
      .required("Blog title required")
      .min(5, "min. 5 characters"),
    content: Yup.string()
      .required("Content is required")
      .min(50, "min. 50 characters"),
  });

  const submitHandler = async (values) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + auth.token
      );
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        content:values.content,
        title: values.title,
      });

      const requestOptions = {
        method: props.mode,
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
      history.push(`/${auth.userId}/blogs`);
    } catch (err) {
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
                <label htmlFor="title" style={{color: 'black'}}>Title</label>
                <Field
                  type="title"
                  name="title"
                  id="title"
                  style={{color: 'black'}}
                  className={
                    errors.title && touched.title ? "input-error" : null
                  }
                />
                <span className={formik.errors.title ? "error" : "no-error"}>
                  {touched.title &&
                    (formik.errors.title ? formik.errors.title : "✓")}
                </span>
              </div>
              <div className="form-row">
                <label htmlFor="content" style={{color: 'black'}}>Content</label>
                <Field
                  type="content"
                  name="content"
                  id="content"
                  component="textarea"
                  rows={20}
                  style={{color: 'black'}}
                  className={
                    errors.content && touched.content ? "input-error" : null
                  }
                />
                <span className={formik.errors.content ? "error" : "no-error"}>
                  {touched.content &&
                    (formik.errors.content ? formik.errors.content : "✓")}
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
                  Post Blog
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default BlogForm;
