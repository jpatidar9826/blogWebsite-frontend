import React from "react";
import { Link } from "react-router-dom";

import "./BlogCard.css";

const BlogCard = (props) => {
  let words = props.content.split(" ");
  let slicedWords = words.slice(0, 50);
  let newStr = slicedWords.join(" ");
  let upDate = new Date(props.updatedAt).toLocaleDateString();
  let creDate = new Date(props.createdAt).toLocaleDateString();

  if (props.readMode) {
    return (
      <div className="blog-item">
        <div className="blog-item__content">
          <div className="blog-title">
            <h2>{props.title}</h2>
            <Link to={`/${props.authorId}/blogs`}>
              <p style={{
    transition: "font-size 0.3s ease-in-out",
    ":hover": {
      fontSize: "1rem",
    },
  }} >By: {props.author}</p>
            </Link>
          </div>
          <div className="blog-content">
            <p>{props.content}</p>
          </div>
          <div className="blog-footer">
            <p>Created: {creDate}</p>
            <p>Modified: {upDate}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <li className="blog-item">
      <div className="blog-item__content">
        <Link to={`/${props.id}/blog`}>
          <div className="blog-title">
            <h2>{props.title}</h2>
            <p>By: {props.author}</p>
          </div>
          <div className="blog-content">
            <p>{newStr}.....</p>
          </div>
          <div className="blog-footer">
            <p>Created: {creDate}</p>
            <p>Modified: {upDate}</p>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default BlogCard;
