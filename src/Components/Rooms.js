import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../Context/Socket";
import CreateRoomModal from "./CreateRoomModal";
import { Col, InputGroup, Button, FormControl, Image } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "./Rooms.css";

function Rooms({ rooms, setRooms, selectRoom }) {
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.on("recieve-room", (data) => {
      setRooms(data);
    });
  }, [rooms]);
  const [modalShow, setModalShow] = useState(false);
  const setButtonRoomActive = (roomId) => {
    rooms.map((room) => {
      return roomId === room.id ? (room.active = true) : (room.active = false);
    });
  };

  return (
    <Col className="RoomsColumn bg-dark" lg={4}>
      <Col className="d-flex justify-content-between m-4">
        <h3 className="m-0">Rooms</h3>
        <Button
          type="button"
          size="sm"
          variant="outline-secondary"
          onClick={() => {
            setModalShow(true);
          }}
        >
          + Create new room
        </Button>
      </Col>
      <InputGroup className="pb-4 ms-auto me-auto w-100">
        <Button variant="outline-secondary" id="button-addon1">
          <Icon.Search />
        </Button>
        <FormControl />
      </InputGroup>
      {rooms.map((room) => (
        <Button
          className="d-flex justify-content-start p-4 mb-2"
          key={room.id}
          variant={room.active === true ? "primary" : "dark"}
          type="null"
          onClick={() => {
            setButtonRoomActive(room.id);
            selectRoom(room.id);
          }}
        >
          <div className="RoomPicture">
            <Image
              className="w-75"
              roundedCircle={true}
              src={`http://localhost:4000/${room.roomImage}`}
              alt="roomPicture"
            />
          </div>
          <div className="RoomBody p-1 ps-3 text-start">
            <h4>{room.roomName}</h4>
            <p>{room.latestMessage}</p>
          </div>
        </Button>
      ))}
      <CreateRoomModal
        show={modalShow}
        rooms={rooms}
        onHide={() => setModalShow(false)}
      />
    </Col>
  );
}

export default Rooms;
