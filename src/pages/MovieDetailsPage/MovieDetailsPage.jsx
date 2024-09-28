import { useEffect, useState } from "react";
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/tmdb-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const backLinkHref = location.state?.from || "/movies";

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError("Failed to fetch movie details.");
      }
    };
    getMovieDetails();
  }, [movieId]);

  const goBack = () => {
    navigate(backLinkHref);
  };

  return (
    <div className={css.container}>
      {error && <p className={css.error}>{error}</p>}

      {movie && (
        <>
          <button onClick={goBack} className={css.goBackButton}>
            Go back
          </button>
          <div className={css.movieDetails}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={css.poster}
              />
            )}

            <div className={css.movieInfo}>
              <h1 className={css.title}>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </h1>
              <p className={css.userScore}>
                User score: {movie.vote_average.toFixed(2)}
              </p>

              <h2>Overview</h2>
              <p className={css.overview}>{movie.overview}</p>

              <h2>Genres</h2>
              {movie.genres && movie.genres.length > 0 ? (
                <ul className={css.genreList}>
                  {movie.genres.map((genre) => (
                    <li key={genre.id} className={css.genreItem}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No genres available.</p>
              )}
            </div>
          </div>

          <div className={css.linksContainer}>
            <Link
              to="cast"
              className={css.link}
              state={{ from: location.state?.from || "/" }}
            >
              Cast
            </Link>
            <Link
              to="reviews"
              className={css.link}
              state={{ from: location.state?.from || "/" }}
            >
              Reviews
            </Link>
          </div>

          <Outlet />
        </>
      )}
    </div>
  );
}
