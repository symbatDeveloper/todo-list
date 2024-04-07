import React, { useState } from "react";

import "./App.css";
import { TaskType, Todo } from "./Todo";
import { v1 } from "uuid";
export type FilteredValue = "completed" | "all" | "active";

function App() {
  let [tasks, setTask] = useState([
    { id: v1(), title: "css", isDone: true },
    { id: v1(), title: "react2", isDone: true },
    { id: v1(), title: "redux", isDone: false },
    { id: v1(), title: "java", isDone: true },
  ]);

  const [filter, setFilter] = useState<FilteredValue>("all");

  function removeTask(id: string) {
    let filteredtask = tasks.filter((t) => {
      return t.id !== id;
    });
    setTask(filteredtask);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTask(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }

    setTask([...tasks]);
  }

  let tasksForToDoList = tasks;

  if (filter === "active") {
    tasksForToDoList = tasks.filter((t) => t.isDone === false);
  }
  if (filter === "completed") {
    tasksForToDoList = tasks.filter((t) => t.isDone === true);
  }
  function changeFilter(value: FilteredValue) {
    setFilter(value);
  }

  let [todo, setTodo] = useState([
    { id: v1(), title: "what to learn", filter: "all" },
    { id: v1(), title: "what to read", filter: "active" },
    { id: v1(), title: "what to refresh", filter: "completed" },
  ]);

  return (
    <div className="App">
      <Todo
        title="what to learn"
        tasks={tasksForToDoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
