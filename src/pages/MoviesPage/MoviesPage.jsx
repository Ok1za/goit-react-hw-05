import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/trending/movie/week`,
                    {
                        params: {
                            api_key: "99ff99fb37fec644970f7ead98e7da2c",
                            language: "en-US",
                            page: 1,
                        },
                    }
                );
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            }
        };

        fetchTrendingMovies();
    }, []);

    useEffect(() => { }, [searchQuery]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Trending Movies</h2>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </div>
            <MovieList movies={filteredMovies} />
        </div>
    );
};

export default MoviesPage;