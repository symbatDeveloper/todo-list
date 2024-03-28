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
};
export function Todo(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addNewTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
        />
        <button onClick={addNewTask}>+</button>
      </div>

      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id);
          };
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>

      <div>
        <button onClick={filterAll}>All</button>
        <button onClick={filterActive}>Active</button>
        <button onClick={filterCompleted}>Completed</button>
      </div>
    </div>
  );
}
