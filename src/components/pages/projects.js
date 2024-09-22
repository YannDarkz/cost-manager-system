import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import Message from "../layout/message"
import styles from "./projects.module.css"
import LinkButton from "../layout/linkButton"
import Container from "../layout/container"
import Loading from "../layout/Loading"
import ProjectCard from "../projectForm/ProjectCard"

import { getDocs, doc, deleteDoc } from "firebase/firestore"
import { useCollectionRef } from "../../App"



const Projects = () => {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = '';
    if (location.state) {
        message = location.state.message
        setTimeout(() => {
            message = ''
        }, 2500)

    }

    useEffect(() => {
        
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const response = await getDocs(useCollectionRef)
            const data = response.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log("dates", data);
            setProjects(data)

        } catch (err) {
            console.log(err);

        }
    }

    // console.log("projects", projectsF);

    if (projects.length === 0) {
        setTimeout(() => {
            setRemoveLoading(true)
        }, 2000)
    }


    const removeProject = async (id) => {
        setProjectMessage('')
        console.log(id);
        

        const projectDoc = doc(useCollectionRef, id)
        await deleteDoc(projectDoc)
        await fetchProjects()
        setProjectMessage('Projeto removido com sucesso!')
    }

    return (
        <div className={styles.projects_container}>
            <div className={styles.container_tittle}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="sucess" msg={message} />}
            {projectMessage && <Message type="sucess" msg={projectMessage} />}
            <Container customClass="column_center">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject} />
                    ))}
                {removeLoading === false && <Loading />}
                {projects.length === 0 && (
                    <p>Não há Projetos cadastrados</p>
                )}
            </Container>
        </div>
    )
}

export default Projects