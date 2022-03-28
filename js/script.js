let imgTrack = document.querySelector('.imgTrack img')
let nameTrack = document.querySelector('.textName')
let nameArtistTrack = document.querySelector('.textArtist')
let barProgressTrack = document.querySelector('.bar')
let barProgressArea = document.querySelector('.barSlide')
let btnRepeat = document.getElementById('repeatTrack');
let btnPrevPlay = document.getElementById('prevTrack');
let btnNextPlay = document.getElementById('nextTrack');
let btnPlayPause = document.getElementById('playPause');
let btnListTrack = document.getElementById('listTrack');
let menuList =  document.querySelector('.listTrackMusic');
let fecharMenu = document.querySelector('.fecharMenu');
let recent_volume = document.querySelector('#volumeTrack')

let track = document.querySelector('audio');

let indexList = Math.floor((Math.random() * arrayFaixas.length) + 1);

window.addEventListener('load', ()=>{
    loadingList(indexList);
    playingMusic();

})

function loadingList(numIndex){
    imgTrack.src = `assets/img/${arrayFaixas[numIndex].img}.jpg`
    track.src = `assets/music/${arrayFaixas[numIndex].src}.mp3`
    nameTrack.innerHTML = arrayFaixas[numIndex].name;
    nameArtistTrack.innerHTML = arrayFaixas[numIndex].artista;
}

function playPause(){
    if(track.paused){
        track.play();
        btnPlayPause.textContent = 'pause'
    } else {
        track.pause();
        btnPlayPause.textContent = 'play_circle_filled'
    }
}

function prevTrack(){
    indexList--;
    if(indexList < 0){
        indexList = 6;
    }
    loadingList(indexList);
    playingMusic();
    track.play();
    btnPlayPause.textContent = 'pause';
};

function nextTrack(){
    indexList++;
    if(indexList > 6){
        indexList = 0;
    }
    loadingList(indexList);
    playingMusic();
    track.play();
    btnPlayPause.textContent = 'pause';
};



track.addEventListener('timeupdate', (e)=>{
    const currentTime = e.target.currentTime; 
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    barProgressTrack.style.width = `${progressWidth}%`;

    barProgressTrack.style.width = `${progressWidth}%`;
    let currentTimeTrack = document.querySelector('.currentTime')
    let durationTrack = document.querySelector('.duration')
    track.addEventListener('loadeddata', ()=>{
        let trackAudioDuration = track.duration;
        let totalMin = Math.floor(trackAudioDuration / 60);
        let totalSec = Math.floor(trackAudioDuration % 60);
        if(totalSec < 10){
            totalSec = '0' + totalSec;
        }
        durationTrack.innerHTML = `${totalMin}:${totalSec}`;
    });
    let currentMin = Math.floor(track.currentTime / 60);
    let currentSec = Math.floor(track.currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }
    currentTimeTrack.innerText = `${currentMin}:${currentSec}`;
})

barProgressArea.addEventListener('click', (e)=>{
    let widthProgress = barProgressArea.clientWidth;
    let offsetWidth = e.offsetX;
    let durationAudio = track.duration;

    track.currentTime = (offsetWidth / widthProgress) * durationAudio;
    track.play();
    btnPlayPause.innerHTML = 'pause'
});


