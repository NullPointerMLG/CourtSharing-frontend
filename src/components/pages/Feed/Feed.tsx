import React, { useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../../context/UserContext";

export const Feed: React.FC = props => {
  const [user, setUser] = useContext(UserContext);

  if (!user) return <Redirect to="/login" />;

  return (
    <div>
      <h1>Feed</h1>
      <h2>Hello {user.displayName}</h2>
    </div>
  );
};
