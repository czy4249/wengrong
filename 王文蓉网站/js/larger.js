const bgImage = document.getElementById('bg-image');
        bgImage.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const bgX = (x / rect.width) * 100;
            const bgY = (y / rect.height) * 100;
            this.style.backgroundPosition = `${bgX}% ${bgY}%`;
        });
        bgImage.addEventListener('mouseleave', function () {
            this.style.backgroundPosition = 'center';
        });