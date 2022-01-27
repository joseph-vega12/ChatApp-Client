import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Context/Context";

function SendMessagesForm({ selectedRoom }) {
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
        setMessageInput({ ...messageInput, message: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="SendMessageForm">
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <input
          type="text"
          name="message"
          placeholder="message"
          label="message"
          value={messageInput.message}
          onChange={(e) => {
            onChange(e);
          }}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default SendMessagesForm;
