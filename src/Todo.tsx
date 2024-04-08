import { ChangeEvent } from "react";
import { FilteredValue } from "./App";
import AddItemForm from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
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
  changeTaskTitle: (
    taskId: string,
    newValue: string,
    todolistId: string
  ) => void;
  filter: FilteredValue;
  removeTodolist: (todolistId: string) => void;
};

export function Todo(props: PropsType) {
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

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={removeTodolist}>x</button>
      </h3>

      <AddItemForm addItem={addTask} />

      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id);
          };

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <li key={t.id} className={t.isDone ? "done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />

              {/* <span>{t.title}</span> */}
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
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
