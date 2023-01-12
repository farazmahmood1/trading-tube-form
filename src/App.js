import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";

function App() {
  const [code, setCode] = useState("");
  function getReferal() {
    const url = `${window.location.href}`;
    const part = url.split("?");
    const path = part[1];
    setCode(path);
  }

  useEffect(() => {
    getReferal();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register Code={code} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
