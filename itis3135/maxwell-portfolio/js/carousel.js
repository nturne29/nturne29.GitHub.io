document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carousel = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!carousel || items.length === 0) return; // Exit if no carousel found
    
    let currentIndex = 0;
    
    // Create navigation dots
    function createDots() {
      items.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }
    
    // Update carousel position and active dot
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update dots
      document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    // Go to specific slide
    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
      updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
      currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    }
    
    // Initialize
    createDots();
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Optional: Auto-advance every 5 seconds
    let autoSlide = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on hover
    carousel.parentElement.addEventListener('mouseenter', () => {
      clearInterval(autoSlide);
    });
    
    carousel.parentElement.addEventListener('mouseleave', () => {
      autoSlide = setInterval(nextSlide, 5000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });
  });