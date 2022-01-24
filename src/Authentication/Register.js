import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/auth/register", {
        email: e.target.email.value,
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          label="email"
          onChange={(e) => onChange(e)}
          value={input.email}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          label="username"
          onChange={(e) => onChange(e)}
          value={input.username}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          label="password"
          onChange={(e) => onChange(e)}
          value={input.password}
        />
        <button>Register</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Register;
