import React, { ChangeEvent } from 'react';
import { FilterValueType } from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { Button, Checkbox } from '@mui/material';

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
}

type PropsType = {
  id: string,
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string, todolistId: string) => void,
  changeFilter: (value: FilterValueType, todolistId: string) => void,
  addTask: (title: string, todolistId: string) => void,
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
  changeTitle: (taskId: string, newTitle: string, todolistId: string) => void,
  filter: FilterValueType,
  removeTodoList: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

function Todolist(props: PropsType) {
  const onAllClickHandler = () => { props.changeFilter("all", props.id) };
  const onActiveClickHandler = () => { props.changeFilter("active", props.id) };
  const onCompletedClickHandler = () => { props.changeFilter("completed", props.id) };
  const removeTodoList = () => {
    props.removeTodoList(props.id)
  }
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton aria-label="delete" size="small" onClick={removeTodoList}>
          <Delete fontSize="inherit" />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul style = { {listStyleType: "none"}}>
        {
          props.tasks.map((el) => {
            const onRemoveHandler = () => { props.removeTask(el.id, props.id) };
            const onChangeTaskHandler = (evt: ChangeEvent<HTMLInputElement>) => { props.changeStatus(el.id, evt.currentTarget.checked, props.id) }
            const onChangeTitleHandler = (newValue: string) => { props.changeTitle(el.id, newValue, props.id) }

            return (
              <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                <Checkbox checked={el.isDone} onChange={onChangeTaskHandler} />
                <EditableSpan title={el.title} onChange={onChangeTitleHandler} />
                <IconButton aria-label="delete" size="small" onClick={onRemoveHandler}>
                  <Delete fontSize="inherit" />
                </IconButton>
              </li>
            )
          })
        }
      </ul>
      <div>
        <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>ALL</Button>
        <Button color={'secondary'} variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>ACTIVE</Button>
        <Button color={'success'} variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHandler}>COMPLETED</Button>
      </div>
    </div >
  )
}

export default Todolist;