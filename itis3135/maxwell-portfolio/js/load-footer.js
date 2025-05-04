// load-footer.js
document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `
            <div class="container">
                <p>© 2025 Maxwell Peterson. All rights reserved.</p>
                <p style="font-family: 'Inter', sans-serif; font-size: 1rem; color: var(--white); margin: 0.5rem 0;">
                    Page built by <a href="../../turnertechsolutions.co.html" style="color: var(--orange); text-decoration: none; transition: color 0.3s;">Turner Tech Solutions</a>, 
                    <a href="https://www.freecodecamp.org/certification/NTurner/javascript-algorithms-and-data-structures-v8" style="color: var(--orange); text-decoration: none; transition: color 0.3s;">Certified in JS</a> © 2025
                </p>
            </div>
        `;
    }
});