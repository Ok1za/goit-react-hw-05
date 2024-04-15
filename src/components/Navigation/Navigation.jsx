import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

const Navigation = () => (
    <nav className={styles.navigation}>
        <NavLink to="/" exact="true" className={styles.link}>
            Home
        </NavLink>
        <NavLink to="/movies" className={styles.link}>
            Movies
        </NavLink>
    </nav>
);

export default Navigation;