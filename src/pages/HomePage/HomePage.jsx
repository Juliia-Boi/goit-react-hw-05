import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/tmdb-api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";

import css from "./HomePage.module.css";

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchTrendingMovies();
        setTrendMovies(data);
      } catch (error) {
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <div>
      <h2 className={css.title}>Trending today</h2>
      {error && <ErrorMessage error={error} />}
      {trendMovies.length > 0 && <MovieList movies={trendMovies} />}
      {isLoading && <Loader />}
    </div>
  );
}
