import { Check, Trash } from '@phosphor-icons/react'
import styles from './Task.module.css'
import { useContext } from "react"
import { ThemeContext } from "../App"

interface Task {
  id: string
  isCompleted: boolean
  content: string
}

interface TaskProps {
  task: Task
  onDeleteTask: (task: Task) => void
  onToggleCompleteTask: (task: Task) => void
}

export function Task({ task, onDeleteTask, onToggleCompleteTask }: TaskProps) {
  const { theme } = useContext(ThemeContext) ?? { theme: "dark" }
  const checkboxCheckedClassname = task.isCompleted
    ? styles["checkbox-checked"]
    : styles["checkbox-unchecked"]

  return (
    <>
      <div className={`${styles.task} ${styles[theme]}`}>
        <span className={styles.flexWrapper}>
          <div className={styles.checkboxContainer}>
            <div
              onClick={() => onToggleCompleteTask(task)}
              className={`${styles.checkbox} ${checkboxCheckedClassname}`}
            >
              {task.isCompleted ? (
                <Check color={"var(--gray-100)"} size={"0.69rem"} />
              ) : null}
            </div>
          </div>
          <p className={task.isCompleted ? styles.crossed : undefined}>
            {task.content}
          </p>
        </span>
        <button
          className={`${styles.removeButton} ${styles[theme]}`}
          onClick={() => onDeleteTask(task)}
        >
          <Trash size={"1.05rem"} />
        </button>
      </div>
    </>
  )
}