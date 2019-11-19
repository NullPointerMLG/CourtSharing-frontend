import React from "react";
import { User } from "firebase";
import { Redirect } from "react-router";

export const Feed: React.FC = props => {
  const loggedUser: string | null = localStorage.getItem("loggedUser");

  if (!loggedUser) return <Redirect to="/login" />;

  const user: User = JSON.parse(loggedUser);

  return (
    <div>
      <h1>Feed</h1>
      <h2>Hello {user.displayName}</h2>
    </div>
  );
};
