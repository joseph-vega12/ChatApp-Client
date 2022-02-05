import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Nav from "../Common/NavigationBar";
import Rooms from "./Rooms";
import Messages from "../Components/Messages";
import io from "socket.io-client";
import { Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../Context/Context";
import { decodeToken } from "react-jwt";

function Chat() {
  const { setUser } = useContext(UserContext);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomInfo, setRoomInfo] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/chat/rooms", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setRooms(response.data);
        setUser(decodeToken(localStorage.getItem("token")));
      })
      .catch((error) => {
        throw error;
      });
  }, []);
  
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
        <Rooms rooms={rooms} setroom={setRooms} selectRoom={selectRoom} />
        <Col lg={9} className="p-0 border-start">
          <Nav roomInfo={roomInfo} />
          <Messages selectedRoom={selectedRoom} />
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
