import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Context/Context";
import { Form, Button, InputGroup } from "react-bootstrap";

function SendMessagesForm({ selectedRoom, messages, setMessages }) {
  const { user } = useContext(UserContext);
  const [messageInput, setMessageInput] = useState({
    message: "",
  });
  const [validated, setValidated] = useState(false);

  const onChange = (e) => {
    setMessageInput({ ...messageInput, [e.target.name]: e.target.value });
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
            sentBy: user.username,
            message: messageInput.message,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          setMessages([...messages, response.data]);
          setMessageInput({ ...messageInput, message: "" });
        })
        .catch((error) => {
          throw error;
        });
    }
    setValidated(true);
  };

  return (
    <div className="navbar fixed-bottom d-flex justify-content-end pb-1">
      <Form.Group className="w-75">
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <InputGroup size="lg" className="">
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
            <Form.Control.Feedback type="invalid">
              Message required.
            </Form.Control.Feedback>
          </InputGroup>
        </Form>
      </Form.Group>
    </div>
  );
}

export default SendMessagesForm;
