import styles from './App.module.css'

import './global.css'

import todoLogo from '../src/assets/todo-logo.svg'

import { PlusCircle } from '@phosphor-icons/react'
import { EmptyList } from './components/EmptyList'

function App() {

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
                <div className={styles.countContainer}>0</div>
              </div>
            </div>
            <div className={styles.taskListContainer}>
              <EmptyList />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
