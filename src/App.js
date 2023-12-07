import "./App.css";
import Signup from "./Components/Main/User/Auth/Signup";
import Login from "./Components/Main/User/Auth/Login";
import { Route, Routes } from "react-router-dom";
import TodoList from "./Components/Main/User/Auth/TodoList/TodoList";


export const config = {
  endpoint: `
  https://kind-plum-dhole-sock.cyclic.app`,
};

function App() {

  
  return (
    <div className="App container-fluid">

      <Routes>
        <Route path="/todo" element={<TodoList />} exact />

        <Route path="/user/login" element={<Login />} exact />

        <Route path="/" element={<Signup />} exact />
      </Routes>
    </div>
  );
}

export default App;
