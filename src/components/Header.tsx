import styles from "./Header.module.css"

import todoLogo from "../assets/todo-logo.svg"
import Switch from "./Switch"
import { useContext } from "react"
import { ThemeContext } from "../App"

export function Header() {
  const { theme } = useContext(ThemeContext) ?? { theme: "dark" }
  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <img src={todoLogo} alt="Logotipo do aplicativo 'TODO'" />
      <div className={styles.switchContainer}>
        <Switch />
      </div>
    </header>
  )
}
