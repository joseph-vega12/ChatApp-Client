import { useState, useEffect } from "react";
import ProfileModal from "../Components/ProfileModal";
import WindowWidth from "../helpers/WindowWidth";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Image, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function NavigationBar({ roomInfo, setShow, show }) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const { width } = WindowWidth();
  const [classValue, setClassValue] = useState(false);

  useEffect(() => {
    width >= 992 ? setClassValue("d-none") : setClassValue("me-3");
  }, [width]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar
      className="p-4 sticky-top"
      collapseOnSelect
      bg="light"
      variant="light"
    >
      <Button
        className={classValue}
        onClick={() => {
          setShow(!show);
        }}
        type="button"
        size="sm"
        variant="outline-secondary"
      >
        <Icon.List size={27} />
      </Button>
      <Navbar.Brand
        className={`w-25 ${roomInfo !== "" ? "d-block" : "d-none"}`}
        href="/"
      >
        <Image
          className="w-25 me-2"
          roundedCircle={true}
          src={roomInfo.roomImage}
          alt="roomInfo"
        />
        {roomInfo.roomName}
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <NavDropdown title={<Icon.ThreeDotsVertical size={27} />} align="end">
            <NavDropdown.Item
              onClick={() => {
                setModalShow(true);
              }}
            >
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item>FAQS</NavDropdown.Item>
            <NavDropdown.Item>Terms Of Use</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <ProfileModal show={modalShow} onHide={() => setModalShow(false)} />
    </Navbar>
  );
}

export default NavigationBar;
