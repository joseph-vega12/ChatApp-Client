import { useState, useEffect, useRef, useContext } from "react";
import axiosInstance from "../axios";
import NavigationBar from "../Common/NavigationBar";
import SendMessagesForm from "./SendMessagesForm";
import * as Icon from "react-bootstrap-icons";
import { Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { SocketContext } from "../Context/Socket";
import { UserContext } from "../Context/Context";
import "./Messages.css";

function Messages({
  rooms,
  selectedRoom,
  fetchRooms,
  roomInfo,
  setShow,
  show,
}) {
  const { socket } = useContext(SocketContext);
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
    socket.on("recieve-fetch-rooms", () => {
      fetchRooms();
    });
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedRoom != null) {
      axiosInstance
        .get(`/chat/messages/${selectedRoom}`, {
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

  return (
    <div>
      <div className="Messages">
        <NavigationBar setShow={setShow} show={show} roomInfo={roomInfo} />
        {selectedRoom == null ? (
          <div className="Messages d-flex flex-column justify-content-center">
            <h1 className="d-flex justify-content-center opacity-50">
              Select A Room
            </h1>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`pt-3 pb-3 ${
                  user.id === message.sentById
                    ? "d-flex flex-row-reverse"
                    : "d-flex justify-content-start"
                }`}
              >
                <div className="MessageImage">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{message.username}</Tooltip>}
                  >
                    {message.userAvatar != null ? (
                      <Image
                        className="w-75 h-100"
                        roundedCircle={true}
                        src={message.userAvatar}
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
                      user.id === message.sentById
                        ? "primary mw-25"
                        : "secondary mw-25"
                    }
                  >
                    {message.message}
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      {selectedRoom !== null ? (
        <SendMessagesForm
          selectedRoom={selectedRoom}
          messages={messages}
          setMessages={setMessages}
          rooms={rooms}
          fetchRooms={fetchRooms}
        />
      ) : null}
    </div>
  );
}
export default Messages;
