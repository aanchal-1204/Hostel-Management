import React, { useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="h-screen flex items-center justify-center bg-blue-500">
      <h1 className="text-white text-4xl font-bold">
        Tailwind is working 🚀
      </h1>
    </div>
    </>
  )
}

export default App
