document.addEventListener("DOMContentLoaded", () => {
  console.log("about.js loaded"); // Debugging

  // ===== TIMELINE FUNCTIONALITY =====
  const bubbles = document.querySelectorAll(".timeline-bubble");
  const events = document.querySelectorAll(".timeline-event");

  // Initialize with most recent job (2023) active
  bubbles[bubbles.length - 1].classList.add("active");
  events[events.length - 1].classList.add("active");

  // Handle bubble clicks
  bubbles.forEach((bubble) => {
    bubble.addEventListener("click", function () {
      const year = this.dataset.year;

      bubbles.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      events.forEach((event) => {
        event.classList.remove("active");
        if (event.dataset.year === year) {
          event.classList.add("active");
        }
      });
    });
  });

  // ===== LIGHTBOX GALLERY WITH CAPTIONS =====
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="close-lightbox" aria-label="Close image">×</button>
    <div class="lightbox-nav">
      <button class="lightbox-btn prev-btn" aria-label="Previous image"><</button>
      <button class="lightbox-btn next-btn" aria-label="Next image">></button>
    </div>
    <div class="lightbox-content">
      <img class="lightbox-img" src="" alt="">
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".close-lightbox");
  const prevBtn = lightbox.querySelector(".prev-btn");
  const nextBtn = lightbox.querySelector(".next-btn");

  let currentImageIndex = 0;
  const images = [];

  // Define updateLightboxImage before use
  function updateLightboxImage() {
    lightboxImg.src = images[currentImageIndex].src;
    lightboxImg.alt = images[currentImageIndex].alt;
    lightboxCaption.textContent = images[currentImageIndex].caption;
  }

  galleryItems.forEach((item, index) => {
    const img = item.querySelector("img");
    images.push({
      src: img.src,
      alt: img.alt,
      caption: img.alt
    });

    item.addEventListener("click", () => {
      currentImageIndex = index;
      updateLightboxImage();
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function navigate(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    updateLightboxImage();
  }

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(-1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(1);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    switch (e.key) {
      case "Escape":
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
        break;
      case "ArrowLeft":
        navigate(-1);
        break;
      case "ArrowRight":
        navigate(1);
        break;
    }
  });

  images[0].caption = "Working on a group Project";
  images[1].caption = "Teaching advanced mathematics classes at UNCC";
  images[2].caption = "Completing a project at UNCC Engineering Lab";
  images[3].caption = "Handling a snake during science demonstration at DPS";
});