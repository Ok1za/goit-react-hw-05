import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [params] = useSearchParams();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const query = params.get('query') || '';
                const response = await axios.get(
                    `https://api.themoviedb.org/3/trending/movie/week`,
                    {
                        params: {
                            api_key: "99ff99fb37fec644970f7ead98e7da2c",
                            language: "en-US",
                            page: 1,
                            query: query,
                        },
                    }
                );
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            }
        };

        fetchMovies();
    }, [params]);

    useEffect(() => {
        const query = searchQuery.trim();
        params.set('query', query);
        navigate(`?query=${query}`);
    }, [searchQuery, params, navigate]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Search Movies</h2>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </div>
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;