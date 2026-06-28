let currentsong = new Audio()
let songs
let History = []
let currFolder

async function getSongs(folder) {
    currFolder = folder
    let a = await fetch(`http://127.0.0.1:3000/${folder}`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            let fileName = element.href.split("/").pop();
            if (fileName.includes("%5C")) {
                fileName = fileName.split("%5C").pop();
            }
            songs.push(fileName.split(".mp3")[0]);
        }
    }

    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songul.innerHTML = ""
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
        e.addEventListener("click", element => {
            playSong(e.querySelector(".info").firstElementChild.innerHTML)
        })

    })
}

function showHistory() {
    const historyul = document.querySelector(".history .songlist ul");
    historyul.innerHTML = ""
    for (let index = 0; index < History.length; index++) {
        let song = History[index];
        const song_title = song.track

        historyul.innerHTML += ` <li >
                            <div class="playbox">
                                <img src="svg/music.svg" alt="">
                                <img class="filter" src="svg/play.svg" alt="">
                            </div>
                            <div class="info">
                                <div class="title">${song.track}</div>
                                <div class="artist" >Artist</div>
                            </div>
                        </li>`
    }

    Array.from(historyul.getElementsByTagName("li")).forEach((e)=>{
        e.addEventListener("click",(element)=>{
            let track = e.querySelector(".title").innerHTML
            playSong(track)
        })
    })
}

const playSong = (track) => {
    let audio = new Audio(`http://127.0.0.1:3000/${currFolder}/${track}.mp3`)
    currentsong.src = `http://127.0.0.1:3000/${currFolder}/${track}.mp3`
    currentsong.play()



    play.src = "/svg/pause.svg"
    document.querySelector(".song-info").firstElementChild.innerHTML = track
    document.querySelector(".songtime").firstElementChild.innerHTML = "00:00"
    document.querySelector(".songtime").lastElementChild.innerHTML = "03:00"
    const existingIndex = History.findIndex(h => h.track === track && h.folder === currFolder)
    if (existingIndex !== -1) History.splice(existingIndex, 1)
    History.push({ track, folder: currFolder })
    showHistory()
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

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function playRandomSong() {
    if (songs.length === 0) return;
    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];

    playSong(randomSong.replaceAll("%5C", " ").replaceAll("%20", " "))

}

function playPreviousSong() {
    if (History.length < 2) { alert("No previous songs"); return }

    History.pop() // remove current song
    const previous = History[History.length - 1]
    History.pop() // remove previous (playSong will re-add it)
    currFolder = previous.folder
    playSong(previous.track)
}

async function displayAllAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/Songs/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response

    let anchors = div.getElementsByTagName("a")
    let albumsContainer = document.querySelectorAll(".cardContainer")[1]
    let array = Array.from(anchors)
    for (let index = 2; index < array.length; index++) {
        let e = array[index];
        if (e.href.includes("Songs")) {
            let folder = e.href.split("%5C")[2].replaceAll("/", "")
            let a = await fetch(`http://127.0.0.1:3000/Songs/${folder}/info.json`)
            let response = await a.json()
            albumsContainer.innerHTML += `<div data-folder="${folder}"  class="album-card">
                        <div class="face">
                            <img src="Songs/${folder}/cover.jpg" alt="" id="face">
                            <div class="play2">
                                <img src="svg/play.svg" alt="" >
                            </div>
                        </div>
                        <h4>${response.title}</h4>
                    </div>`
        }
    }


    Array.from(document.getElementsByClassName("album-card")).forEach((e) => {
        e.addEventListener("click", async item => {
            await getSongs(`Songs/${item.currentTarget.dataset.folder}`)
            playRandomSong()
        })
    })
}



async function main() {
    await getSongs("all-songs")
    displayAllAlbums()

    play.addEventListener("click", togglePlay)

    document.body.addEventListener("keydown", e => {
        if (e.key === " ") {
            e.preventDefault()
            togglePlay()
        }
    })

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").firstElementChild.innerHTML = formatTime(currentsong.currentTime)
        document.querySelector(".songtime").lastElementChild.innerHTML = formatTime(currentsong.duration)
        if (!currentsong.duration) return;

        const percent = (currentsong.currentTime / currentsong.duration) * 100;

        document.querySelector(".circle").style.left = percent-1 + "%";

        document.querySelector(".seekbar").style.background =
            `linear-gradient(to right,
            #ffffff 0%,
            #dfdfdf ${percent}%,
            hsl(0, 0%, 32%) ${percent}%,
            hsl(0, 0%, 32%) 100%)`

        if((currentsong.currentTime % currentsong.duration) == 0){
            playRandomSong()
        }
    })

    document.querySelector(".seekbar").addEventListener("click", e => {
        document.querySelector(".circle").style.left = (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%"
        currentsong.currentTime = (e.offsetX / e.target.getBoundingClientRect().width) * currentsong.duration
    })

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".sidebar").style.left = 0
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".sidebar").style.left = -100 + "%"
    })

    previous.addEventListener("click", playPreviousSong)

    next.addEventListener("click", playRandomSong)

    if (window.innerWidth > 600) {
        document.querySelector(".volume").addEventListener("click", () => {
            lyrics.style.width = "0"
            queue.style.width = "0"
            document.querySelector(".volume-bar").style.width = "50px"
            document.querySelector(".volume-bar").style.opacity = "1"


            document.querySelector(".volume").addEventListener("mouseleave", () => {
                lyrics.style.width = "24px"
                queue.style.width = "24px"
                document.querySelector(".volume-bar").style.width = "0"
                document.querySelector(".volume-bar").style.opacity = "0"
            })

        })
    }

    document.querySelector(".volume-bar").addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100
    })

    if (window.innerWidth < 600) {
        const volume = document.querySelector(".volume");
        const nextBtn = document.getElementById("next")

        volume.firstElementChild.replaceWith(nextBtn);

    }

    Array.from(document.getElementsByClassName("card")).forEach((e) => {
        e.addEventListener("click", async item => {
            await getSongs(`Songs/${item.currentTarget.dataset.folder}`)
            playRandomSong()
        })
    })

    queue.addEventListener("click", () => {
        document.querySelector(".history").style.right = "2%"
    })

    document.querySelector(".history").querySelector(".close").addEventListener("click", () => {
        document.querySelector(".history").style.right = "-110%"
    })

}

main()  