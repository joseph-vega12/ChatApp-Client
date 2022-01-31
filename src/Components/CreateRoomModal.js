import { useEffect, useState } from "react";
import { Modal, Form, Button, Image } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function CreateRoomModal(props) {
  const [previewImage, setPreviewImage] = useState(null);
  const [formInput, setFormInput] = useState({ file: "", roomName: "" });

  // useEffect(() => {
  //   console.log(previewImage);
  // }, [previewImage]);

  const onChange = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="create-room-popup" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New Room
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="w-50 ms-auto me-auto mt-5 mb-5">
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
              accept="image/*"
              name="roomPicture"
              onChange={(e) => {
                onChange(e);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              name="roomName"
              placeholder="Enter Room Name"
              onChange={(e) => {
                onChange(e);
              }}
            />
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
        <Button type="button" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateRoomModal;
