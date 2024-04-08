import React, { ChangeEvent, useState } from "react";

type EditableSpanType = {
  title: string;
  onChange: (newTitle: string) => void;
};
export function EditableSpan(props: EditableSpanType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");

  const clickHandler = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const viewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <input value={title} onChange={inputHandler} onBlur={viewMode} autoFocus />
  ) : (
    <span onClick={clickHandler}>{props.title}</span>
  );
}
