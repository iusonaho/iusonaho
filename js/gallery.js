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
    pageTitle.textContent = `${formattedTitle} Drawings`;
    header.textContent = `${formattedTitle} Drawings`;

    let index = 1;
    let hasMoreImages = true;

    while (hasMoreImages) {
        const imageUrl = `assets/${currentCategory}/${index}.png`;
        
        try {
            const response = await fetch(imageUrl, { method: 'HEAD' });
            
            if (response.ok) {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = `${currentCategory} drawing ${index}`;
                imgElement.className = 'gallery-item';
                imgElement.loading = 'lazy';
                
                container.appendChild(imgElement);
                index++;
            } else {
                hasMoreImages = false;
            }
        } catch (error) {
            hasMoreImages = false;
        }
    }

    if (index === 1) {
        container.innerHTML = "<p>No drawings for this category (yet).</p>";
    }
});