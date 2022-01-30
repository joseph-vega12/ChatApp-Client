import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SendMessagesForm from "./SendMessagesForm";
import * as Icon from "react-bootstrap-icons";
import { Col, Button } from "react-bootstrap";
import { UserContext } from "../Context/Context";
import "./Messages.css";

function Messages({ selectedRoom }) {
  const { user } = useContext(UserContext);
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
          throw error;
        });
    }
  }, [selectedRoom]);

  return selectedRoom === null ? (
    <div className="SelectRoomMessage">
      <h1>Select A Room</h1>
    </div>
  ) : (
    <div className="Messages">
      {messages.map((message) => (
        <Col
          key={message.id}
          lg="12"
          className={
            user.username === message.sentby
              ? "d-flex flex-row-reverse pt-3 pb-3"
              : "d-flex justify-content-start pt-3 pb-3"
          }
        >
          <Icon.PersonCircle className="me-3 ms-3" size={33} />
          <Button
            variant={
              user.username === message.sentby
                ? "primary mw-25"
                : "secondary mw-25"
            }
          >
            {message.message}
          </Button>
        </Col>
      ))}
      <SendMessagesForm
        selectedRoom={selectedRoom}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}
export default Messages;
