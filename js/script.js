// Basic script
console.log("Script loaded!");

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('active');
            // Close any open dropdowns when main toggle is clicked
            document.querySelectorAll('.nav-item.dropdown .dropdown-menu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        });
    }

    // Dropdown toggle for mobile
    const dropdownToggles = document.querySelectorAll('.nav-item.dropdown > .nav-link');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Only activate for mobile view (when navbarToggler is visible)
            if (navbarToggler && getComputedStyle(navbarToggler).display !== 'none') {
                e.preventDefault(); // Prevent navigation for the main link
                const dropdownMenu = toggle.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    dropdownMenu.classList.toggle('active');
                }
            }
        });
    });

    // Carousel Script
    let slideIndex = 0;
    let autoSlideTimeout; // Variable to store the timeout for auto-sliding

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("carousel-slide");
        let dots = document.getElementsByClassName("dot");
        
        if (!slides.length || !dots.length) return; // Exit if no carousel elements on the current page

        // Clear existing auto-slide timer if we are manually changing slide
        if (n !== undefined && autoSlideTimeout) {
            clearTimeout(autoSlideTimeout);
        }
        
        if (n !== undefined) { // If called by prev/next or dots (manual interaction)
             slideIndex = n;
        } else { // If called by auto-slide timer or initial load without n
            slideIndex++; // Move to next slide
        }

        if (slideIndex >= slides.length) {slideIndex = 0} // Loop to first
        if (slideIndex < 0) {slideIndex = slides.length - 1} // Loop to last (for prev button)
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove("active"); // Ensure active class is removed
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active-dot", "");
        }
        
        slides[slideIndex].style.display = "block";
        slides[slideIndex].classList.add("active"); // Add active class for CSS transitions/animations
        dots[slideIndex].className += " active-dot";

        // Restart auto-slide timer
        autoSlideTimeout = setTimeout(showSlides, 5000); // Change image every 5 seconds
    }

    // Make functions globally accessible for inline HTML onlick attributes
    window.plusSlides = function(n_offset) { // n_offset is -1 or 1
      showSlides(slideIndex + n_offset);
    }

    window.currentSlide = function(n_idx) { // n_idx is 1-based index from HTML
      showSlides(n_idx - 1); // Convert to 0-based index
    }
    
    // Initialize carousel only if carousel elements exist on the page
    if (document.querySelector(".carousel-container")) {
        showSlides(slideIndex); // Show first slide (index 0) and start auto-slide
    }

    // Active class for dropdown items
    const currentPath = window.location.pathname.split("/").pop();
    const dropdownItems = document.querySelectorAll('.navbar-nav .dropdown-menu .dropdown-item');
    dropdownItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (itemPath === currentPath) {
            item.classList.add('active-dropdown-item'); // Add a specific class for sub-item
            // Optionally, ensure parent dropdown main link is also active
            let parentDropdownLink = item.closest('.nav-item.dropdown')?.querySelector('.nav-link');
            if (parentDropdownLink) {
                parentDropdownLink.classList.add('active'); // Ensure main Yachts link is active
            }
        }
    });
});
