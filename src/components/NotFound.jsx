import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/app.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <h1>404 - Страница не найдена</h1>
      <button onClick={() => navigate("/")} className={styles.backButton}>
        На главную
      </button>
    </div>
  );
};

export default NotFound;
