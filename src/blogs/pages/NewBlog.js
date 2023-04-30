import React from "react";
import "./NewBlog.css";

import BlogForm from "../components/BlogForm";
import Footer from "../../shared/components/Footer/Footer";

const NewBlog = () => {
  return (
    <React.Fragment>
      <div className="newBlog-content-wrap">
        <div className="newBlog-content">
          <BlogForm
            url={process.env.REACT_APP_BLOG_ROUTE}
            title=""
            content=""
            mode={"POST"}
          />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default NewBlog;
