import React, {useState} from "react";
import AddItemForm from "./AddItemForm";
import "./App.css";
import {Todo} from "./Todo";
import {v1} from "uuid";
import {TaskType} from "./Todo";
import {title} from "process";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Container, Grid, Paper} from "@mui/material";
export type FilteredValue = "completed" | "all" | "active";

type TodolistType = {
  id: string;
  title: string;
  filter: FilteredValue;
};
type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredtask = tasks.filter((t) => {
      return t.id !== id;
    });
    tasksObj[todolistId] = filteredtask;
    setTasks({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj});
    }
  }
  function changeTaskTitle(
    taskId: string,
    newValue: string,
    todolistId: string
  ) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newValue;
      setTasks({...tasksObj});
    }
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find((tl) => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
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
    {id: todolistId1, title: "what to learn", filter: "all"},
    {id: todolistId2, title: "what to read", filter: "all"},
    {id: todolistId3, title: "what to refresh", filter: "all"},
  ]);

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter((tl) => {
      return tl.id !== todolistId;
    });
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasks({...tasksObj});
  };

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todolistId1]: [
      {id: v1(), title: "css", isDone: true},
      {id: v1(), title: "react2", isDone: true},
      {id: v1(), title: "redux", isDone: false},
      {id: v1(), title: "java", isDone: true},
    ],
    [todolistId2]: [
      {id: v1(), title: "milk", isDone: true},
      {id: v1(), title: "bred", isDone: true},
    ],
    [todolistId3]: [
      {id: v1(), title: "completed", isDone: true},
      {id: v1(), title: "jogging", isDone: true},
    ],
  });

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title: title,
    };
    setTodolists([todolist, ...todolists]);
    setTasks({...tasksObj, [todolist.id]: []});
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            TodoList
          </Typography>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid spacing={2} style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let tasksForToDoList = tasksObj[tl.id];

            if (tl.filter === "active") {
              tasksForToDoList = tasksForToDoList.filter(
                (t) => t.isDone === false
              );
            }
            if (tl.filter === "completed") {
              tasksForToDoList = tasksForToDoList.filter(
                (t) => t.isDone === true
              );
            }

            return (
              <Grid item>
                <Paper
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Todo
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForToDoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodoTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
