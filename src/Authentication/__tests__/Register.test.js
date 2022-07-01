import { fireEvent, render, screen } from "@testing-library/react";
import { Context } from "../../Context/Context";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../Register";

const MockContextAndRouter = () => {
  return (
    <Context>
      <Router>
        <Register />
      </Router>
    </Context>
  );
};

describe("test register form", () => {
  it("check if username input is rendered", () => {
    render(<MockContextAndRouter />);
    const inputElement = screen.getByPlaceholderText(/Enter Username/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("check if email input is rendered", () => {
    render(<MockContextAndRouter />);
    const inputElement = screen.getByPlaceholderText(
      /johnapple@appleseed.com/i
    );
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
    fireEvent.change(inputElement, { target: { value: "Joseph" } });
    expect(inputElement.value).toBe("Joseph");
  });

  it("check if email is inputed should contain a value", () => {
    render(<MockContextAndRouter />);
    const inputElement = screen.getByPlaceholderText(
      /johnapple@appleseed.com/i
    );
    fireEvent.change(inputElement, { target: { value: "joseph@gmail.com" } });
    expect(inputElement.value).toBe("joseph@gmail.com");
  });

  it("check if password is inputed should contain a value", () => {
    render(<MockContextAndRouter />);
    const inputElement = screen.getByPlaceholderText(/Enter Password/i);
    fireEvent.change(inputElement, { target: { value: "password" } });
    expect(inputElement.value).toBe("password");
  });
});
