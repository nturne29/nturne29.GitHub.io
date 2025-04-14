document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded'); // Debugging
  
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
  
    // Debugging: Check if elements are found
    console.log('Dropdown Toggle:', dropdownToggle);
    console.log('Dropdown Menu:', dropdownMenu);
  
    // Handle regular nav links (Home, About, Contact)
    navLinks.forEach(link => {
      if (!link.classList.contains('dropdown-toggle')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Navigating to:', link.href);
          window.location.href = link.href; // Simple navigation
          setActiveNav(link);
        });
      }
    });
  
    // Toggle dropdown on click
    if (dropdownToggle) {
      dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Projects clicked');
        const isActive = dropdownMenu.classList.toggle('active');
        dropdownToggle.setAttribute('aria-expanded', isActive);
      });
    } else {
      console.error('Dropdown toggle not found');
    }
  
    // Handle dropdown item clicks
    if (dropdownMenu) {
      document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Dropdown item clicked:', item.href);
          window.location.href = item.href; // Navigate to project page
          dropdownMenu.classList.remove('active');
          dropdownToggle.setAttribute('aria-expanded', 'false');
          setActiveNav(dropdownToggle);
        });
      });
  
      // Close dropdown if clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownMenu.classList.remove('active');
          dropdownToggle.setAttribute('aria-expanded', 'false');
        }
      });
    } else {
      console.error('Dropdown menu not found');
    }
  
    // Project card navigation (index.html only)
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const pageUrl = card.dataset.page;
        console.log('Project card clicked:', pageUrl);
        window.location.href = pageUrl;
        setActiveNav(dropdownToggle);
      });
    });
  
    // Set active navigation state
    function setActiveNav(activeLink) {
      navLinks.forEach(link => link.classList.remove('active'));
      activeLink.classList.add('active');
    }
  
    // Set initial active state based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      if (link.href.endsWith(currentPage)) {
        link.classList.add('active');
      }
    });
  });