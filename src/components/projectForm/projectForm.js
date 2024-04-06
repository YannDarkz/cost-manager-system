import { useState, useEffect } from 'react'

import Input from '../form/input'
import Select from '../form/select'
import SubmitButton from '../form/submitBtn'
import styles from './projectForm.module.css'

const FormProject = ({ btnText, handleSubmit, projectData }) => {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        const requiredFields = document.querySelectorAll('[required]');
        console.log(requiredFields)
        let formIsValid = true;
        requiredFields.forEach(field => {
            if (field.value.trim() === '') {
                field.setCustomValidity('Este campo é obrigatório **');               
                formIsValid = false;
            }
        });

        if (!formIsValid) {
            return;
        }

     
        handleSubmit(project)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project,
             [name]:value })
    }

    const handleCategory = (e) => {
        
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                required={true}
                type="text"
                text="Nome do Projeto"
                placeHolder="insira o nome do projeto"
                name="name"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />

            <Input
                required={true}
                type="number"
                text="Orçamento do Projeto"
                placeHolder="Insira o orçamento total"
                name="budget"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                required={true}
                name="category_id"
                text="selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton  text={btnText} />
        </form>
    )
}

export default FormProject