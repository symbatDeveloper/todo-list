import React, { useState } from "react";

import "./App.css";
import { TaskType, Todo } from "./Todo";
import { v1 } from "uuid";
export type FilteredValue = "all" | "completed" | "active";

function App() {
  let [tasks, setTask] = useState<Array<TaskType>>([
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
  function addTask() {
    let newTask = { id: v1(), title: "newtask", isDone: false };
    let newTasks = [newTask, ...tasks];
    setTask(newTasks);
  }

  function changeFilter(value: FilteredValue) {
    setFilter(value);
  }
  let tasksForToDoList = tasks;
  if (filter === "active") {
    return (tasksForToDoList = tasks.filter((t) => t.isDone === false));
  }
  if (filter === "completed") {
    return (tasksForToDoList = tasks.filter((t) => t.isDone === true));
  }
  return (
    <div className="App">
      <Todo
        title="what to learn"
        tasks={tasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
