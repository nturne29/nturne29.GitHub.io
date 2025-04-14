document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filters button');
    const galleryItems = document.querySelectorAll('.prints-grid img');
  
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Remove active class from all buttons
        filters.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked button
        filter.classList.add('active');
        
        const filterValue = filter.dataset.filter;
        
        // Filter gallery items
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.dataset.category === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });