import { useState } from "react";
import axios from "axios";

function SendMessagesForm({ selectedRoom }) {
  const [messageInput, setMessageInput] = useState({
    sentBy: "audrey", //Will be gotten from global state depending on what user is logged in, in this case Audrey
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
          sentBy: messageInput.sentBy,
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
        console.log(response.data);
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
