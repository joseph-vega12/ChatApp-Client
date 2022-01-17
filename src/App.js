import { Routes, Route } from "react-router-dom";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import Chat from "./Components/Chat";
import PrivateRoute from "./RestrictedRoute/PrivateRoute";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
