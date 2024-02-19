import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { Income, Expense, Saving, Report } from "./pages";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <h1> BUZZ Financial Management App</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/saving" element={<Saving />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </div>
  );
}
