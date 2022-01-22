import { useState, useEffect } from "react";
import axios from "axios";
import Messages from "../Components/Messages";
import io from "socket.io-client";

function Chat() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
      axios
        .get("http://localhost:4000/chat/rooms", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setRooms(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  const selectRoom = (roomId) => {
    setSelectedRoom(roomId);
  };

  return (
    <div className="Container">
      <h1>Rooms</h1>
      {rooms.map((room) => (
        <h3
          key={room.id}
          onClick={() => {
            selectRoom(room.id);
          }}
        >
          {room.roomname}
        </h3>
      ))}
      <Messages selectedRoom={selectedRoom} />
    </div>
  );
}

export default Chat;
