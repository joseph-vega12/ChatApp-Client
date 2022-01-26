import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Common/NavigationBar";
import Messages from "../Components/Messages";
import io from "socket.io-client";
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function Chat() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(1);

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
    <>
      <Container fluid>
        <Row className="h-100">
          <Col sm={6} md={5} lg={4} xl={3} xxl={3}>
            <Col className="d-flex justify-content-between m-4" lg="auto">
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
                  selectRoom(room.id);
                }}
              >
                <Card.Body className="d-flex p-4 justify-content-start">
                  <div className="UserPicture">
                    <Icon.PersonCircle className="me-3" size={40} />
                  </div>
                  <div className="Rooms">
                    <Card.Title>{room.roomname}</Card.Title>
                    <Card.Subtitle>Hello This is a test Room</Card.Subtitle>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col lg={9} className="p-0 border-start">
            <Nav />
            <Messages selectedRoom={selectedRoom} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Chat;
