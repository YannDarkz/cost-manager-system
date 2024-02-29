import styles from '../projectForm/projectCard.module.css'

import {BsFillTrashFill} from 'react-icons/bs'

const ServiceCard = ({id, name, description, cost, handleRemove}) => {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)


    }
    

    return(
        <div id={id} className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total :</span> {cost}
            </p>
            <p>
                {description}
            </p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>


        </div>
    )
}

export default ServiceCard