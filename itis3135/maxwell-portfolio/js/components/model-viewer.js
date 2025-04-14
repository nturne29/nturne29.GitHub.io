document.addEventListener('DOMContentLoaded', () => {
    // This would be replaced with actual 3D viewer implementation
    // For now, we'll use a placeholder with a link to Sketchfab
    const modelContainer = document.getElementById('carburetor-model');
    
    if (modelContainer) {
      modelContainer.innerHTML = `
        <div class="model-placeholder">
          <p>Interactive 3D model would display here</p>
          <a href="https://sketchfab.com" target="_blank" class="cta-orange">
            View on Sketchfab
          </a>
        </div>
      `;
    }
  });