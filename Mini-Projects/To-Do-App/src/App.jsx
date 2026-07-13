import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Navbar from './components/Navbar'
import { CiEdit} from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [showFinished, setshowFinished] = useState(true)

  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = async () => {
    await setTodos([...todos, {
      id: uuidv4(), todo, isCompleted: false
    }])
    setTodo("")
    savetoLS()
  }

  const handleDelete = (e, id) => {
    let a = confirm("Are you sure you want to delete this task")
    if (a) {
      let index = todos.findIndex(item => {
        return item.id === id
      })
      let newTodos = todos.filter(item => {
        return item.id !== id
      })
      setTodos(newTodos)
    }
    savetoLS()
    return
  }

  const handleEdit = (e, id) => {
    const t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    savetoLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheck = (e) => {
    const id = e.target.name
    const newTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodos(newTodos)
    savetoLS()
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  let toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  return (
    < >

      <Navbar />
      <div className="container w-[95%] md:w-2xl bg-zinc-950 my-4 mx-auto p-5 shadow-xl shadow-violet-950 rounded-2xl flex flex-col items-center min-h-[80vh]">
        <div className="addtodo w-[97%] bg-zinc-900 p-3 my-6 space-y-2 rounded-2xl ">
          <h2 className='text-xl font-bold ml-1'>Add To Do</h2>
          <input type="text" className='bg-zinc-300 p-2 w-full rounded-xl text-black focus:outline-violet-700 focus:outline-4' value={todo} onChange={handleChange} />
          <button className='w-fit bg-violet-800 px-3 py-1.5 font-semibold rounded-2xl cursor-pointer hover:bg-violet-600 transition-all duration-200 ease-in' disabled={todo.length <= 3} onClick={handleAdd}>Add</button>
        </div>
        <div className="todos w-[97%] bg-zinc-900 p-3 my-2 space-y-2 rounded-2xl pb-4.5 min-h-[20vh]">
          <div className="head flex items-center gap-1 ">
            <div className=' text-xl sm:text-2xl font-bold w-fit mr-4 sm:mr-3.5'> Your Todos</div>
            <input type="checkbox" name="Show Finished" checked={showFinished} className='mt-1.5' id="" onChange={toggleFinished} /><h5 className={showFinished ? "text-violet-700 font-semibold mt-0.5" : 'font-semibold mt-0.5'}>Show Finished</h5>
          </div>
          {todos.length === 0 && <div className='flex justify-center text-violet-700' >No Todos to display</div>}
          {todos.map(item => {


            return (showFinished || !item.isCompleted) &&
              <div key={item.id} className="todo flex justify-between items-center  py-2 ">
                <div className="info flex gap-2 items-center">
                  <input type="checkbox" checked={item.isCompleted} onChange={handleCheck} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through w-[80%]" : "w-[80%]"} >{item.todo}
                  </div>
                </div>
                <div className="buttons space-x-2 flex h-full">
                  <button className='w-fit bg-violet-800 px-3 py-1.5 font-semibold rounded-2xl cursor-pointer hover:bg-violet-600 transition-all duration-200 ease-in' onClick={(e) => { handleEdit(e, item.id) }}><CiEdit /></button>
                  <button className='w-fit bg-violet-800 px-3 py-1.5 font-semibold rounded-2xl cursor-pointer hover:bg-violet-600 transition-all duration-200 ease-in' onClick={(e) => { handleDelete(e, item.id) }}><MdDelete /></button>
                </div>
              </div>


          })}
        </div>
      </div>
    </>
  )
}

export default App
