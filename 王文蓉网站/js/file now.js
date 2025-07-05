const fileInput = document.getElementById('fileInput');
        const imageContainer = document.getElementById('imageContainer');
        const previewBox = document.getElementById('previewBox');
        const previewImage = document.getElementById('previewImage');
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');

        // 文件选择处理
        fileInput.addEventListener('change', async (e) => {
            const files = Array.from(e.target.files);
            imageContainer.innerHTML = '';
            
            files.slice(0, 20).forEach(file => {
                if (!file.type.startsWith('image/')) return;
                
                const img = new Image();
                img.className = 'image-item';               
                img.src = URL.createObjectURL(file);
                img.dataset.name = file.name;
                img.dataset.size = (file.size / 1024).toFixed(1) + ' KB';
                
                // 正确做法：预览功能使用后释放 或 完全不手动释放
// 方法一：在预览框关闭时释放
/*let currentPreviewURL = null;

previewBox.addEventListener('click', () => {
    if(currentPreviewURL) URL.revokeObjectURL(currentPreviewURL);
    currentPreviewURL = null;
    previewBox.classList.remove('active');
});

// 方法二：改用Data URL（适合少量图片）
/*const reader = new FileReader();
reader.onload = (e) => {
    img.src = e.target.result;
    img.dataset.original = e.target.result; // 存储原始数据
};
reader.readAsDataURL(file);*/



                img.onerror = () => console.error('加载失败:', file.name);
                
                imageContainer.appendChild(img);
            });
        });

        // 点击图片展示到预览框
        imageContainer.addEventListener('click', (e) => {
            const target = e.target.closest('.image-item');
            if (!target) return;
            
            // 更新预览内容
            previewImage.src = target.src;
            fileName.textContent = target.dataset.name;
            fileSize.textContent = target.dataset.size;
            
            // 显示预览框
            previewBox.classList.add('active');
            
            // 自动3秒后关闭预览框
            /*clearTimeout(previewBox.timer);
            previewBox.timer = setTimeout(() => {
                previewBox.classList.remove('active');
            }, 3000);*/
        });

        // 手动关闭预览框
        /*previewBox.addEventListener('click', () => {
            previewBox.classList.remove('active');
            clearTimeout(previewBox.timer);
        });*/
        let isDragging = false;
        let startX, startY;
        let initialX, initialY;

        const dragHandle = document.querySelector('.drag-handle');
        
        // 鼠标事件
        dragHandle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);

        // 触摸事件
        dragHandle.addEventListener('touchstart', (e) => startDrag(e.touches[0]));
        document.addEventListener('touchmove', (e) => drag(e.touches[0]));
        document.addEventListener('touchend', endDrag);

        function startDrag(e) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = previewBox.offsetLeft;
            initialY = previewBox.offsetTop;
            previewBox.style.transition = 'none'; // 拖拽时禁用过渡动画
        }

        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            
            // 计算新位置
            let newX = initialX + dx;
            let newY = initialY + dy;

            // 边界约束
            const maxX = window.innerWidth - previewBox.offsetWidth;
            const maxY = window.innerHeight - previewBox.offsetHeight;
            
            newX = Math.min(Math.max(0, newX), maxX);
            newY = Math.min(Math.max(0, newY), maxY);

            // 应用新位置
            previewBox.style.left = `${newX}px`;
            previewBox.style.top = `${newY}px`;
        }

        function endDrag() {
            isDragging = false;
            previewBox.style.transition = 'transform 0.2s ease'; // 恢复动画
        }

        // 初始化位置（示例初始位置在右上角）
        previewBox.style.left = 'calc(100% - 340px)';
        previewBox.style.top = '20px';
        const closeBtn = document.getElementById('closePreview');

        // 点击关闭按钮事件
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            closePreview();
        });

        // 关闭预览函数
        function closePreview() {
            previewBox.classList.remove('active');
            document.body.style.overflow = 'auto';
            clearTimeout(previewBox.timer);
        }

        // 修改原有预览框点击事件（移除关闭逻辑）
        previewBox.addEventListener('click', (e) => {
            // 仅当点击背景区域时关闭（可选保留）
            if (e.target === previewBox) {
                closePreview();
            }
        });