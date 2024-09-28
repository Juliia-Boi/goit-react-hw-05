import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.wrapper}>
      <p className={css.notFoundText}>
        The page you are looking for does not exist
      </p>
      <Link className={css.returnLink} to="/">
        Return to Homepage
      </Link>
    </div>
  );
}
