let colors=["green","red","blue","black","aqua","blueviolet"]

document.querySelectorAll(".box").forEach((e)=>{
    let random = Math.floor(Math.random()*colors.length)
    e.style.color = colors[random]
}
)
document.querySelectorAll(".box").forEach((d)=>{
    let random = Math.floor(Math.random()*colors.length)
    d.style.backgroundColor = colors[random]
}
)