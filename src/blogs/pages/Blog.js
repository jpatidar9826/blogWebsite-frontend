import React, { useContext, useEffect, useState } from "react";
import "./Blog.css";

import BlogForm from "../components/BlogForm";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../shared/context/auth-context";

import BlogCard from "../components/BlogCard";
import Footer from "../../shared/components/Footer/Footer";

const Blog = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [loadedblog, setLoadedBlog] = useState();
  const [updateMode, setUpdateMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const blogId = useParams().blogId;

  const updateModeHandler = () => {
    setUpdateMode(!updateMode);
  };

  const deleteModeHandler = () => {
    setDeleteMode(!deleteMode);
  };

  const deleteHandler = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + auth.token);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `${process.env.REACT_APP_BLOG_ROUTE}/${blogId}`,
        requestOptions
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        throw new Error(responseData.msg);
      }

      history.push(`/${auth.userId}/blogs`);
    } catch (err) {}
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BLOG_ROUTE}/${blogId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        setLoadedBlog(responseData.blog);
      } catch (err) {}
    };
    fetchBlog();
  }, [blogId]);

  return (
    <React.Fragment>
      <div className="Blog-content-wrap">
        {updateMode ? (
          <div className="Blog-content">
            {loadedblog && (
              <BlogForm
                url={`${process.env.REACT_APP_BLOG_ROUTE}/${blogId}`}
                title={loadedblog.title}
                content={loadedblog.content}
                mode={"PATCH"}
              />
            )}
          </div>
        ) : (
          <div className="Blog-read">
            {loadedblog && (
              <BlogCard
                key={loadedblog.id}
                id={loadedblog.id}
                title={loadedblog.title}
                content={loadedblog.content}
                authorId={loadedblog.author.id}
                author={loadedblog.author.name}
                updatedAt={loadedblog.updatedAt}
                createdAt={loadedblog.createdAt}
                readMode={true}
              />
            )}
          </div>
        )}

        {auth.isLoggedIn &&
          loadedblog &&
          loadedblog.author.id === auth.userId && (
            <div className="Up-Del-holder">
              <button className="upButton" onClick={updateModeHandler}>
                {!updateMode && <FontAwesomeIcon icon={faPen} />}
                {!updateMode ? "Edit" : "Cancel"}
              </button>
              <button className="delButton" onClick={deleteModeHandler}>
                <FontAwesomeIcon icon={faTrashCan} />
                Delete
              </button>
            </div>
          )}

        {deleteMode && (
          <div className="deleteLayer">
            <div className="deleteCard">
              <h3>Please, Confirm to Delete this Blog</h3>
              <div className="Up-Del-holder">
                <button className="delButton" onClick={deleteHandler}>
                  <FontAwesomeIcon icon={faTrashCan} />
                  Delete
                </button>
                <button className="upButton" onClick={deleteModeHandler}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Blog;
