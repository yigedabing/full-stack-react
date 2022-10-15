import { useState } from 'react'
import React from 'react'

const History = (props) => {
  const { allClicks = [] } = props

  if (!allClicks.length) {
    return <div>the app is used by pressing the buttons</div>
  }
  return <div>button press history: {allClicks.join(' ')}</div>
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Counter = () => {
  console.log('render Counter.')

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div className='counter-wrapper'>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default Counter
