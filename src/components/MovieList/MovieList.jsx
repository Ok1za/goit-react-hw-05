import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          {}
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: location },
            }}
            className={styles.link}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className={styles.image}
            />
            <p className={styles.title}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;