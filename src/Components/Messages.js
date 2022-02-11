import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import SendMessagesForm from "./SendMessagesForm";
import * as Icon from "react-bootstrap-icons";
import { Button, Image } from "react-bootstrap";
import { UserContext } from "../Context/Context";
import "./Messages.css";

function Messages({ selectedRoom }) {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  // const socket = io("http://localhost:4000");
  // socket.on("send-message", ({ name, message }) => {
  //   setChat([...chat, { name, message }])
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    <div className="SelectRoomMessage d-flex justify-content-center h-75">
      <h1 className="d-flex flex-column justify-content-center opacity-50">
        Select A Room
      </h1>
    </div>
  ) : (
    <div className="Messages">
      {messages.map((message) => (
        <div
          key={message.id}
          className={
            user.username === message.sentby
              ? "d-flex flex-row-reverse pt-3 pb-3"
              : "d-flex justify-content-start pt-3 pb-3"
          }
        >
          <div className="MessageImage">
            {message.useravatar != null ? (
              <Image
                className="w-50"
                roundedCircle={true}
                src="https://pbs.twimg.com/media/Ee_5_WCUYAAp9i0.jpg"
                alt="user avatar"
              />
            ) : (
              <Icon.PersonCircle size={40} />
            )}
          </div>
          <div>
            <Button
              variant={
                user.username === message.sentby
                  ? "primary mw-25"
                  : "secondary mw-25"
              }
            >
              {message.message}
            </Button>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
      <SendMessagesForm
        selectedRoom={selectedRoom}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}
export default Messages;
