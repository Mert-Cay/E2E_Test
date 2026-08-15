import Login from '../src/components/Login';

import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login/>
    </>
  )
}

export default App
