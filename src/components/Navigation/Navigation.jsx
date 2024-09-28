import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? css.active : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? css.active : undefined)}
      >
        Movies
      </NavLink>
    </nav>
  );
}
