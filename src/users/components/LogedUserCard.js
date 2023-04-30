import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";



import "./UserCard.css";

const LogedUserCard = (props) => {
  

  return (
    <li className="user-item">
      <div
        className="user-item__content"
        style={{
          boxShadow:
            "inset 0 4px 8px 0 rgba(0, 0, 0, 0.2), inset 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          borderRadius: "1rem",
        }}
      >
        <Link to={`/${props.id}/blogs`}>
          <div className="user-item__image">
            <h2>{props.name[0].toUpperCase()}</h2>
          </div>
          <div className="user-item__info">
            <h2>Hello, {props.name}</h2>
            <h3>
              {props.blogCount} {props.blogCount === 1 ? "Blog" : "Blogs"}
            </h3>
          </div>
        </Link>
        <Link to="/blog/new">
          <button className="logout-button" style={{ color: "#3AAFA9" }}>
            <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>New Blog
          </button>
        </Link>
      </div>
    </li>
  );
};

export default LogedUserCard;
