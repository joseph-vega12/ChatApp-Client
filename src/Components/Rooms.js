import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../Context/Socket";
import CreateRoomModal from "./CreateRoomModal";
import {
  Col,
  InputGroup,
  Button,
  FormControl,
  Image,
  Offcanvas,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "./Rooms.css";
import WindowWidth from "../helpers/WindowWidth";

function Rooms({ rooms, setRooms, selectRoom, show, setShow }) {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("recieve-room", (data) => {
      setRooms(data);
    });
  }, [rooms]);

  const [modalShow, setModalShow] = useState(false);
  const { width } = WindowWidth();

  const setButtonRoomActive = (roomId) => {
    rooms.map((room) => {
      return roomId === room.id ? (room.active = true) : (room.active = false);
    });
  };
  return (
    <Offcanvas
      className={`bg-dark ${width >= 992 ? "w-25" : "w-100"}`}
      scroll={true}
      show={show}
      backdrop={false}
      lg={10}
    >
      <Offcanvas.Header
        className="pb-0"
        onClick={() => {
          setShow(false);
        }}
        closeButton={width <= 992 ? true : false}
        closeVariant="white"
      >
        <Offcanvas.Title>
          <h3>Rooms</h3>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="RoomsColumn">
        <Col>
          <Button
            className="mb-3"
            type="button"
            size="sm"
            variant="outline-secondary"
            onClick={() => {
              setModalShow(!modalShow);
            }}
          >
            + Create new room
          </Button>
          <InputGroup className="pb-4 ms-auto me-auto w-100">
            <Button variant="outline-secondary">
              <Icon.Search />
            </Button>
            <FormControl />
          </InputGroup>
        </Col>
        {rooms.map((room) => (
          <Col key={room.id}>
            <Button
              className={`${
                show === true
                  ? "d-flex justify-content-start p-4 mb-2"
                  : "d-none"
              }`}
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
                  src={room.roomImage}
                  alt="roomPicture"
                />
              </div>
              <div className="RoomBody p-1 ps-3 text-start">
                <h4>{room.roomName}</h4>
                <p>{room.latestMessage}</p>
              </div>
            </Button>
          </Col>
        ))}
        <CreateRoomModal
          show={modalShow}
          rooms={rooms}
          onHide={() => setModalShow(false)}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Rooms;
