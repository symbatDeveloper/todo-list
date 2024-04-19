import {Button, IconButton, TextField} from "@mui/material";
import React, {useState} from "react";
import {ChangeEvent, KeyboardEvent} from "react";
import AddIcon from "@mui/icons-material/Add";
type addItemFormType = {
  addItem: (title: string) => void;
};

function AddItemForm(props: addItemFormType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<null | string>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addNewTask();
    }
  };
  const addNewTask = () => {
    if (newTaskTitle === "" || newTaskTitle.trim() === "") {
      setError("Title is required");
      return;
    } else {
      props.addItem(newTaskTitle);
      setNewTaskTitle(newTaskTitle);
    }
    setNewTaskTitle("");
  };
  return (
    <div>
      <TextField
        value={newTaskTitle}
        variant="outlined"
        label="task"
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />

      <IconButton onClick={addNewTask} color={"primary"}>
        <AddIcon />
      </IconButton>
    </div>
  );
}
export default AddItemForm;
