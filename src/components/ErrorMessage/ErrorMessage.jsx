import React from "react";
import css from "./ErrorMessage.module.css";

export default function ErrorMessage({ error }) {
  return (
    <div className={css.errorContainer}>
      <p className={css.errorText}>Error: {error}</p>
    </div>
  );
}
