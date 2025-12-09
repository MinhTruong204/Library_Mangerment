import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserLayout from "./layout/userlayout";


const Preloader = () => (
  <div className="preloader">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);


function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />} />

    </Routes>
  );
}

export default App;
