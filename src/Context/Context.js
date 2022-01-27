import { useState, createContext } from "react";

export const UserContext = createContext();

export const Context = (props) => {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ setUser, user }}>
      {props.children}
    </UserContext.Provider>
  );
};
