import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import ProfileModal from "../Components/ProfileModal";

function NavigationBar({ roomInfo }) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar className="p-4" collapseOnSelect bg="light" variant="light">
      <Navbar.Brand
        className={`w-25 ${roomInfo !== "" ? "d-block" : "d-none"}`}
        href="/"
      >
        <Image
          className="w-25 me-2"
          roundedCircle={true}
          src={`http://localhost:4000/${roomInfo.roomimage}`}
          alt="roomInfo"
        />
        {roomInfo.roomname}
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="d-flex justify-content-end">
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
