import styles from './EmptyList.module.css'

import clipboard from '../../src/assets/Clipboard.svg'

export function EmptyList() {
    return (
        <div className={styles.emptyTaskList}>
            <img src={clipboard} alt="" />
            <div className={styles.emptyTaskText}>
                <div style={{ fontWeight: 'bold' }}>Você ainda não tem tarefas cadastradas</div>
                <div>Crie tarefas e organize seus itens a fazer</div>
            </div>
        </div>
    )
}