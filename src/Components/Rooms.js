import { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import {
  Col,
  InputGroup,
  Button,
  FormControl,
  Card,
  Image,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "./Rooms.css";

function Rooms({ rooms, setroom, selectRoom }) {
  const [modalShow, setModalShow] = useState(false);
  const setButtonRoomActive = (roomId) => {
    rooms.map((room) => {
      return roomId === room.id ? (room.active = true) : (room.active = false);
    });
  };

  return (
    <Col className="RoomsColumn" sm={6} md={5} lg={4} xl={3} xxl={3}>
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
        <Card
          className="ms-auto me-auto mb-2 w-80"
          bg="light"
          key={room.id}
          onClick={() => {
            setButtonRoomActive(room.id);
            selectRoom(room.id);
          }}
        >
          <Button
            variant="outline-dark"
            type="null"
            active={room.active === true ? true : false}
          >
            <Card.Body className="d-flex p-4 justify-content-start">
              <div className="roomPicture">
                <Image
                  className="w-100"
                  roundedCircle={true}
                  thumbnail={true}
                  src={`http://localhost:4000/${room.roomimage}`}
                  alt="roomPicture"
                />
                {/* <Icon.PersonCircle className="me-3" size={40} /> */}
              </div>
              <div className="RoomBody">
                <Card.Title className="pt-1">{room.roomname}</Card.Title>
                <Card.Subtitle>Hello This is a test Room</Card.Subtitle>
              </div>
            </Card.Body>
          </Button>
        </Card>
      ))}
      <CreateRoomModal
        show={modalShow}
        rooms={rooms}
        setroom={setroom}
        onHide={() => setModalShow(false)}
      />
    </Col>
  );
}

export default Rooms;
