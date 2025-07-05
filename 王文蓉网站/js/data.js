function saveImageToLocalStorage() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64Image = e.target.result;
            localStorage.setItem('storedImage', base64Image);
            alert('图片已保存到本地存储');
        };
        reader.readAsDataURL(file);
    }
}

function displayImageFromLocalStorage() {
    const base64Image = localStorage.getItem('storedImage');
    if (base64Image) {
        const img = document.getElementById('displayImage');
        img.src = base64Image;
    }
}