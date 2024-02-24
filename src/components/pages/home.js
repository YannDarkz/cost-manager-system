import styles from './home.module.css'
import saving from '../../img/savings.svg'
import LinkButton from '../layout/linkButton'

const Home = () => {

    return(
        <section className={styles.homeContainer}>
            <h1>Bem vinda(o) ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Projeto" />
            <img src={saving} alt="Costs" />

        </section>
    )
}

export default Home