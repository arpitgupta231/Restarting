import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [cards , setCards] = useState([]) 

  const fetchData = async ()=>{
    let a = await fetch("https://jsonplaceholder.typicode.com/posts")
    let data = await a.json()
    setCards(data)
    console.log(data)
  }
  
  
  useEffect(()=>{
    fetchData()
  },[])

  const Card = ({card})=>{
    return (<>
      <div className="card w-[272px] p-2 mx-1 my-2  border border-zinc-700 rounded-2xl">
        <div className="title m-2 font-bold text-white">{card.title}</div>
        <div className="desc mx-2 my-1.5 text-sm">{card.body}</div>
      </div>
    </>)
  }
  

  return (
    <>
      <div className="container w-full flex flex-wrap">
        {cards.map(card=>{
           return <Card card = {card}/>
        })}
      </div>
    </>
  )
}

export default App
