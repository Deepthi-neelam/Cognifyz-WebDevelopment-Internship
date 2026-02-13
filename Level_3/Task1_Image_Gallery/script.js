
document.addEventListener('DOMContentLoaded', function() {
    
    // Get DOM elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    // Array of image data from gallery
    const imageData = Array.from(galleryItems).map((item, index) => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.overlay span').textContent;
        return {
            src: img.src,
            alt: img.alt,
            caption: caption
        };
    });
    
    // Open lightbox function
    function openLightbox(index) {
        currentIndex = index;
        const data = imageData[currentIndex];
        
        lightboxImage.src = data.src;
        lightboxImage.alt = data.alt;
        lightboxCaption.textContent = data.caption;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close lightbox function
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Previous image function
    function prevImage() {
        currentIndex = (currentIndex - 1 + imageData.length) % imageData.length;
        const data = imageData[currentIndex];
        
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = data.src;
            lightboxImage.alt = data.alt;
            lightboxCaption.textContent = data.caption;
            lightboxImage.style.opacity = '1';
        }, 150);
    }
    
    // Next image function
    function nextImage() {
        currentIndex = (currentIndex + 1) % imageData.length;
        const data = imageData[currentIndex];
        
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = data.src;
            lightboxImage.alt = data.alt;
            lightboxCaption.textContent = data.caption;
            lightboxImage.style.opacity = '1';
        }, 150);
    }
    
    // Add click event to each gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
        
        // Keyboard accessibility
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
        
        // Make items focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Enlarge image of ${imageData[index].caption}`);
    });
    
    // Event listeners for lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                prevImage(); // Swipe right
            } else {
                nextImage(); // Swipe left
            }
        }
    }
    
    // Preload images for smooth navigation
    function preloadImages() {
        imageData.forEach(data => {
            const img = new Image();
            img.src = data.src;
        });
    }
    
    preloadImages();
    
    // Add loading animation
    lightboxImage.style.transition = 'opacity 0.15s ease';
    
    console.log('Image Gallery initialized with', imageData.length, 'images');
    console.log('Intern: Neelam Deepthi | Cognifyz Technologies');
});