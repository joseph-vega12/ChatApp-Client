import { createContext } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const Socket = (props) => {
  const socket = io(process.env.BACKEND_URL);

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};
