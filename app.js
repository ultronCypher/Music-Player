const play=document.getElementById("play");
const music=document.querySelector("audio");
const img=document.querySelector("img");

const artist=document.getElementById("artist");
const title=document.getElementById("title");
const prev=document.getElementById("prev");
const next=document.getElementById("next");

const progress_div=document.getElementById("progress-div");
let progress=document.getElementById("progress");
let songduration=document.getElementById("duration");
let current_time=document.getElementById("current-time");

const songs=[
    {
        name:"weeknd",
        title:"The Reminder",
        artist:"The Weeknd"
    },
    {
        name:"asta",
        title:"Black Catcher",
        artist:"Vickeblanka"
    },
    {
        name:"juice",
        title:"Bandit",
        artist:"JUICE_WRLD"
    }
]

let isPlaying=false;
const playMusic=()=>{
    isPlaying=true;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    img.classList.add("anime");
};
const pauseMusic=()=>{
    isPlaying=false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove("anime");
};
play.addEventListener("click",()=>{
    isPlaying?pauseMusic():playMusic();
});

const loadSong=(songs)=>{
    title.textContent=songs.title;
    artist.textContent=songs.artist;
    music.src="songs/"+songs.title+".mp3";
    img.src="images/"+songs.name+".jpg";
};

songIndex=0
const nextSong=()=>{
    songIndex=(songIndex+1)%songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}
const prevSong=()=>{
    songIndex=(songIndex-1+songs.length)%songs.length;
    loadSong(songs[songIndex]); 
    playMusic();
}

music.addEventListener("timeupdate",(event)=>{
    const {currentTime,duration}=event.srcElement;
    let progressTime=(currentTime/duration)*100;
    progress.style.width=`${progressTime}%`;

    let minutes=Math.floor(duration/60);
    let seconds=Math.floor(duration%60);
    let totalDuration=`${minutes}:${seconds}`;
    if(duration){
        songduration.textContent=`${totalDuration}`;
    } 
    let currentminutes=Math.floor(currentTime/60);
    let currentseconds=Math.floor(currentTime%60);
    if(currentseconds<10){
        currentseconds=`0${currentseconds}`;
    } 
    let currenttime=`${currentminutes}:${currentseconds}`;
    current_time.textContent=`${currenttime}`;
});
progress_div.addEventListener("click",(event)=>{
    const {duration}=music;
    let moveProgress=(event.offsetX/event.srcElement.clientWidth)*duration;
    music.currentTime=moveProgress;
});
music.addEventListener("ended",nextSong);
next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);
