const imageList = document.querySelector('.image-list');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentTranslateX = 0;
    const step = 0.5; // 移动步长，可根据需要调整
    const imageWidth = 438;
    let animationFrameId;

    function scrollContinuously() {
      currentTranslateX -= step;
      if (Math.abs(currentTranslateX) >= imageWidth) {
        currentTranslateX = 0;
        const firstImage = imageList.firstElementChild;
        imageList.appendChild(firstImage);
      }
      imageList.style.transform = `translateX(${currentTranslateX}px)`;
      animationFrameId = requestAnimationFrame(scrollContinuously);
    }

    function stopScroll() {
      cancelAnimationFrame(animationFrameId);
    }

    prevButton.addEventListener('click', () => {
      stopScroll();
      currentTranslateX += imageWidth;
      const lastImage = imageList.lastElementChild;
      imageList.insertBefore(lastImage, imageList.firstElementChild);
      imageList.style.transform = `translateX(${currentTranslateX}px)`;
      scrollContinuously();
    });

    nextButton.addEventListener('click', () => {
      stopScroll();
      currentTranslateX -= imageWidth;
      const firstImage = imageList.firstElementChild;
      imageList.appendChild(firstImage);
      imageList.style.transform = `translateX(${currentTranslateX}px)`;
      scrollContinuously();
    });

    scrollContinuously();