import { Routes, Route } from "react-router-dom";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import Chat from "./Components/Chat";
import PrivateRoute from "./RestrictedRoute/PrivateRoute";
import { Context } from "./Context/Context";
import { Socket } from "./Context/Socket";

function App() {
  return (
    <Socket>
      <Context>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Context>
    </Socket>
  );
}

export default App;
