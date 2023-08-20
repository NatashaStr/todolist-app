import React, { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';

export type FilterValueType = "all" | "completed" | "active"
type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}
type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolist1 = v1();
  let todolist2 = v1();

  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todolist1, title: "What to learn", filter: "all" },
    { id: todolist2, title: "What to buy", filter: "all" },
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolist1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false }
    ],
    [todolist2]: [
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Milk", isDone: true }
    ]
  });

  function removeTask(id: string, todolistId: string) {
    let resultTasks = tasks[todolistId].filter(el => el.id !== id);
    tasks[todolistId] = resultTasks;
    setTasks({...tasks});
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks[todolistId]];
    tasks[todolistId] = newTasks
    setTasks({...tasks});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let task = tasks[todolistId].find((el) => el.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks({...tasks});
  }

  function changeTitle(taskId: string, newTitle: string, todolistId: string) {
    let task = tasks[todolistId].find((el) => el.id === taskId)
    if (task) {
      task.title = newTitle
    }
    setTasks({...tasks});
  }

  function changeFilter(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find((el) => el.id === todolistId)
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  let removeTodoList = (todolistId: string) => {
    let filteredTodolist = todolists.filter((el) => el.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasks[todolistId];
    setTasks({...tasks});

  }

  let changeTodolistTitle = (todolistId: string, newTitle: string) => {
    let todolist = todolists.find((el) => el.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists])
    }
  }

  function addTodoList(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      title: title,
      filter: "all"
    }
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasks,
      [todolist.id]: []
    })
  }

  return (
    <div className="App">
      <AddItemForm  addItem={addTodoList}/>
      {
        todolists.map((el) => {
          let tasksForTodolist = tasks[el.id];
          if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter(el => el.isDone === true)
          }
          if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter(el => el.isDone === false)
          }
          return (
            <Todolist
              key={el.id}
              id={el.id}
              title={el.title}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeStatus={changeStatus}
              filter={el.filter}
              removeTodoList={removeTodoList}
              changeTodolistTitle={changeTodolistTitle}
              changeTitle={changeTitle} />
          )
        })
      }
    </div>
  );
}

export default App;
