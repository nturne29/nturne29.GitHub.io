document.addEventListener('DOMContentLoaded', () => {
  console.log('Header loaded'); // Debugging

  // Dropdown functionality
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      dropdownMenu.classList.toggle('active');
      dropdownToggle.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('active');
        dropdownToggle.classList.remove('active');
      }
    });
  }

  // Set active nav link based on current page
  function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach((link) => {
      const linkPage = link.getAttribute('href').split('/').pop();
      if (linkPage === currentPage) {
        link.classList.add('active');
        // Also activate parent dropdown if this is a dropdown item
        const dropdown = link.closest('.dropdown-menu');
        if (dropdown) {
          const parentToggle = dropdown.previousElementSibling;
          if (parentToggle && parentToggle.classList.contains('dropdown-toggle')) {
            parentToggle.classList.add('active');
          }
        }
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  setActiveNav();
});