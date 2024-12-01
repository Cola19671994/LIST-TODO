import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/app.module.css";

const API_URL = "http://localhost:3000/tasks";

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`).then((response) => setTask(response.data));
  }, [id]);

  const updateTask = (field, value) => {
    axios.patch(`${API_URL}/${id}`, { [field]: value }).then((response) => setTask(response.data));
  };

  const deleteTask = () => {
    if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      axios.delete(`${API_URL}/${id}`).then(() => navigate("/"));
    }
  };

  if (!task) return <div className={styles.app}>Загрузка...</div>;

  return (
    <div className={styles.app}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Назад
      </button>
      <h1>{task.title}</h1>
      <textarea
        value={task.description}
        onChange={(e) => updateTask("description", e.target.value)}
        placeholder="Описание задачи"
        className={styles.textarea}
      />
      <div>
        <button onClick={() => updateTask("completed", !task.completed)} className={styles.toggleButton}>
          {task.completed ? "Отметить как невыполненную" : "Отметить как выполненную"}
        </button>
        <button onClick={deleteTask} className={styles.deleteButton}>
          Удалить задачу
        </button>
      </div>
    </div>
  );
};

export default TaskPage;
