import { v4 as uuidv4 } from 'uuid'
// parse, uuid acima mais tarde
import styles from './project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/container'
import Message from '../layout/message'

import FormProject from '../projectForm/projectForm'
import ServiceForm from '../services/serviceForm'
import ServiceCard from '../services/serviceCard'
import ProjectInfo from '../projectForm/infoProject'


const Project = () => {
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState(false)
    const [type, setType] = useState()
    

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(resp => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch(err => console.log(err))
        }, 1000)

    }, [id])

    const editProject = (project) => {
        if (project.budget < project.cost) {

            setMessage('O orçamento não pode ser menor que o custo do projeto')
            setType('error')
            setTimeout(() => {
                setMessage(false)
            }, 2500)
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
                setShowProjectForm(!showProjectForm)
                setMessage('Projeto Atualizado!!!')
                setType('sucess')

                setTimeout(() => {
                    setMessage(false)
                }, 2500)
            })
            .catch(err => console.log(err))
    }

    const createService = (project) => {
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)


        // Validação de Maximo valor

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()

            setTimeout(() => {
                setMessage(false)
            }, 2500)
            return false
        }

        //  add custo total do serviço ao projeto

        project.cost = newCost

        // update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
            .then((data) => {
                setShowServiceForm(!showServiceForm)
                setMessage('Serviço Adicionado com sucesso')
                setType('sucess')

                setTimeout(() =>{
                    setMessage(false)
                },2500)
            })
            .catch((err) => console.log(err))
    }
    

    const removeService = (id, cost) => {

        const serviceUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = serviceUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then(resp => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(serviceUpdated)
            setMessage('serviço removido com sucesso!')
            setType('sucess')

            setTimeout(() => {
                setMessage(false)
            }, 2500)
        })
        .catch((erro) => console.log(erro))


    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)
        if (!showProjectForm) {
            setShowServiceForm(false)
        }
    }

    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)
        if (!showServiceForm) {
            setShowProjectForm(false)
        }
    }

    return (
        < >
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>

                            {!showProjectForm ? (
                                <ProjectInfo
                                    category={project.category.name}
                                    budget={Number(project.budget).toFixed(2)}
                                    costs={project.cost.toFixed(2)} 
                                    totalAvailable={Number(project.budget - project.cost).toFixed(2) }/>
                            ) : (
                                <FormProject btnText='Concluir Edição' handleSubmit={editProject} projectData={project} />
                            )}
                        </div>
                        <div className={styles.services_form_container}>
                            <h2>Adicione um Serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        textBtn="Adicionar Serviço"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 && (
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                    
                                ))
                            )}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project