import React, { useState, useEffect, useContext } from "react";

import "./UserBlogs.css";
import { useParams, useHistory } from "react-router-dom";
import LogedUserCard from "../components/LogedUserCard";
import BlogsList from "../../blogs/components/BlogsList";
import { AuthContext } from "../../shared/context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import UserCard from "../components/UserCard";
import UserUpCard from "../components/UserUpCard";
import Footer from "../../shared/components/Footer/Footer";

const UserBlogs = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [loadedUser, setLoadedUser] = useState();
  const [loadedUBlogs, setLoadedUBlogs] = useState();
  const [updateMode, setUpdateMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const userId = useParams().userId;

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
        `${process.env.REACT_APP_USER_ROUTE}/${userId}`,
        requestOptions
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.msg);
      }
      auth.logout();
      history.push("/");
    } catch (err) {}
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_USER_ROUTE}/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchBlogs();
  }, [userId]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BLOG_ROUTE}/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        setLoadedUBlogs(responseData.blogs);
      } catch (err) {}
    };
    if (loadedUser && loadedUser.blogs.length !== 0) {
      fetchBlogs();
    }
  }, [userId, loadedUser]);

  return (
    <React.Fragment>
      <div className="UserBlogs-content-wrap">
        <div className="UserBlogs-content">
          {!updateMode ? (
            loadedUser && loadedUser.id === auth.userId ? (
              <LogedUserCard
                name={loadedUser.name}
                id={loadedUser.id}
                email={loadedUser.email}
                blogCount={loadedUser.blogs.length}
                userblog={true}
              />
            ) : (
              loadedUser && (
                <UserCard
                  name={loadedUser.name}
                  id={loadedUser.id}
                  blogCount={loadedUser.blogs.length}
                />
              )
            )
          ) : (
            loadedUser && (
              <div className="UserForm-wrap">
                <UserUpCard
                  url={`${process.env.REACT_APP_USER_ROUTE}/${userId}`}
                  name={loadedUser.name}
                  email={loadedUser.email}
                />
              </div>
            )
          )}
        </div>

        {auth.isLoggedIn && loadedUser && loadedUser.id === auth.userId && (
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
              <h3>Please, confirm to delete your account!!</h3>
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
        <div className="UserBlogs-Blogs">
          {!updateMode && loadedUBlogs && <BlogsList items={loadedUBlogs} />}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default UserBlogs;
