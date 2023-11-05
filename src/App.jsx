import { Routes, Route } from "react-router-dom";
import UserCreateForm from "./Component/UserCreateForm";
import Login from "./Pages/Login";
import Protectd from "./Component/Protected/Protectd";
import UserList from "./Pages/UserList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user-list" element={<Protectd Component={UserList} />} />
      <Route
        path="/create-user"
        element={<Protectd Component={UserCreateForm} />}
      />
      <Route path="/sing-up" element={<UserCreateForm />} />
    </Routes>
  );
}

export default App;
