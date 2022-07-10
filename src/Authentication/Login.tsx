import { useEffect, useState, useContext, ChangeEvent } from "react";
import axiosInstance from "../axios";
import { useNavigate, Link } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { UserContext } from "../Context/Context";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import AuthNav from "../Common/AuthNav";

interface LoginInput {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const [input, setInput] = useState<LoginInput>({
    username: "",
    password: "",
  });

  const [validated, setValidated] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    let timer = setTimeout(() => setShowErrorMessage(false), 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [showErrorMessage]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loginForm = e.target as HTMLInputElement;
    if (loginForm.checkValidity() === true) {
      axiosInstance
        .post("/auth/login", {
          username: input.username,
          password: input.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token); // jwt is not going to have avatar
          setUser(decodeToken(response.data.token));
          navigate("/");
        })
        .catch((error) => {
          if (error.response.status === 401 || 404) {
            setShowErrorMessage(!showErrorMessage);
          }
        });
    }
    setValidated(true);
  };

  return (
    <Container fluid>
      <AuthNav />
      <Row>
        <Col className="d-flex flex-column justify-content-center" lg={6}>
          <Col className="ms-auto me-auto mb-4" xs={10} sm={9} lg={9}>
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                value={input.password}
              />
              <Form.Control.Feedback type="invalid">
                Password required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3"></Form.Group>
            <Alert variant="danger" show={showErrorMessage}>
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
        <Col className="HeroImage" lg={6}></Col>
      </Row>
    </Container>
  );
};
export default Login;
