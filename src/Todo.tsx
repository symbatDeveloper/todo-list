import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilteredValue } from "./App";
import AddItemForm from "./AddItemForm";
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (tasksId: string, todolistId: string) => void;
  changeFilter: (value: FilteredValue, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  filter: FilteredValue;
  removeTodolist: (todolistId: string) => void;
};

export function Todo(props: PropsType) {
  // const [newTaskTitle, setNewTaskTitle] = useState("");
  // const [error, setError] = useState<null | string>(null);

  //   const addNewTask = () => {
  //     if (newTaskTitle === "" || newTaskTitle.trim() === "") {
  //       setError("Title is required");
  //       return;
  //     } else {
  //       props.addTask(newTaskTitle, props.id);
  //       setNewTaskTitle(newTaskTitle);
  //     }
  //     setNewTaskTitle("");
  //   };
  //
  //   const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //     setNewTaskTitle(e.currentTarget.value);
  //   };
  //
  //   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  //     setError(null);
  //     if (e.key === "Enter") {
  //       addNewTask();
  //     }
  //   };
  const filterActive = () => {
    props.changeFilter("active", props.id);
  };
  const filterAll = () => {
    props.changeFilter("all", props.id);
  };
  const filterCompleted = () => {
    props.changeFilter("completed", props.id);
  };
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };
  return (
    <div>
      <h3>
        {props.title}
        <button onClick={removeTodolist}>x</button>
      </h3>
      <AddItemForm id={props.id} addItem={props.addTask} />
      {/* <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addNewTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div> */}

      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
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
