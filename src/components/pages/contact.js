import styles from './contact.module.css'
import setaBaixo from '../../img/seta_preta.png'

const Contact = () => {

    return(
        <div className={styles.container_contacts}>
            <h1>Contatos</h1>
            <p> Links para contato Abaixo </p>
            <p> Links para contato Abaixo </p>
            
            <div className={styles.container_img}>
                <img src={setaBaixo} alt="Seta-Baixo" /> 
            </div>
        </div>
    )
}

export default Contact