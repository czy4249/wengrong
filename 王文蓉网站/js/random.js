document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById("randomMoveImage");

    function getRandomPosition() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;

        const randomX = Math.floor(Math.random() * (windowWidth - imgWidth));
        /*const randomY = Math.floor(Math.random() * (windowHeight - imgHeight));*/

        return { x: randomX };
    }

    function moveImage() {
        const { x } = getRandomPosition();
        img.style.left = `${x}px`;
        /*img.style.top = `${y}px`;*/
    }

    setInterval(moveImage, 5000); // 每2秒移动一次
});