import { useState } from "react";
import axios from "axios";
import { Modal, Form, Button, Image } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function CreateRoomModal(props) {
  const [previewImage, setPreviewImage] = useState(null);
  const [formInput, setFormInput] = useState({ roomName: "" });
  const [file, setFile] = useState("");
  const [validated, setValidated] = useState(false);

  const onChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
    setFile(e.target.files[0]);
  };

  const changePicture = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const validatedInput = e.currentTarget;

    formData.append("roomName", e.target.roomName.value);
    formData.append("avatar", file);
    if (validatedInput.checkValidity() === true) {
      axios
        .post("http://localhost:4000/chat/rooms", formData, {
          headers: {
            token: localStorage.getItem("token"),
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          props.setroom([...props.rooms, response.data]);
          props.onHide();
        })
        .catch((error) => {
          throw error;
        });
    }
    setValidated(true);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="create-room-popup"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New Room
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="w-50 ms-auto me-auto mt-5 mb-5"
          noValidate
          validated={validated}
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <Form.Group className="mb-3 mb-5 text-center">
            {previewImage === null ? (
              <Icon.Image size={100} />
            ) : (
              <Image
                className="w-50"
                src={previewImage}
                roundedCircle={true}
                thumbnail={true}
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Room Picture</Form.Label>
            <Form.Control
              type="file"
              required
              accept="image/*"
              name="avatar"
              onChange={(e) => {
                onChange(e);
                changePicture(e);
              }}
            />
            <Form.Control.Feedback type="invalid">
              File required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              required
              name="roomName"
              placeholder="Enter Room Name"
              value={formInput.roomName}
              onChange={(e) => {
                onChange(e);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Room name required.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            className="w-100 text-center mt-3"
            variant="primary"
            type="submit"
          >
            Create Room
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} type="button">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateRoomModal;
