import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const results = await searchMovies(query);
          setMovies(results);
          setError("");
        } catch (err) {
          setError("Failed to fetch movies.");
          setMovies([]);
        }
      };
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.query.value.trim();
    if (searchQuery === "") {
      return;
    }
    setSearchParams({ query: searchQuery });
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search movies..."
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {error && <p className={css.error}>{error}</p>}
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        query && !error && <p className={css.noResults}>No results found.</p>
      )}
    </div>
  );
}
