import styles from "./App.module.css"

import "./global.css"


import { PlusCircle } from "@phosphor-icons/react"
import { EmptyList } from "./components/EmptyList"

import { v4 as uuidv4 } from "uuid"

import {
  ChangeEvent,
  createContext,
  FormEvent,
  useEffect,
  useState,
} from "react"
import { Header } from "./components/Header"
import { Task } from "./components/Task"

interface Task {
  id: string
  isCompleted: boolean
  content: string
}

interface ThemeContextType {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

function App() {
  const [theme, setTheme] = useState("dark")
  const [taskList, setTaskList] = useState<Task[]>([])
  const [newTaskContent, setNewTaskContent] = useState("")
  const [completedTasksCount, setCompletedTasksCount] = useState(0)

  function handleNewTextContentChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskContent(event.target.value)
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    const newTask: Task = {
      id: uuidv4(),
      isCompleted: false,
      content: newTaskContent,
    }

    createNewTask(newTask)
  }

  function createNewTask(newTask: Task) {
    setTaskList([...taskList, newTask])
    setNewTaskContent("")
  }

  function handleDeleteTask(taskToDelete: Task) {
    const updatedTaskList = taskList.filter(
      (task) => task.id !== taskToDelete.id
    )
    setTaskList(updatedTaskList)
  }

  function handleToggleCompleteTask(taskToToggle: Task) {
    const updatedTaskItems = taskList.map((task) => {
      if (task.id === taskToToggle.id) {
        return { ...task, isCompleted: !task.isCompleted }
      }
      return task
    })

    setTaskList(updatedTaskItems)
  }

  useEffect(() => {
    setCompletedTasksCount(
      taskList.filter((task) => task.isCompleted == true).length
    )
  }, [taskList])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${styles.page} ${styles[theme]}`}>
        <Header />
        <div>
          <main>
            <form onSubmit={handleCreateTask}>
              <div className={styles.addTaskContainer}>
                <input
                  type="text"
                  placeholder="Adicione uma nova tarefa"
                  value={newTaskContent}
                  onChange={handleNewTextContentChange}
                  required
                  className={styles[theme]}
                />
                <button type="submit">
                  Criar
                  <PlusCircle size={"1rem"} weight="bold" />
                </button>
              </div>
            </form>
            <div className={styles.mainContentContainer}>
              <div className={styles.taskStatusContainer}>
                <div
                  className={styles.statusItem}
                  style={{ color: "var(--blue)" }}
                >
                  Tarefas criadas
                  <div className={styles.countContainer}>{taskList.length}</div>
                </div>
                <div
                  className={styles.statusItem}
                  style={{ color: "var(--purple)" }}
                >
                  Concluídas
                  <div className={styles.countContainer}>
                    {taskList.length == 0
                      ? "0"
                      : `${completedTasksCount} de ${taskList.length}`}
                  </div>
                </div>
              </div>
              <div className={`${styles.taskListContainer} ${styles[theme]}`}>
                {taskList.length == 0 ? (
                  <EmptyList />
                ) : (
                  <div className={styles.notEmptyContainer}>
                    {taskList.map((task) => {
                      return (
                        <Task
                          onToggleCompleteTask={handleToggleCompleteTask}
                          onDeleteTask={handleDeleteTask}
                          key={task.id}
                          task={task}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
