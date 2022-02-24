import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import SendMessagesForm from "./SendMessagesForm";
import * as Icon from "react-bootstrap-icons";
import { Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { UserContext } from "../Context/Context";
import "./Messages.css";
import io from "socket.io-client";
const socket = io("http://localhost:4000");

function Messages({ rooms, selectedRoom, fetchRooms }) {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages(data);
    });
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
          className={`pt-3 pb-3 ${
            user.id === message.sentbyid
              ? "d-flex flex-row-reverse"
              : "d-flex justify-content-start"
          }`}
        >
          <div className="MessageImage">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{message.username}</Tooltip>}
            >
              {message.useravatar != null ? (
                <Image
                  className="w-75"
                  roundedCircle={true}
                  src={`http://localhost:4000/${message.useravatar}`}
                  alt="user avatar"
                />
              ) : (
                <Icon.PersonCircle size={40} />
              )}
            </OverlayTrigger>
          </div>
          <div>
            <Button
              variant={
                user.id === message.sentbyid
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
        rooms={rooms}
        fetchRooms={fetchRooms}
      />
    </div>
  );
}
export default Messages;
