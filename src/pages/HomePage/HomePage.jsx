import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/trending/movie/week`,
                    {
                        params: {
                            api_key: "5dcd8c9ad0243e8d0169b63510b06dad",
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

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Trending Movies</h2>
            { }
            <MovieList movies={movies} />
        </div>
    );
};

export default HomePage;