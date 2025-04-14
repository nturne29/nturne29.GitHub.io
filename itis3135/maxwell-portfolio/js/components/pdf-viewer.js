document.addEventListener('DOMContentLoaded', () => {
    const pdfButtons = document.querySelectorAll('.pdf-viewer');
    
    pdfButtons.forEach(button => {
      button.addEventListener('click', () => {
        const pdfUrl = button.dataset.pdf;
        if (pdfUrl) {
          // Create PDF container if it doesn't exist
          let viewer = button.nextElementSibling;
          if (!viewer || !viewer.classList.contains('pdf-container')) {
            viewer = document.createElement('div');
            viewer.className = 'pdf-container';
            button.parentNode.insertBefore(viewer, button.nextSibling);
          }
          
          // Embed PDF
          viewer.innerHTML = `
            <embed src="${pdfUrl}" type="application/pdf" width="100%" height="100%">
            <p class="pdf-fallback">Unable to display PDF. <a href="${pdfUrl}" download>Download instead</a></p>
          `;
        }
      });
    });
  });