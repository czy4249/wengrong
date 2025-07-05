const fileInput = document.getElementById('fileInput');
        const imageContainer = document.getElementById('imageContainer');

        // 文件选择处理逻辑
        fileInput.addEventListener('change', async (event) => {
            const files = Array.from(event.target.files);
            
            imageContainer.innerHTML = '';
            
            // 优化图片加载流程
            const imagePromises = files
                .filter(file => file.type.startsWith('image/'))
                .slice(0, 100) // 限制最多100张
                .map(file => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.className = 'image-item';
                        img.title = file.name;
                        
                        // 使用更高效的 Object URL
                        img.src = URL.createObjectURL(file);
                        
                        // 添加加载完成监听
                        img.onload = () => {
                            URL.revokeObjectURL(img.src); // 释放内存
                            resolve(img);
                        };
                        
                        // 错误处理
                        img.onerror = () => {
                            console.error(`无法加载图片: ${file.name}`);
                            resolve(null);
                        };
                    });
                });

            // 批量添加图片
            const images = (await Promise.all(imagePromises))
                .filter(img => img !== null);
            
            images.forEach(img => imageContainer.appendChild(img));
        });

        // 保持原有模态框交互逻辑
        document.addEventListener('DOMContentLoaded', () => {
            const modal = document.getElementById('imageModal');
            const closeBtn = document.querySelector('.close-btn');
            const expandedImg = document.getElementById('expandedImg');

            // 点击放大
            const originalImage = document.getElementById('original-image');
    const enlargedImageContainer = document.getElementById('enlarged-image-container');
    const enlargedImage = document.getElementById('enlarged-image');
    const closeButton = document.getElementById('close-button');

    // 点击原始图片时显示放大后的图片容器
    originalImage.addEventListener('click', function () {
      enlargedImageContainer.style.display = 'flex';
    });

    // 点击关闭按钮时隐藏放大后的图片容器
    closeButton.addEventListener('click', function () {
      enlargedImageContainer.style.display = 'none';
    });

    // 点击背景时也隐藏放大后的图片容器
    enlargedImageContainer.addEventListener('click', function (event) {
      if (event.target === this) {
        this.style.display = 'none';
      }
    });

            // 关闭逻辑保持不变
            const closeModal = () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            };
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => e.target === modal && closeModal());
            document.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());
        });
        imageContainer
.addEventListener('dragover', (e) => {
    e
.preventDefault();
    e
.currentTarget.style.backgroundColor = '#f0f0f0';
});

imageContainer
.addEventListener('drop', (e) => {
    e
.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    // 复用现有处理逻辑
    handleFiles(files);
});