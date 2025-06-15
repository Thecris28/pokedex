'use client'

import { useState } from "react"

export default function CartCounter() {
    const [count, setCount] = useState(10)

  const decrement = () => {
    setCount(count - 1)
  }

  return (
    <>
     <span className="text-9xl">{count} </span>
      <div className="flex space-x-4">
        <button className="p-2 w-[100px] bg-gray-900 text-white rounded-lg relative before:absolute before:-inset-1 before:block before:bg-gray-500 overflow-hidden before:translate-y-[-100%] before:duration-300 hover:before:translate-0"
        onClick={() => setCount(count + 1)}><span className="relative z-10">+1</span></button>
        <button className="p-2 w-[100px] bg-gray-900 text-white rounded-lg relative before:absolute before:-inset-1 before:block before:bg-gray-500 overflow-hidden before:translate-y-[-100%] before:duration-300 hover:before:translate-0"
        onClick={decrement}><span className="relative z-10">-1</span></button>
      </div>
    </>
  )
}
