import React, { useEffect, useState } from "react";


import UsersList from "../../users/components/UsersList";
import BlogsList from "../components/BlogsList";

import "./Home.css";
import Footer from "../../shared/components/Footer/Footer";

const Home = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const [loadedBlogs, setLoadedBlogs] = useState();
  const [isBlogsList, setIsBlogsList] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BLOG_ROUTE, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();
        setLoadedBlogs(responseData.blogs);
      } catch (err) {}
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_USER_ROUTE}/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, []);

  const onClickHandler = () => {
    setIsBlogsList(!isBlogsList);
  };

  return (
    <React.Fragment>
      <div className="home-content-wrap">
        <div className="btn-holder" style={{ margin: "20px auto" }}>
          <div
            className={
              isBlogsList ? "btn-slider" : "btn-slider btn-slider-left"
            }
          ></div>
          <button
            onClick={onClickHandler}
            className={isBlogsList ? "" : "btn-color"}
          >
            Blogs
          </button>
          <button
            onClick={onClickHandler}
            className={isBlogsList ? "btn-color" : ""}
          >
            Users
          </button>
        </div>
        {isBlogsList ? (
          <div className="blog-holder">
            {loadedBlogs && <BlogsList items={loadedBlogs} />}
          </div>
        ) : (
          <div className="user-holder">
            {loadedUsers && <UsersList items={loadedUsers} />}
          </div>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
