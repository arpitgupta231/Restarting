import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between py-3 md:py-4 bg-zinc-950 items-center sticky top-0 px-5 '>
      <h1 className='font-extrabold text-3xl md:ml-12'>ToDoS</h1>
        <ul className='flex gap-7 md:mr-12 font-bold text-violet-600'>
            <li className='hover:text-white transition-all duration-500 ease-in-out'>Home</li>
            <li className='hover:text-white transition-all duration-500 ease-in-out'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
