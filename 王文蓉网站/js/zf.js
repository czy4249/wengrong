const playMusicText = document.getElementById('playMusicText');
        const musicPlayer = document.getElementById('musicPlayer');

        playMusicText.addEventListener('click', function () {
            // 播放音乐
            musicPlayer.play();
        });