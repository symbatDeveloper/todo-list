import React, { useState } from "react";

import "./App.css";
import { TaskType, Todo } from "./Todo";
import { v1 } from "uuid";

export type FilteredValue = "completed" | "all" | "active";

type TodolistType = {
  id: string;
  title: string;
  filter: FilteredValue;
};

function App() {
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredtask = tasks.filter((t) => {
      return t.id !== id;
    });
    tasksObj[todolistId] = filteredtask;
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      setTasks({ ...tasksObj });
    }
  }

  function changeFilter(value: FilteredValue, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }
  let todolistId1 = v1();
  let todolistId2 = v1();
  let todolistId3 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "what to learn", filter: "all" },
    { id: todolistId2, title: "what to read", filter: "active" },
    { id: todolistId3, title: "what to refresh", filter: "completed" },
  ]);

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "css", isDone: true },
      { id: v1(), title: "react2", isDone: true },
      { id: v1(), title: "redux", isDone: false },
      { id: v1(), title: "java", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "milk", isDone: true },
      { id: v1(), title: "bred", isDone: true },
    ],
    [todolistId3]: [
      { id: v1(), title: "completed", isDone: true },
      { id: v1(), title: "jogging", isDone: true },
    ],
  });

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForToDoList = tasksObj[tl.id];

        if (tl.filter === "active") {
          tasksForToDoList = tasksForToDoList.filter((t) => t.isDone === false);
        }
        if (tl.filter === "completed") {
          tasksForToDoList = tasksForToDoList.filter((t) => t.isDone === true);
        }

        return (
          <Todo
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForToDoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
