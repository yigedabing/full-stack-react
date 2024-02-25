import { useState } from 'react'
import styles from './Login.module.css'
import { Button } from 'antd'

export default function Login() {
  let [count, setCount] = useState(0)
  console.log('render')
  const handleClick = () => {
    setCount(++count)
  }

  return (
    <div className={styles.login}>
      <div>{count}</div>
      <Button type="primary" onClick={handleClick}>
        add
      </Button>
    </div>
  )
}
