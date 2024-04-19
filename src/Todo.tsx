import {ChangeEvent} from "react";
import {FilteredValue} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button, Checkbox} from "@mui/material";

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
  changeTodoTitle: (id: string, newTitle: string) => void;
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
  const changeTodolistTitle = (title: string) => {
    props.changeTodoTitle(props.id, title);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan onChange={changeTodolistTitle} title={props.title} />

        <IconButton aria-label="delete" size="small" onClick={removeTodolist}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
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
            <div key={t.id} className={t.isDone ? "done" : ""}>
              <Checkbox
                onChange={onChangeHandler}
                checked={t.isDone}
                color="secondary"
              />

              {/* <span>{t.title}</span> */}
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />

              <IconButton
                aria-label="delete"
                size="small"
                onClick={onRemoveHandler}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>
          );
        })}
      </ul>
      <div>
        <Button
          size="small"
          color={"inherit"}
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={filterAll}
        >
          All
        </Button>
        <Button
          size="small"
          color={"primary"}
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={filterActive}
        >
          Active
        </Button>
        <Button
          size="small"
          color={"secondary"}
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={filterCompleted}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
