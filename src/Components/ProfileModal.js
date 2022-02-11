import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/Context";
import axios from "axios";
import { Modal, Form, Button, Image } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function CreateRoomModal(props) {
  const { user } = useContext(UserContext);
  const [previewImage, setPreviewImage] = useState(null);
  const [formInput, setFormInput] = useState({ username: "", email: "" });
  const [file, setFile] = useState("");
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    setFormInput({
      username: user.username,
      email: user.email,
    });
  }, [user]);

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

    formData.append("email", formInput.email);
    formData.append("username", formInput.username);
    formData.append("userAvatar", file);
    if (validatedInput.checkValidity() === true) {
      axios
        .put("http://localhost:4000/users/16", formData, {
          headers: {
            token: localStorage.getItem("token"),
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
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
      aria-labelledby="user-popup"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Profile</Modal.Title>
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
              <Icon.PersonCircle size={150} />
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
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              required
              accept="image/*"
              name="userAvatar"
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
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              required
              name="username"
              placeholder="Enter Username"
              value={formInput.username}
              onChange={(e) => {
                onChange(e);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Username required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              name="email"
              placeholder="john@appleseed.com"
              value={formInput.email}
              onChange={(e) => {
                onChange(e);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Email required.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            className="w-100 text-center mt-3"
            variant="primary"
            type="submit"
          >
            Update Profile
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateRoomModal;
