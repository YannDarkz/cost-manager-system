import styles from '../pages/project.module.css'

const ProjectInfo = ({category, budget, costs, totalAvailable }) => {


    return (
        <div className={styles.project_info}>
            <p>
                <span>Categoria: </span> {category}
            </p>    
            <p>
                <span>Total Orçamento: </span> R$: {budget}
            </p>
            <p>
                <span>Total Ultilizado: </span> R$: {costs}
            </p>
            <p>
                <span>Disponível: </span> R$: {totalAvailable}
            </p>
        </div>
    )
}

export default ProjectInfo