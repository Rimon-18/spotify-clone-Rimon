




let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}






async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${currFolder}/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            let decoded = decodeURIComponent(element.href)
            // split by BOTH forward and back slashes
            let songName = decoded.split(/[/\\]/).pop()
            songs.push(songName)
        }
    }

     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
     songUL.innerHTML = " "
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>  ${song}</div>
                                <div></div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="libraryPlay.svg" alt="play">
                            </div>  </li>`;
    }
    
    //attach an eventlistner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            //this trim is used to remove the spaces from the starting
      
        })


    })

}
const playmusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" +  track)
    // currentSong.src = `${currFolder}` + track
    currentSong.src = `http://127.0.0.1:3000/${currFolder}/` + encodeURIComponent(track)
    if (!pause) {

        currentSong.play()
        play.src = "pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00/00:00"



}
async function displayAllAlbums() {
     let a = await fetch(`http://127.0.0.1:3000/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response
  let anchors=   div.getElementsByTagName("a")
  let cardContainer = document.querySelector(".cardContainer")
 Array.from(anchors).forEach(async(e) => {

    
    if (e.href.includes("/songs")) {
        let folder = e.href.split("/").slice(-2)[0]
        //get the meta data of the folder
         let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
    let response = await a.json();
    console.log(response);
    cardContainer.innerHTML = cardContainer.innerHTML+`<div  data-folder="playlist1" class="card ">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60">

                                <!-- Green Filled Circle -->
                                <circle cx="12" cy="12" r="10" fill="#22c55e" />

                                <!-- Converted Your Path into Solid Black Play Icon -->
                                <path d="M9 8 L16 12 L9 16 Z" fill="black" />

                            </svg>
                        </div>
                        <img src="/songs/${folder}/cover.png" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>

                    </div>`
    
        
    } }
 )
 // Re-attach card listeners after dynamic load
setTimeout(() => {
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            if (window.innerWidth <= 768) {
                document.querySelector(".left").style.left = "0"
            }
        })
    })
}, 1000)
    
}



async function main() {



    // await getSongs("songs/playlist3")
    // console.log(songs);
    // playmusic(songs[0], true)

// display all folder on the page

displayAllAlbums()


    //eventlistenr to play the song by click on the image
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }


    })

    //listener for time update
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"


    })
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        //getbounding says the overall area of the clicked surface
        //by the above formula we can seek the seek bar anywhere else
        currentSong.currentTime = ((currentSong.duration) * percent) / 100

    })
    //add event listner for the hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //add event listner for the close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })
    // add event listner to interact with previous and next

    previous.addEventListener("click", () => {
        let currentName = decodeURIComponent(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentName);
        console.log(currentSong);


        if (index - 1 >= 0) {
            playmusic(songs[index - 1]);
        }
    });

    next.addEventListener("click", () => {
        let currentName = decodeURIComponent(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentName);
        console.log(currentSong);


        if (index + 1 < songs.length) {
            playmusic(songs[index + 1]);
        }
    });

    //Load the playlist by eventlistner
    // Array.from(document.getElementsByClassName("card")).forEach(e => {
    //     e.addEventListener("click", async item => {

    //         songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)

    //     })
    // })

    Array.from(document.getElementsByClassName("card")).forEach(e => {
    e.addEventListener("click", async item => {
        songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)

        // Auto-open hamburger on mobile when card is clicked
        if (window.innerWidth <= 768) {
            document.querySelector(".left").style.left = "0"
            playmusic(songs[0])
        }
    })
})
}

main()