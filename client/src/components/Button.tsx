import React from 'react'

interface Props {
  handleCount: {
    n: number
    setCount: React.Dispatch<React.SetStateAction<number>>
  }
}

export const Button: React.FC<Props> = ({ handleCount: { n, setCount } }) => {
  return <button onClick={() => setCount(p => p + n)}>Increment by {n}</button>
}
