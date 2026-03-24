import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Scrape from "./pages/Scrape";
import JobResult from "./pages/JobResult";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/scrape" element={<Scrape />} />
        <Route path="/job/:id" element={<JobResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;