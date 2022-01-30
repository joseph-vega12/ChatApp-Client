import { Col, InputGroup, Button, FormControl, Card } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "./Rooms.css";

function Rooms({ rooms, selectRoom }) {
  const setButtonRoomActive = (roomId) => {
    rooms.map((room) => {
      return roomId === room.id ? (room.active = true) : (room.active = false);
    });
  };

  return (
    <Col className="RoomsColumn" sm={6} md={5} lg={4} xl={3} xxl={3}>
      <Col className="d-flex justify-content-between m-4">
        <h3 className="m-0">Rooms</h3>
        <h6 className="m-0 p-2">+ Create new room</h6>
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
              <div className="UserPicture">
                <Icon.PersonCircle className="me-3" size={40} />
              </div>
              <div className="RoomBody">
                <Card.Title>{room.roomname}</Card.Title>
                <Card.Subtitle>Hello This is a test Room</Card.Subtitle>
              </div>
            </Card.Body>
          </Button>
        </Card>
      ))}
    </Col>
  );
}

export default Rooms;
