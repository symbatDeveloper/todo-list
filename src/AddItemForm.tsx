import React, { useState } from "react";
import { ChangeEvent, KeyboardEvent } from "react";

type addItemFormType = {
  addItem: (title: string, todolistId: string) => void;
  id: string;
};

function AddItemForm(props: addItemFormType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<null | string>(null);

  const addNewTask = () => {
    if (newTaskTitle === "" || newTaskTitle.trim() === "") {
      setError("Title is required");
      return;
    } else {
      props.addItem(newTaskTitle, props.id);
      setNewTaskTitle(newTaskTitle);
    }
    setNewTaskTitle("");
  };

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addNewTask();
    }
  };
  return (
    <div>
      <input
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addNewTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
export default AddItemForm;
