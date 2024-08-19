import { Check, Trash } from '@phosphor-icons/react'
import styles from './Task.module.css'

interface Task {
    id: string
    isCompleted: boolean,
    content: string
}

interface TaskProps {
    task: Task,
    onDeleteTask: (task: Task) => void
}

export function Task({ task, onDeleteTask }: TaskProps) {

    const checkboxCheckedClassname = task.isCompleted ? styles['checkbox-checked'] : styles['checkbox-unchecked'];

    return (
        <>
            <div className={styles.task}>
                <span className={styles.flexWrapper}>
                    <div className={styles.checkboxContainer}>
                        <div className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
                            {task.isCompleted ? <Check color={'var(--gray-100)'} size={'0.69rem'} /> : null}
                        </div>
                    </div>
                    <p className={task.isCompleted ? styles.crossed : undefined}>
                        {task.content}
                    </p>
                </span>
                <button className={styles.removeButton} onClick={() => onDeleteTask(task)}>
                    <Trash size={'1.05rem'} />
                </button>
            </div>
        </>
    )
}