import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home }  from "./componets/Home";
import { About } from "./componets/About";
import { LoginDashboard } from "./componets/LoginDashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="About" element={<About />}></Route>
      <Route path="LoginDashboard" element={<LoginDashboard />}></Route>
    </Routes>
  );
}

export default App;