const ulTag = document.querySelector("ul");
for (let g = 0; g < arrayFaixas.length; g++) {
  let liTag = `<li li-index="${g}">
  <div class="textInfo">
    <p class="textTrackMusic">${arrayFaixas[g].name}</p>
    <p class="textArtistMusic">${arrayFaixas[g].artista}</p>
  </div>
  <span class="material-icons listTrack2" onclick="listTrack()">play_arrow</span>
  <div class="textPlay">
    <span id="${arrayFaixas[g].src}"></span>
    <audio id="test" class="${arrayFaixas[g].src}" src="assets/music/${arrayFaixas[g].src}.mp3"></audio>
  </div>

</li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); 

  let liAudioDuartionTag = ulTag.querySelector(`#${arrayFaixas[g].src}`);
  let liAudioTag = ulTag.querySelector(`.${arrayFaixas[g].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ 
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; 
  });
}
function playingMusic(){
    const allLiTag = ulTag.querySelectorAll("li");
    
    for (let j = 0; j < allLiTag.length; j++) {
      let audioTag = allLiTag[j].querySelector(".listTrack2");
      
      if(allLiTag[j].classList.contains("playing")){
        allLiTag[j].classList.remove("playing");
        audioTag.innerText = "play_arrow";

      }
      if(allLiTag[j].getAttribute("li-index") == indexList){
        allLiTag[j].classList.add("playing");
        audioTag.innerText = "pause";
      }
  
      allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
  }

function clicked(element){
    let getIndexLi = element.getAttribute('li-index');
    indexList = getIndexLi;
    loadingList(indexList);
    playPause();
    playingMusic();
};

function repeatTrack(){
    let repeatSwitch = btnRepeat.textContent;
        switch(repeatSwitch){
            case'repeat':
            btnRepeat.textContent = 'repeat_one';
            break;
            case'repeat_one':
            btnRepeat.textContent = 'shuffle';
            break;
            case'shuffle':
            btnRepeat.textContent = 'repeat';
            break;
        }
};


track.addEventListener('ended', ()=>{
    let repeatSwitch = btnRepeat.textContent;
    switch(repeatSwitch){
        case'repeat':
            nextTrack();
            break;
        case'repeat_one':
            track.currentTime = 0;
            track.play();
            break;
        case'shuffle':
            let aleatorioIndex = Math.floor((Math.random()* arrayFaixas.length) + 1);
            do{
                aleatorioIndex = Math.floor((Math.random()* arrayFaixas.length) + 1);
            }while (indexList == aleatorioIndex); 
            indexList = aleatorioIndex;
            loadingList(indexList);
            playingMusic();
            track.play();
            break;
    }
});

function listTrack(){
    menuList.style = 
    'opacity: 1;' +
    'display: block;' +
    'bottom: 0;' +
    'pointer-events: auto;'
    fecharMenu.style = 
    'z-index: 1;'
}

function closeList() {
    menuList.style = 
    'bottom: -55%;' 
    fecharMenu.style =
    'z-index: -1;'
}

fecharMenu.addEventListener('click', fecharList)

function fecharList() {
    closeList();
}


function colorBackground(){
    let barraColor = document.querySelector('.contCores');
    barraColor.style =
        'right: 0;'
}

function closeColor() {
    let barraColor = document.querySelector('.contCores');
    barraColor.style =
        'right: -100%;'
    
}

function btnBackground(){
    let containerBackground = document.querySelector('.container');
    containerBackground.style = 
    'background-image: linear-gradient(180deg, #5c3f64 0, #4a2f5e 25%, #321f59 50%, #0a1254 75%, #000550 100%);'
    menuList.style = 
    'background-image: radial-gradient(circle at 50% -20.71%, #de9c2c 0, #e5922a 8.33%, #ea852b 16.67%, #ee772d 25%, #f16731 33.33%, #f35436 41.67%, #f23c3c 50%, #f01843 58.33%, #ed004c 66.67%, #e90057 75%, #e30064 83.33%, #db0071 91.67%, #d10080 100%);';
};
function btnBackgroundOrig(){
    let containerBackground = document.querySelector('.container');
    containerBackground.style = 
    'background-image: radial-gradient(circle at 50% -20.71%, #de9c2c 0, #e5922a 8.33%, #ea852b 16.67%, #ee772d 25%, #f16731 33.33%, #f35436 41.67%, #f23c3c 50%, #f01843 58.33%, #ed004c 66.67%, #e90057 75%, #e30064 83.33%, #db0071 91.67%, #d10080 100%);';
    menuList.style = 
    'background-image: radial-gradient(circle at 50% -20.71%, #de9c2c 0, #e5922a 8.33%, #ea852b 16.67%, #ee772d 25%, #f16731 33.33%, #f35436 41.67%, #f23c3c 50%, #f01843 58.33%, #ed004c 66.67%, #e90057 75%, #e30064 83.33%, #db0071 91.67%, #d10080 100%);';
};


function volumeChange(){
    track.volume = recent_volume.value / 100;
}

function muteTrack(){

    if(track.muted){
        track.muted = false
        btnOn.innerHTML ='volume_up'
        btnOn.style.color = '#eee'
    }else {
        track.muted = true
        btnOn.innerHTML ='volume_off'
        btnOn.style.color = 'orange'
    }
}

let recentVolume = document.querySelector('#volumeTrack')
let btnOn = document.querySelector('#on')
let btnOff = document.querySelector('#off')


function abrirVolume(){
    abrirVolume2();
}
function abrirVolume2(){
    recentVolume.style = 
    'opacity: 1;' +
    'display: block;'
}
function fecharVolume(){
    recentVolume.style = 
    'opacity: 0;'
}

function fecharTrack(){
    fecharVolume();
    
}