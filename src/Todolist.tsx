import React, { ChangeEvent } from 'react';
import { FilterValueType } from './App';
import AddItemForm from './AddItemForm';

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
  filter: FilterValueType,
  removeTodoList: (todolistId: string) => void
}

function Todolist(props: PropsType) {
  const onAllClickHandler = () => { props.changeFilter("all", props.id) };
  const onActiveClickHandler = () => { props.changeFilter("active", props.id) };
  const onCompletedClickHandler = () => { props.changeFilter("completed", props.id) };
  const removeTodoList = () => {
    props.removeTodoList(props.id)
  }
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  return (
    <div>
      <h3>{props.title}
        <button onClick={removeTodoList}>x</button></h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {
          props.tasks.map((el) => {
            const onRemoveHandler = () => { props.removeTask(el.id, props.id) };
            const onChangeTaskHandler = (evt: ChangeEvent<HTMLInputElement>) => { props.changeStatus(el.id, evt.currentTarget.checked, props.id) }

            return (
              <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={el.isDone} onChange={onChangeTaskHandler} />
                <span>{el.title}</span>
                <button onClick={onRemoveHandler}>X</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>ALL</button>
        <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>ACTIVE</button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>COMPLETED</button>
      </div>
    </div >
  )
}

export default Todolist;