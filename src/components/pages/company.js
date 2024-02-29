import styles from './company.module.css'

const Company = () => {

    return(
        <div className={styles.company_container}>
            <h1>Empresa</h1>
            <p>Projeto <strong> Costs<strong className={styles.copy_strong}> &copy;</strong></strong> desenvolvido visando um único beneficio, que é o beneficio do aprendizado constante a cada dia.</p>
        </div>
    )
}

export default Company