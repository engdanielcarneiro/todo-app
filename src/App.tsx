import styles from './App.module.css'

import './global.css'

import todoLogo from '../src/assets/todo-logo.svg'

import { PlusCircle } from '@phosphor-icons/react'
import { EmptyList } from './components/EmptyList'

import { v4 as uuidv4 } from 'uuid'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Task } from './components/Task'

interface Task {
  id: string
  isCompleted: boolean,
  content: string
}

function App() {

  const [taskList, setTaskList] = useState<Task[]>([
    {
      id: uuidv4(),
      isCompleted: false,
      content: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'
    },
    {
      id: uuidv4(),
      isCompleted: true,
      content: '2 Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'
    },
    {
      id: uuidv4(),
      isCompleted: false,
      content: '3 Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'
    }
  ])
  const [newTaskContent, setNewTaskContent] = useState('')
  const [completedTasksCount, setCompletedTasksCount] = useState(0)

  function handleNewTextContentChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskContent(event.target.value)
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    const newTask: Task = {
      id: uuidv4(),
      isCompleted: false,
      content: newTaskContent
    }

    createNewTask(newTask);
  }

  function createNewTask(newTask: Task) {
    setTaskList([...taskList, newTask])
    setNewTaskContent('');
  }

  function handleDeleteTask(taskToDelete: Task) {
    const updatedTaskList = taskList.filter((task) => task.id !== taskToDelete.id)
    setTaskList(updatedTaskList)
  }

  useEffect(() => {
    setCompletedTasksCount(taskList.filter((task) => task.isCompleted == true).length);
  }, [taskList])

  return (
    <>
      <header className={styles.header}>
        <img src={todoLogo} alt='Logotipo do aplicativo todo' />
      </header>
      <div>
        <main>
          <form onSubmit={handleCreateTask}>
            <div className={styles.addTaskContainer}>
              <input type="text" placeholder='Adicione uma nova tarefa' value={newTaskContent} onChange={handleNewTextContentChange} />
              <button type='submit'>
                Criar
                <PlusCircle size={'1rem'} weight='bold' />
              </button>
            </div>
          </form>
          <div className={styles.mainContentContainer}>
            <div className={styles.taskStatusContainer}>
              <div className={styles.statusItem} style={{ color: 'var(--blue)' }}>
                Tarefas criadas
                <div className={styles.countContainer}>0</div>
              </div>
              <div className={styles.statusItem} style={{ color: 'var(--purple)' }}>
                Concluídas
                <div className={styles.countContainer}>{taskList.length == 0 ? '0' : `${completedTasksCount} de ${taskList.length}`}</div>
              </div>
            </div>
            <div className={styles.taskListContainer}>
              {taskList.length == 0 ?
                <EmptyList />
                :
                <div className={styles.notEmptyContainer}>
                  {taskList.map((task) => {
                    return (
                      <Task onDeleteTask={handleDeleteTask} key={task.id} task={task} />)
                  })}
                </div>
              }
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App

