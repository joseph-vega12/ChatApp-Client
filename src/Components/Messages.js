import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SendMessagesForm from "./SendMessagesForm";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { UserContext } from "../Context/Context";

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
          console.log(error);
        });
    }
  }, [selectedRoom]);

  return selectedRoom === null ? (
    <div className="SelectRoomMessage">
      <h1>Select A Room</h1>
    </div>
  ) : (
    <Container fluid className="pt-3">
      <div className="Messages">
        <Row>
          {messages.map((message) => (
            <Col
              key={message.id}
              lg="12"
              className={
                user.username === message.sentby
                  ? "d-flex flex-row-reverse pt-3"
                  : "d-flex justify-content-start pt-3"
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
        </Row>
      </div>
      <SendMessagesForm
        selectedRoom={selectedRoom}
        messages={messages}
        setMessages={setMessages}
      />
    </Container>
  );
}
export default Messages;
