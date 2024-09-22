import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import Home from "./components/pages/home";
import Contact from "./components/pages/contact";
import Company from "./components/pages/company";
import NewProject from "./components/pages/newProject";
import Projects from "./components/pages/projects";
import Project from "./components/pages/project";

import Container from "./components/layout/container";
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer";

import { initializeApp } from "firebase/app"
import { getFirestore, getDocs, collection } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDlkSEJcws_-Xp7o3NqLCK35DPOUbU0AQA",
  authDomain: "costs-system.firebaseapp.com",
  projectId: "costs-system"

})

 export const db = getFirestore(firebaseApp);

 export const useCollectionRef = collection(db, "projects");
function App() {


  useEffect(() => {
    const getProjects = async () => {
      const data = await getDocs(useCollectionRef);
      // console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };
    getProjects();
  })


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
