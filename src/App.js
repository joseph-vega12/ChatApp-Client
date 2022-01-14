import { Routes, Route } from "react-router-dom";
import Register from "./Authentication/Register";
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
      </Routes>
    </>
  );
}

export default App;
