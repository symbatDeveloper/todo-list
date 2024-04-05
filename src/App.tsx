import React, { useState } from "react";

import "./App.css";
import { TaskType, Todo } from "./Todo";
import { v1 } from "uuid";
import { error } from "console";
export type FilteredValue = "all" | "completed" | "active";

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
        addTask={addTask}
        changeTaskStatus={changeStatus}
      />
    </div>
  );
}

export default App;
