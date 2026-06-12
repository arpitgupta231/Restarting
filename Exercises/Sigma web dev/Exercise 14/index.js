const randomdelay = () => {
    return new Promise((resolve, reject) => {
        let rand = 1 + 6 * Math.random()
        setTimeout(() => {
            resolve()
        }, rand * 1000);
    })
}



const addItem = async (item) => {
    await randomdelay();
    let div = document.createElement("div")
    div.innerHTML = item
    document.body.append(div)
    div.setAttribute("style", "margin-top: 10px")
}



let main = async () => {
    setInterval(() => {
        let last = document.body.getElementsByTagName("div")
        last = last[last.length-1]
        if (last.innerHTML.endsWith("...")){
            last.innerHTML = last.innerHTML.slice(0, last.innerHTML.length - 3)
        }
        else last.innerHTML = last.innerHTML + "."
    }, 800)

    text = [">Initialized Hacking", ">Reading Your files", ">Password files Detected", ">Sending all files and passwords", ">Cleaning Up"]

    for (const item of text) {
        await addItem(item)
    };
}

main()


