import { useState, useContext } from "react";
import axiosInstance from "../axios";
import { SocketContext } from "../Context/Socket";
import { UserContext } from "../Context/Context";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";

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
    axiosInstance
      .put(
        "/chat/latest-message",
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
      axiosInstance
        .post(
          "/chat/messages",
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
    <div>
      <Form
        noValidate
        validated={validated}
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <Form.Group>
          <InputGroup className="">
            <FormControl
              type="text"
              required
              name="message"
              placeholder="Message"
              label="message"
              size="lg"
              value={messageInput.message}
              onChange={(e) => {
                onChange(e);
              }}
            />
            <Button type="submit" variant="secondary">
              Send
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SendMessagesForm;
