import { Navbar } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "./AuthNav.css";

function AuthNav() {
  return (
    <div className="Navigation">
      <Navbar className="w-50 mb-3 ps-3">
        <Navbar.Brand href="/">
          <Icon.ChatDots className="mb-1 me-3" size={35} />
          ChatApp
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default AuthNav;
