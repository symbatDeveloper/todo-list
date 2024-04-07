import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilteredValue } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (tasksId: string) => void;
  changeFilter: (value: FilteredValue) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filter: FilteredValue;
};

export function Todo(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<null | string>(null);

  const addNewTask = () => {
    if (newTaskTitle === "" || newTaskTitle.trim() === "") {
      setError("Title is required");
      return;
    } else {
      props.addTask(newTaskTitle);
      setNewTaskTitle(newTaskTitle);
    }
    setNewTaskTitle("");
  };

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addNewTask();
    }
  };
  const filterActive = () => {
    props.changeFilter("active");
  };
  const filterAll = () => {
    props.changeFilter("all");
  };
  const filterCompleted = () => {
    props.changeFilter("completed");
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addNewTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>

      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id);
          };
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked);
          };
          return (
            <li key={t.id} className={t.isDone ? "done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />

              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>

      <div>
        <button
          className={props.filter === "all" ? "active-button" : ""}
          onClick={filterAll}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-button" : ""}
          onClick={filterActive}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-button" : ""}
          onClick={filterCompleted}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
