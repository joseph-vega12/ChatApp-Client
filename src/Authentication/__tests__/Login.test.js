import { render, screen, fireEvent } from "@testing-library/react";
import { Context } from "../../Context/Context";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../Login";

const MockContextAndRouter = () => {
  return (
    <Context>
      <Router>
        <Login />
      </Router>
    </Context>
  );
};

describe("test login form", () => {
  it("check if username input is rendered", () => {
    render(<MockContextAndRouter />);
    const inputElement = screen.getByPlaceholderText(/Enter Username/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("check if password input is rendered", () => {
    render(<MockContextAndRouter />);
    const inputElement = screen.getByPlaceholderText(/Enter Password/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("check if username is inputed should contain a value", () => {
    render(<MockContextAndRouter />);
    const inputElement = screen.getByPlaceholderText(/Enter Username/i);
    fireEvent.change(inputElement, { target: { value: "Username" } });
    expect(inputElement.value).toBe("Username");
  });

  it("check if password is inputed should contain a value", () => {
    render(<MockContextAndRouter />);
    const inputElement = screen.getByPlaceholderText(/Enter Password/i);
    fireEvent.change(inputElement, { target: { value: "Password" } });
    expect(inputElement.value).toBe("Password");
  });

  it("check if button is rendered", () => {
    render(<MockContextAndRouter />);
    const buttonElement = screen.getByRole("button", { name: /log in/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
