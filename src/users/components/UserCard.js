import React from 'react';
import { Link } from 'react-router-dom';

import './UserCard.css';

const UserCard = props => {
  return (
    <li className="user-item">
      <div className="user-item__content">
        <Link to={`/${props.id}/blogs`}>
          <div className="user-item__image">
            <h2>{ props.name[0].toUpperCase()}</h2>
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.blogCount} {props.blogCount === 1 ? 'Blog' : 'Blogs'}
            </h3>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default UserCard;