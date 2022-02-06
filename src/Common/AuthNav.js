import { Navbar, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function AuthNav() {
  return (
    <Navbar className="w-50 fixed-top">
      <Container>
        <Navbar.Brand href="#">
          <Icon.ChatDots className="mb-1 me-3" size={35} />
          ChatApp
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default AuthNav;
