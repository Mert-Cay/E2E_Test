import Login from '../src/components/Login';
import Success from '../src/components/Success';
import { useState } from 'react'
import { Routes , Route } from 'react-router-dom';

function App() {
 
  return (
    <>
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/success" element={<Success />} />
    </Routes>
    </>
  )
}

export default App
