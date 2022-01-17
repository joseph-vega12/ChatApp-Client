import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
          onChange={onChange}
          value={input.email}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          label="username"
          onChange={onChange}
          value={input.username}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          label="password"
          onChange={onChange}
          value={input.password}
        />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
