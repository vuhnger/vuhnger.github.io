import './App.css'
import "./components/NavBar/NavBar.css";
import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom';
import Home from './components/Home/Home.tsx'
import About from './components/About/About.tsx'
import Projects from './components/Projects/Projects.tsx'
import NavBar from './components/NavBar/NavBar.tsx'
import Dashboard from './components/Dashboard/Dashboard.tsx';

export default function App() {

  return(
    <Router>
      <NavBar />
      <Routes>
      
        <Route index path="/home" element= {<Home/>} />
          <Route path="/about" element={ <About/>} />
          <Route path="/projects" element={ <Projects />} />
          <Route path="/dashboard" element={<Dashboard/>} />
      
      </Routes>
    </Router>
  );
}

