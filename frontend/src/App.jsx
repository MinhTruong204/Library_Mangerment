import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserLayout from "./layout/userlayout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />} />
    </Routes>
  );
}

export default App;
