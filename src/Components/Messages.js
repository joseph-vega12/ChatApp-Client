import { useState, useEffect } from "react";
import axios from "axios";
import SendMessagesForm from "./SendMessagesForm";

function Messages({ selectedRoom }) {
  const [messages, setMessages] = useState([]);
  // const socket = io("http://localhost:4000");
  // socket.on("send-message", ({ name, message }) => {
  //   setChat([...chat, { name, message }])
  useEffect(() => {
    if (selectedRoom != null) {
      axios
        .get(`http://localhost:4000/chat/messages/${selectedRoom}`, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedRoom]);

  return selectedRoom === null ? (
    <div className="SelectRoomMessage">
      <h1>Select A Room</h1>
    </div>
  ) : (
    <div className="Container">
      <div className="Messages">
        <h1>Messages</h1>
        {messages.map((message) => (
          <h2 key={message.id}>{message.message}</h2>
        ))}
      </div>
      <SendMessagesForm selectedRoom={selectedRoom} />
    </div>
  );
}
export default Messages;
