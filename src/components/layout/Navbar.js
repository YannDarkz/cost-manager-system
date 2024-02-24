import { Link } from 'react-router-dom'

import Container from './container'

import styles from './navbar.module.css'
import logo from '../../img/costs_logo.png'

const Navbar = () => {

    return (
        <nav className={styles.navbar}>
            <Link to="/">
                <img src={logo} alt="costs" />
            </Link>

            <Container>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/projects">Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/company">Empresa</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/contact">Contato</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar