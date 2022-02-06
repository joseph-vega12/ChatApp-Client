import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import AuthNav from "../Common/AuthNav";
import HeroImage from "../assets/messaging-with-smartphone.jpg";

function Login() {
  const [input, setInput] = useState({ username: "", password: "" });
  let navigate = useNavigate();

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
        throw error;
      });
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
          <Form className="w-75 me-auto ms-auto" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter Username"
                label="username"
                onChange={(e) => onChange(e)}
                value={input.username}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                label="password"
                onChange={(e) => onChange(e)}
                value={input.password}
              />
            </Form.Group>
            <Form.Group className="mb-3"></Form.Group>
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
        <Col className="p-0" lg={6} >
          <Image
            className="w-100 vh-100"
            src={HeroImage}
            alt="heroImage"
          />
        </Col>
      </Row>
    </Container>
  );
}
export default Login;
