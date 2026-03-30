import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home"
import HighlightDetail from "./pages/HighlightDetail";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/highlight/:id" element={<HighlightDetail />} />
    </Routes>
  );
}

export default App
