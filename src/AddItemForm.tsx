import { LibraryAdd } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';

type AddItemFormPropsType = {
  addItem: (title: string) => void,
}

function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(evt.currentTarget.value);
  const onKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (evt.key === "Enter") {
      props.addItem(newTaskTitle);
      setNewTaskTitle("");
    }
  }
  const addNewTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("")
    } else {
      setError('Title is required')
    }
  }

  return (
    <div>
      <TextField value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        variant="standard" label={"Type value"} helperText={error} />
      <IconButton onClick={addNewTask} color={'primary'}>
        <LibraryAdd />
      </IconButton>
    </div>
  )
}

export default AddItemForm;