import { useState, createContext, useEffect } from "react";
import axiosInstance from "../axios";
import { decodeToken } from "react-jwt";

export const UserContext = createContext();

export const Context = (props) => {
  const [user, setUser] = useState(decodeToken(localStorage.getItem("token")));
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user != null) {
      const userId = user.id;
      axiosInstance
        .get(`/users/${userId}`, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((response) => {
          setAvatar(response.data.userAvatar);
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [avatar, user]);

  return (
    <UserContext.Provider value={{ setUser, user, setAvatar, avatar }}>
      {props.children}
    </UserContext.Provider>
  );
};
