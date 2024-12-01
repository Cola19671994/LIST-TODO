import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/app.module.css";

const API_URL = "http://localhost:3000/tasks";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByAlphabet, setSortByAlphabet] = useState(false);

  // Загрузка списка задач
  useEffect(() => {
    axios.get(API_URL).then((response) => setTasks(response.data));
  }, []);

  // Добавление задачи
  const addTask = () => {
    const title = prompt("Введите название задачи");
    if (title) {
      axios.post(API_URL, { title, description: "", completed: false }).then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
      });
    }
  };

  // Поиск задач
  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (sortByAlphabet ? a.title.localeCompare(b.title) : 0));

  return (
    <div className={styles.app}>
      <h1>Список задач</h1>

      {/* Поиск */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск задач..."
        className={styles.searchInput}
      />

      {/* Сортировка */}
      <button onClick={() => setSortByAlphabet(!sortByAlphabet)} className={styles.sortButton}>
        {sortByAlphabet ? "Отключить сортировку" : "Сортировать по алфавиту"}
      </button>

      {/* Добавление задачи */}
      <button onClick={addTask} className={styles.addButton}>
        Добавить задачу
      </button>

      {/* Список задач */}
      <div>
        {filteredTasks.length === 0 ? (
          <p>Ничего не найдено</p>
        ) : (
          filteredTasks.map(({ id, title }) => (
            <Link to={`/task/${id}`} key={id} className={styles.taskLink}>
              <div className={styles.taskItem}>{title.length > 30 ? `${title.slice(0, 30)}...` : title}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
