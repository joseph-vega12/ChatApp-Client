import { useState, useContext } from "react";
import axios from "axios";
import { SocketContext } from "../Context/Socket";
import { UserContext } from "../Context/Context";
import { Form, Button, InputGroup } from "react-bootstrap";
import "./SendMessageForm.css";

function SendMessagesForm({
  selectedRoom,
  messages,
  setMessages,
  rooms,
  fetchRooms,
}) {
  const { socket } = useContext(SocketContext);
  const { user, avatar } = useContext(UserContext);
  const [messageInput, setMessageInput] = useState({
    message: "",
  });
  const [validated, setValidated] = useState(false);
  const onChange = (e) => {
    setMessageInput({ ...messageInput, [e.target.name]: e.target.value });
  };
  const updateLatestMessage = () => {
    axios
      .put(
        "http://localhost:4000/chat/latest-message",
        {
          roomId: selectedRoom,
          message: messageInput.message,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        rooms.map((room) => {
          return room.id === selectedRoom
            ? Object.assign(room, response.data)
            : null;
        });
        socket.emit("fetch-rooms", fetchRooms());
      })
      .catch((error) => {
        throw error;
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const sendMessageForm = e.currentTarget;
    if (sendMessageForm.checkValidity() === true) {
      axios
        .post(
          "http://localhost:4000/chat/messages",
          {
            roomId: selectedRoom,
            sentById: user.id,
            message: messageInput.message,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          const newMessage = [
            ...messages,
            {
              id: response.data.id,
              userAvatar: avatar,
              username: user.username,
              message: response.data.message,
              sentById: response.data.sentById,
            },
          ];
          socket.emit("send-message", newMessage);
          setMessages(newMessage);
          setMessageInput({ ...messageInput, message: "" });
          updateLatestMessage();
        })
        .catch((error) => {
          throw error;
        });
    }
    setValidated(true);
  };

  return (
    <div className="navbar fixed-bottom d-flex justify-content-end pb-0">
      <Form.Group className="w-75">
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <InputGroup size="lg" className="MessageInput w-100">
            <Form.Control
              type="text"
              required
              name="message"
              placeholder="Message"
              label="message"
              value={messageInput.message}
              onChange={(e) => {
                onChange(e);
              }}
            />
            <Button variant="secondary">Send</Button>
          </InputGroup>
        </Form>
      </Form.Group>
    </div>
  );
}

export default SendMessagesForm;
