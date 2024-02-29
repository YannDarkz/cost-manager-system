

import { useState } from 'react'

import styles from '../projectForm/projectForm.module.css'

import Input from '../form/input'
import TextArea from '../form/textArea'
import SubmitButton from '../form/submitBtn'

const ServiceForm = ({ textBtn, handleSubmit, projectData }) => {

    const [service, setService] = useState({})

    const submit = (e) => {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setService({ ...service, [name]: value })

    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                required={true}
                text="Nome do serviço"
                type="text"
                name="name"
                placeHolder="Insra o nome do serviço *"
                handleOnChange={handleChange}
            />
            <Input
                required={true}
                text="Custo do serviço"
                type="number"
                name="cost"
                placeHolder="Insra o custo do serviço *"
                handleOnChange={handleChange}
            />

            <TextArea
                text="Descriação do Serviço"
                name="description"
                placeHolder="Insra o custo do serviço opcional"
                handleOnChange={handleChange} />
            <SubmitButton text={textBtn} />
        </form>
    )
}

export default ServiceForm