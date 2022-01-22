import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [input, setInput] = useState({ username: "", password: "" });
  let navigate = useNavigate();

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/auth/login", {
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
          type="text"
          name="username"
          placeholder="Enter Username"
          label="username"
          onChange={(e) => onChange(e)}
          value={input.username}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          label="password"
          onChange={(e) => onChange(e)}
          value={input.password}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
