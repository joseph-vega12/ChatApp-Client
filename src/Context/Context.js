import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";

export const UserContext = createContext();

export const Context = (props) => {
  const [user, setUser] = useState(decodeToken(localStorage.getItem("token")));
  const [avatar, setAvatar] = useState(null); //dont rely on token rely on an axios call to users

  useEffect(() => {
    if (user != null) {
      const userId = user.id;
      axios
        .get(`http://localhost:4000/users/${userId}`, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((response) => {
          setAvatar(response.data.useravatar);
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
