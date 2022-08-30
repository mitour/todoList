import { Route, Routes } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
import Todolist from "./components/Todolist";
import NotFound from "./components/NotFound";
import "./css/all.scss";
import "./css/pages/form.scss";
import "./css/pages/todolist.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/todolist" element={<Todolist />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
