import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.listItem}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className={css.moviePoster}
            />
            <p className={css.movieTitle}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
