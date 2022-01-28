import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SendMessagesForm from "./SendMessagesForm";
import { Container, Row, Col } from "react-bootstrap";
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
    <Container fluid>
      <div className="Messages">
        <Row>
          {messages.map((message) => (
            <Col
              key={message.id}
              lg="12"
              className={
                user.username === message.sentby
                  ? "d-flex justify-content-end"
                  : "d-flex justify-content-start"
              }
            >
              <h4>{message.message}</h4>
            </Col>
          ))}
        </Row>
      </div>
      <SendMessagesForm selectedRoom={selectedRoom} messages={messages} setMessages={setMessages} />
    </Container>
  );
}
export default Messages;
