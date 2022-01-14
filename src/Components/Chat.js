import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function Chat() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([
    { name: "Joseph", message: "Hello Coco" },
    { name: "Coco", message: "Hello Joseph" },
  ]);
  useEffect(() => {
    socket.on("send-message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socket.emit("send-message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };
  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div className="name-field">
          <input
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <input
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {chat.map(({ name, message }, index) => (
          <div key={index}>
            <h3>
              {name}: <span>{message}</span>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
