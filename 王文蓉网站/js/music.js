const audio = document.getElementById('myAudio');    
const playPauseButton = document.getElementById('randomMoveImage');
    playPauseButton.addEventListener('click', function () {      
if (audio.paused) {        
audio.play();        
playPauseButton.textContent = '暂停';
      } else {        
audio.pause();        
playPauseButton.textContent = '播放';
      }
    });