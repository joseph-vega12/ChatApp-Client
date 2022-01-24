import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Messages from "../Components/Messages";
import io from "socket.io-client";

function Chat() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

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

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const selectRoom = (roomId) => {
    setSelectedRoom(roomId);
  };

  return (
    <div className="Container">
      <h4 onClick={logout}>Logout</h4>
      <div className="Rooms">
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
    </div>
  );
}

export default Chat;
