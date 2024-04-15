import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import axios from "axios";

const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = React.lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = React.lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App = () => {
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
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />
          <Route
            path="/movies"
            element={<MoviesPage movies={movies} setMovies={setMovies} />}
          />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;