import { useNavigate } from 'react-router-dom'

import styles from './newProject.module.css'
import FormProject from '../projectForm/projectForm'
const NewProject = () => {

    const navigate = useNavigate()

    const creatPost = (project) => {

        // initialize cost and services
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)

                //redirect
                navigate('/projects', {state :{ message: 'Projeto Enviado com Sucesso!' } })

            })
            .catch((err) => console.log(err))


    }

    return (
        <div className={styles.newProject_Container}>
            <h1>Criar Projetos</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <FormProject handleSubmit={creatPost} btnText="criar projeto" />
        </div>
    )
}

export default NewProject