import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Header from "./components/Header.tsx";
import Applications from "./components/Applications/Applications.tsx";

export default function App() {

  return (
    <>
        <Header/>

        <Router>

            <Routes>
                <Route path="/" element={<Applications />} />
            </Routes>

        </Router>
        <Navbar/>

    </>
  )
}

