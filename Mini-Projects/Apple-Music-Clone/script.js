let currentsong = new Audio()

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/Songs/Narcissism")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("Narcissism%5C")[1].split(".")[0])
        }
    }
    return songs
}

const playSong = (track) => {
    let audio = new Audio(`http://127.0.0.1:3000/Songs/Narcissism/${track}.mp3`)
    currentsong.src = `http://127.0.0.1:3000/Songs/Narcissism/${track}.mp3`
    currentsong.play()
    play.src = "/svg/pause.svg"
    document.querySelector("")
}

const togglePlay = () => {
    if (currentsong.paused) {
        currentsong.play()
        play.src = "/svg/pause.svg"
    } else {
        currentsong.pause()
        play.src = "/svg/play.svg"
    }
}

async function main() {
    let songs = await getSongs()

    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]

    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + ` <li >
                            <div class="playbox">
                                <img src="svg/music.svg" alt="">
                                <img class="filter" src="svg/play.svg" alt="">
                            </div>
                            <div class="info">
                                <div class="title">${song.replaceAll("%5C", " ").replaceAll("%20", " ")}</div>
                                <div class="artist" >Artist</div>
                            </div>
                        </li>`
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.querySelector(".playbox").addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playSong(e.querySelector(".info").firstElementChild.innerHTML)
        })

    })

    play.addEventListener("click", togglePlay)

    document.body.addEventListener("keydown", e => {
        if (e.key === " ") {
            e.preventDefault()
            togglePlay()
        }
    })

}

main()  