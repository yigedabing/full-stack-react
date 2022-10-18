import { useState } from 'react'

const Square = ({ item, onClick }) => {
  return (
    <button style={{ fontSize: '30px' }} onClick={() => onClick(item)}>
      {item.value}
    </button>
  )
}

export default function Index() {
  const [squares, setSquares] = useState([
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
    { id: 4, value: '' },
    { id: 5, value: '' },
    { id: 6, value: '' },
    { id: 7, value: '' },
    { id: 8, value: '' },
    { id: 9, value: '' },
  ])

  const [player, setPlayer] = useState('X')

  const handleClick = (item) => {
    const winner = calculateWinner(squares)
    if (winner) {
      return
    }

    const copy = squares.slice()
    const index = copy.findIndex((a) => a.id === item.id)
    copy.splice(index, 1, { ...item, value: player })
    setSquares(copy)

    setPlayer(player === 'X' ? 'Y' : 'X')
  }

  const backStep = () => {
    // todo
  }

  let status
  const winner = calculateWinner(squares)
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next Player: ${player === 'X' ? 'Y' : 'X'}`
  }

  return (
    <>
      <div>
        <section
          style={{
            width: '340px',
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '10px',
            justifyContent: 'space-between',
          }}
        >
          <span>{status}</span>
          <button onClick={() => backStep()}>返回上一步</button>
        </section>
        <section
          style={{
            gap: '20px',
            display: 'inline-grid',
            gridTemplateColumns: 'repeat(3, 100px)',
            gridTemplateRows: 'repeat(3, 100px)',
          }}
        >
          {squares.map((item) => (
            <Square
              item={item}
              onClick={(event) => handleClick(event)}
              key={item.id}
            />
          ))}
        </section>
      </div>
    </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    const aValue = squares[a].value
    const bValue = squares[b].value
    const cValue = squares[c].value

    if (aValue && aValue === bValue && aValue === cValue) {
      return aValue
    }
  }
  return null
}
