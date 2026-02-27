document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('galleryContainer');
    const header = document.getElementById('galleryHeader');
    const pageTitle = document.getElementById('pageTitle');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const currentCategory = urlParams.get('category');

    if (!currentCategory) {
        window.location.href = 'index.html';
        return;
    }

    const formattedTitle = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    pageTitle.textContent = `${formattedTitle} Artworks | Portfolio`;
    header.textContent = `${formattedTitle} Artworks`;

    try {
        const response = await fetch('data/gallery.json');
        const imagesData = await response.json();

        const filteredImages = imagesData.filter(item => item.category === currentCategory);

        if (filteredImages.length === 0) {
            container.innerHTML = `<p class="no-images">No artworks found in "${currentCategory}" category (yet).</p>`;
            return;
        }

        filteredImages.forEach(image => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'gallery-item';
            
            const imgElement = document.createElement('img');
            imgElement.src = image.filename;
            imgElement.alt = `${currentCategory} artwork`;
            imgElement.loading = 'lazy';
            
           
            if (image.aspectRatio) {
                imgElement.style.aspectRatio = image.aspectRatio;
            }
            
            itemDiv.addEventListener('click', () => openLightbox(image.filename));

            itemDiv.appendChild(imgElement);
            container.appendChild(itemDiv);
        });

    } catch (error) {
        console.error('Error loading gallery data:', error);
        container.innerHTML = '<p class="no-images">Error loading artworks.</p>';
    }

    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImage');
    const closeSpan = document.getElementById('closeModal');

    function openLightbox(filename) {
        modal.classList.add('visible');
        modalImg.src = filename;
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        modal.classList.remove('visible');
        document.body.style.overflow = 'auto';
        setTimeout(() => modalImg.src = '', 300); 
    }


    closeSpan.addEventListener('click', closeLightbox);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('visible')) closeLightbox();
    });
});