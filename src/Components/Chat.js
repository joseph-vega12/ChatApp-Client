import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Common/NavigationBar";
import Rooms from "./Rooms";
import Messages from "../Components/Messages";
import { Container, Row, Col } from "react-bootstrap";

function Chat() {
  const [rooms, setRooms] = useState([]);
  const [roomInfo, setRoomInfo] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
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
        throw error;
      });
  };
  const selectRoom = (roomId) => {
    setSelectedRoom(roomId);
    const roomName = rooms
      .filter((room) => room.id === roomId)
      .map((filteredName) => {
        return filteredName;
      });
    setRoomInfo(roomName[0]);
  };

  return (
    <Container fluid>
      <Row>
        <Rooms rooms={rooms} setRooms={setRooms} selectRoom={selectRoom} />
        <Col className="p-0">
          <Nav roomInfo={roomInfo} />
          <Messages
            rooms={rooms}
            selectedRoom={selectedRoom}
            fetchRooms={fetchRooms}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
