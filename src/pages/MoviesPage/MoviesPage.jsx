import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const query = params.get('query') || "";
                setSearchQuery(query);
                if (query.trim() !== "") {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/search/movie`,
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
                } else {
                    setMovies([]);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, [params]);

    const handleSearchChange = (event) => {
        const inputValue = event.target.value;
        setSearchQuery(inputValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedQuery = searchQuery.trim();
        setParams({ query: trimmedQuery });
        navigate(`?query=${trimmedQuery}`); 
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Search Movies</h2>
            <div className={styles.search}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;