import { useNavigate } from 'react-router-dom'

import styles from './newProject.module.css'
import FormProject from '../projectForm/projectForm'

import { useCollectionRef } from '../../App'
import { addDoc } from 'firebase/firestore'

import { v4 as uuidv4 } from 'uuid'

const NewProject = () => {

    const navigate = useNavigate()

    const createPost = async (project) => {
        try {
            // Initialize cost and services
            project.cost = 0;
            project.services = [];
            const docRef = addDoc(useCollectionRef, project);
             await docRef

            console.log("newUser", docRef.id);
            
            navigate('/projects', { state: { message: 'Projeto Enviado com Sucesso!' } });
        } catch (err) {
            // Catch and log errors
            console.log(err);
        }
    };

    return (
        <div className={styles.newProject_Container}>
            <h1>Criar Projetos</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <FormProject handleSubmit={createPost} btnText="criar projeto" />
        </div>
    )
}

export default NewProject