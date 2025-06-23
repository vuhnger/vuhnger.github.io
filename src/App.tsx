import './App.css';
import "./components/NavBar/NavBar.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import { Analytics } from "@vercel/analytics/react"
import TimeTracker from './components/TimeTracker/TimeTracker';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timetracker" element={<TimeTracker />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
      <Analytics/>
    </Router>
  );
}