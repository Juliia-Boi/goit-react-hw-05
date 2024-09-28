import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/tmdb-api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {reviews.length > 0 ? (
        <ul className={css.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <h3 className={css.authorName}>{review.author}</h3>
              <p className={css.reviewContent}>
                {review.content.length > 300
                  ? `${review.content.slice(0, 300)}...`
                  : review.content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
}
