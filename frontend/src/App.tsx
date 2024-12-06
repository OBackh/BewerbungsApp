import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import Applications from "./components/Applications/Applications.tsx";

export default function App() {

  return (

        <Router>
            <Header/>

            <Routes>
                <Route path="/" element={<Applications />} />
            </Routes>
            <Footer/>

        </Router>

  )
}

