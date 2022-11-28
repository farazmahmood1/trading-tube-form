import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register";
import Welcome from "./Components/Welcome";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Welcome />} /> */}
          <Route path="/" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
