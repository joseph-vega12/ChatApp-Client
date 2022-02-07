import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Alert,
} from "react-bootstrap";
import AuthNav from "../Common/AuthNav";
import HeroImage from "../assets/messaging-with-smartphone.jpg";

function Login() {
  const [input, setInput] = useState({ username: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(false);
    }, 4000);
  }, [errorMessage]);

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const loginForm = e.currentTarget;
    if (loginForm.checkValidity() === true) {
      axios
        .post("http://localhost:4000/auth/login", {
          username: e.target.username.value,
          password: e.target.password.value,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          navigate("/");
        })
        .catch((error) => {
          if (error.response.status === 401 || 404) {
            setErrorMessage(!errorMessage);
          }
        });
    }
    setValidated(true);
  };

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex flex-column justify-content-center" lg={6}>
          <AuthNav />
          <Col className="ms-auto me-auto mb-4" lg={9}>
            <h1>Log in.</h1>
            <p>
              Log In to begin chating about trending topics across the globe!
            </p>
          </Col>
          <Form
            className="w-75 me-auto ms-auto"
            noValidate
            validated={validated}
            onSubmit={onSubmit}
          >
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                required
                name="username"
                placeholder="Enter Username"
                label="username"
                onChange={(e) => onChange(e)}
                value={input.username}
              />
              <Form.Control.Feedback type="invalid">
                Username required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                name="password"
                placeholder="Enter Password"
                label="password"
                onChange={(e) => onChange(e)}
                value={input.password}
              />
              <Form.Control.Feedback type="invalid">
                Password required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3"></Form.Group>
            <Alert variant="danger" show={errorMessage}>
              Incorrect username or password.
            </Alert>
            <Button
              className="w-100 text-center"
              variant="primary"
              type="submit"
            >
              Log in
            </Button>
            <p className="text-center mt-4">
              Dont have an account? <Link to="/register">Sign up</Link>
            </p>
          </Form>
        </Col>
        <Col className="p-0" lg={6}>
          <Image className="w-100 vh-100" src={HeroImage} alt="heroImage" />
        </Col>
      </Row>
    </Container>
  );
}
export default Login;
