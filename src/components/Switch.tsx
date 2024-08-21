import { useContext, useState } from "react"

import styles from "./Switch.module.css"
import { ThemeContext } from "../App"

const Switch = () => {
  const themeContext = useContext(ThemeContext)
  const [isOn, setIsOn] = useState(true)

  const toggleSwitch = () => {
    setIsOn(!isOn)
    themeContext?.setTheme(isOn ? "light" : "dark")
  }

  return (
    <div
      className={`${styles["switch"]} ${styles[isOn ? "on" : "off"]}`}
      onClick={toggleSwitch}
    >
      <div className={styles.toggle}></div>
    </div>
  )
}

export default Switch
