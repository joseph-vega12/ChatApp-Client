import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "./NavigationBar.css";

function NavigationBar({ roomInfo }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Navbar className="p-4" collapseOnSelect bg="light" variant="light">
      <Navbar.Brand
        className={`${roomInfo !== "" ? "d-block" : "d-none"}`}
        href="#"
      >
        <Image
          className="roomImage me-2"
          roundedCircle={true}
          src={`http://localhost:4000/${roomInfo.roomimage}`}
          alt="roomInfo"
        />
        {roomInfo.roomname}
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link href="#">
            <Icon.PersonCircle size={27} />
          </Nav.Link>
          <NavDropdown title={<Icon.ThreeDotsVertical size={27} />} align="end">
            <NavDropdown.Item>Profile</NavDropdown.Item>
            <NavDropdown.Item>Settings</NavDropdown.Item>
            <NavDropdown.Item>FAQS</NavDropdown.Item>
            <NavDropdown.Item>Terms Of Use</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
