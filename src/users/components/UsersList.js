import React, { useContext } from "react";

import UserCard from "./UserCard";
import LogedUserCard from "./LogedUserCard";

import { AuthContext } from "../../shared/context/auth-context";

import "./UsersList.css";

const UsersList = (props) => {
  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <div className="center">
        <div>
          <h2>No users found.</h2>
        </div>
      </div>
    );
  }

  const LoggedUser = props.items.find((u) => u.id === auth.userId);

  return (
    <ul className="users-list">
      {auth.isLoggedIn && (
        <LogedUserCard id={LoggedUser.id} name={LoggedUser.name} blogCount={LoggedUser.blogs.length}/>
      )}
      {props.items.map((user) => {
        if (auth.userId !== user.id) {
          return (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              blogCount={user.blogs.length}
            />
          );
        } else {
          return <div key={user.id}></div>;
        }
      })}
    </ul>
  );
};

export default UsersList;
