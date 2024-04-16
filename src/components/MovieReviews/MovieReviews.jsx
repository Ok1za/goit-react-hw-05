import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
                    {
                        params: {
                            api_key: "5dcd8c9ad0243e8d0169b63510b06dad",
                        },
                    }
                );
                setReviews(response.data.results);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [movieId]);

    return (
        <ul className={styles.list}>
            {reviews.map((review) => (
                <li key={review.id} className={styles.item}>
                    <h4 className={styles.author}>Author: {review.author}</h4>
                    <p className={styles.content}>{review.content}</p>
                </li>
            ))}
        </ul>
    );
};

export default MovieReviews;