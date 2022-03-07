import { useState, useEffect } from "react";
import axiosInstance from "../axios";
import Nav from "../Common/NavigationBar";
import Rooms from "./Rooms";
import Messages from "../Components/Messages";
import WindowWidth from "../helpers/WindowWidth";
import { Container, Row, Col } from "react-bootstrap";

function Chat() {
  const [rooms, setRooms] = useState([]);
  const [roomInfo, setRoomInfo] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { width } = WindowWidth();
  const [roomsToggle, setRoomsToggle] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    return width <= 992 ? setShow(false) : setShow(true);
  }, [width]);

  const fetchRooms = () => {
    axiosInstance
      .get("/chat/rooms", {
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
        <Col>
          <Rooms
            setShow={setShow}
            show={show}
            roomsToggle={roomsToggle}
            rooms={rooms}
            setRooms={setRooms}
            selectRoom={selectRoom}
          />
        </Col>
        <Col className="p-0" lg={9}>
          <Nav
            setShow={setShow}
            show={show}
            roomsToggle={roomsToggle}
            setRoomsToggle={setRoomsToggle}
            roomInfo={roomInfo}
          />
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
