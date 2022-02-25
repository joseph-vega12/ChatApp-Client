import { createContext } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const Socket = (props) => {
  const socket = io("http://localhost:4000");

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};
