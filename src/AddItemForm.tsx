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
        <input value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""} />
        <button onClick={addNewTask}>+</button>
        {error && <div className='error-message'>{error}</div>}
      </div>
    )
  }
  
export default AddItemForm;