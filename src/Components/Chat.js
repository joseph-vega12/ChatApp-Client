import { useState, useEffect } from "react";
import axiosInstance from "../axios";
import Rooms from "./Rooms";
import Messages from "../Components/Messages";
import Spinner from "../helpers/Spinner";
import WindowWidth from "../helpers/WindowWidth";
import { Container, Row, Col } from "react-bootstrap";

function Chat() {
  const [rooms, setRooms] = useState([]);
  const [roomInfo, setRoomInfo] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = WindowWidth();

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
      })
      .finally(() => {
        setIsLoading(false);
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
    <>
      {isLoading === true ? (
        <div className="d-flex justify-content-center vh-100">
          <Spinner enabled={isLoading} />
        </div>
      ) : (
        <Container fluid>
          <Row>
            <Col>
              <Rooms
                setShow={setShow}
                show={show}
                rooms={rooms}
                setRooms={setRooms}
                selectRoom={selectRoom}
              />
            </Col>
            <Col className="p-0" lg={9}>
              <Messages
                setShow={setShow}
                show={show}
                roomInfo={roomInfo}
                rooms={rooms}
                selectedRoom={selectedRoom}
                fetchRooms={fetchRooms}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
export default Chat;
