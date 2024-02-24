import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Contact from "./components/pages/contact";
import Company from "./components/pages/company";
import NewProject from "./components/pages/newProject";
import Projects from "./components/pages/projects";
import Project from "./components/pages/project";

import Container from "./components/layout/container";
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass='minHeight'  >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </Container>
      <Footer />
    </Router >
  );
}

export default App;
