// js/eagle-timeline.js
document.addEventListener('DOMContentLoaded', function () {
  // ===== TIMELINE FUNCTIONALITY =====
  const bubbles = document.querySelectorAll('.timeline-bubble');
  const events = document.querySelectorAll('.timeline-event');

  // Initialize with completion phase active
  if (bubbles.length > 0 && events.length > 0) {
    bubbles[bubbles.length - 1].classList.add('active');
    events[events.length - 1].classList.add('active');
  }

  // Handle bubble clicks
  bubbles.forEach((bubble) => {
    bubble.addEventListener('click', function () {
      const phase = this.dataset.phase;

      // Update active bubble
      bubbles.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');

      // Update visible content
      events.forEach((event) => {
        event.classList.remove('active');
        if (event.dataset.phase === phase) {
          event.classList.add('active');
        }
      });
    });
  });

  // ===== LIGHTBOX GALLERY =====
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;

  // Create lightbox element
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="close-lightbox" aria-label="Close image">×</button>
    <div class="lightbox-nav">
      <button class="lightbox-btn prev-btn" aria-label="Previous image">❮</button>
      <button class="lightbox-btn next-btn" aria-label="Next image">❯</button>
    </div>
    <div class="lightbox-content">
      <img class="lightbox-img" src="" alt="">
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  // Lightbox elements
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.close-lightbox');
  const prevBtn = lightbox.querySelector('.prev-btn');
  const nextBtn = lightbox.querySelector('.next-btn');

  // Track current image
  let currentImageIndex = 0;
  const images = [];

  // Update lightbox content (moved up to avoid reference error)
  function updateLightboxImage() {
    lightboxImg.src = images[currentImageIndex].src;
    lightboxCaption.textContent = images[currentImageIndex].caption;
  }

  // Process gallery items and move captions
  galleryItems.forEach((item, index) => {
    // Create a container for image and caption
    const container = document.createElement('div');
    container.className = 'gallery-item-container';

    // Move existing caption or create new one
    let caption = item.nextElementSibling;
    if (!caption || !caption.classList.contains('gallery-caption')) {
      caption = document.createElement('div');
      caption.className = 'gallery-caption';
      caption.textContent = item.alt || '';
    }

    // Wrap image and caption
    item.alt = '';
    container.appendChild(item.cloneNode(true));
    container.appendChild(caption);

    // Replace original item with container
    item.replaceWith(container);

    // Store image data for lightbox
    images.push({
      src: item.src,
      caption: caption.textContent // Removed trailing comma
    });

    // Add click handler to container
    container.addEventListener('click', () => {
      currentImageIndex = index;
      updateLightboxImage();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Navigation functions
  function navigate(direction) {
    currentImageIndex += direction;

    // Wrap around if at ends
    if (currentImageIndex < 0) {
      currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }

    updateLightboxImage();
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Event listeners
  closeBtn.addEventListener('click', closeLightbox);

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigate(-1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigate(1);
  });

  // Close when clicking outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigate(-1);
        break;
      case 'ArrowRight':
        navigate(1);
        break;
    }
  });

  // Prevent lightbox from closing when clicking on navigation buttons
  [prevBtn, nextBtn, lightboxImg, lightboxCaption].forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
});