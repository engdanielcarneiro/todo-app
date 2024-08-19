import styles from './App.module.css'

import './global.css'

import todoLogo from '../src/assets/todo-logo.svg'

import { Check, CheckCircle, Circle, PlusCircle, Trash } from '@phosphor-icons/react'
import { EmptyList } from './components/EmptyList'

import { v4 as uuidv4 } from 'uuid'

import { useState } from 'react'

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
    }
  ]);

  return (
    <>
      <header className={styles.header}>
        <img src={todoLogo} alt='Logotipo do aplicativo todo' />
      </header>
      <div>
        <main>
          <form>
            <div className={styles.addTaskContainer}>
              <input type="text" placeholder='Adicione uma nova tarefa' />
              <button>
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
                <div className={styles.countContainer}>{taskList.length == 0 ? '0' : '1 de 2'}</div>
              </div>
            </div>
            <div className={styles.taskListContainer}>
              {taskList.length == 0 ?
                <EmptyList />
                :
                <div className={styles.notEmptyContainer}>
                  <div className={styles.task}>
                    <div className={styles.checkboxContainer}>
                      <div className={`${styles.checkbox} ${styles["checkbox-checked"]}`}>
                        <Check color={'var(--gray-100)'} size={'0.69rem'} />
                      </div>
                    </div>
                    {taskList[0].content}
                    <button className={styles.removeButton}>
                      <Trash size={'1.05rem'} />
                    </button>
                  </div>
                  <div className={styles.task}>
                    <div className={styles.checkboxContainer}>
                      <div className={`${styles.checkbox} ${styles["checkbox-unchecked"]}`}>                   </div>
                    </div>
                    {taskList[0].content}
                    <button className={styles.removeButton}>
                      <Trash size={'1.05rem'} />
                    </button>
                  </div>

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
