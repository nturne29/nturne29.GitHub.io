// js/load-nav.js
document.addEventListener('DOMContentLoaded', function() {
    // Remove existing headers
    const oldHeaders = document.querySelectorAll('header');
    oldHeaders.forEach(function(header) {
        header.remove();
    });

    // Function definitions
    function setupNavLinks() {
        document.querySelectorAll('[data-nav-link]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = link.getAttribute('data-nav-link');
                const isProjectPage = window.location.pathname.includes('/projects/');
                const basePath = isProjectPage ? '../' : './';
                window.location.href = basePath + target;
            });
        });
    }

    function setActiveNav() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('[data-nav-link]');
        
        links.forEach(function(link) {
            const linkPath = link.getAttribute('data-nav-link');
            let isActive = false;
            
            // Handle index page
            if ((currentPath.endsWith('/') || currentPath.endsWith('/index.html')) && 
                linkPath === 'index.html') {
                isActive = true;
            }
            // Handle project pages
            else if (currentPath.includes('/projects/')) {
                isActive = currentPath.endsWith('/' + linkPath) || 
                          link.classList.contains('dropdown-toggle');
            }
            // Regular pages
            else {
                isActive = currentPath.endsWith('/' + linkPath);
            }
            
            link.classList.toggle('active', isActive);
        });
    }

    function initNavigation() {
        // Dropdown functionality
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
                dropdownToggle.setAttribute('aria-expanded', !isExpanded);
                dropdownMenu.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.dropdown')) {
                    dropdownMenu.classList.remove('active');
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Set up navigation links
        setupNavLinks();
        
        // Set active states
        setActiveNav();
    }

    function createFallbackNav() {
        const fallbackNav = `
            <header>
                <div class="container">
                    <h1><a href="index.html">PORTFOLIO <span>MAXWELL PETERSON</span></a></h1>
                    <nav>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
        document.body.insertAdjacentHTML('afterbegin', fallbackNav);
        
        // Add click handlers to fallback links
        document.querySelectorAll('header a').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = link.getAttribute('href');
            });
        });
    }

    // Determine correct path to nav.html
    const isProjectPage = window.location.pathname.includes('/projects/');
    const navPath = isProjectPage ? '../js/nav.html' : 'js/nav.html';
    
    // Load navigation
    fetch(navPath)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Navigation failed to load: ' + response.status);
            }
            return response.text();
        })
        .then(function(html) {
            document.body.insertAdjacentHTML('afterbegin', html);
            initNavigation();
        })
        .catch(function(error) {
            console.error('Error loading navigation:', error);
            createFallbackNav();
        });
});