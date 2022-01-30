import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Context/Context";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";

function SendMessagesForm({ selectedRoom, messages, setMessages }) {
  const { user } = useContext(UserContext);
  const [messageInput, setMessageInput] = useState({
    message: "",
  });
  const onChange = (e) => {
    setMessageInput({ ...messageInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="fixed-bottom d-flex justify-content-end">
      <Form.Group className="w-75">
        <Form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <InputGroup size="lg" className="mb-3">
            <FormControl
              type="text"
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
