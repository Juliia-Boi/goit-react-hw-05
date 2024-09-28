import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/tmdb-api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchMovieCredits(movieId)
      .then(setCast)
      .catch((err) => setError("Failed to fetch cast information"))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul className={css.castList}>
      {cast.map((actor) => (
        <li key={actor.id}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                : "https://via.placeholder.com/150"
            }
            alt={actor.name}
            className={css.actorImage}
          />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
