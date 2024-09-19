import { useLocation } from "react-router-dom"
import { useState, useEffect} from "react"
import Message from "../layout/message"
import styles from "./projects.module.css"
import LinkButton from "../layout/linkButton"
import Container from "../layout/container"
import Loading from "../layout/Loading"
import ProjectCard from "../projectForm/ProjectCard"

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
        },2500)

    }

    useEffect(() => {
        setTimeout(() =>{
            fetch('https://api-server-costs.vercel.app/projects', {
            method: 'GET' ,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
        },500)
    },[])

    const removeProject = (id) => {
        setProjectMessage('')

        fetch(`https://api-server-costs.vercel.app/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((resp) => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch((erro) => console.log(erro))
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
                 handleRemove={removeProject}/>      
                ))}
                {removeLoading === false && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há Projetos cadastrados</p>
                )}
            </Container> 
        </div>
    )
}

export default Projects