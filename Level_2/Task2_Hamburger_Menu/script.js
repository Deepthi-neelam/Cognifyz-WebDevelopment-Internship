// Additional JavaScript for smooth scrolling and active state
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target section
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close hamburger menu on mobile after click
                    const navToggle = document.getElementById('nav-toggle');
                    if (navToggle && window.innerWidth < 1024) {
                        navToggle.checked = false;
                    }
                    
                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveLink() {
        let scrollPosition = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Set initial active state
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const hamburgerLabel = document.querySelector('.nav-toggle-label');
        
        if (window.innerWidth < 1024 && navToggle.checked) {
            if (!navMenu.contains(e.target) && !hamburgerLabel.contains(e.target)) {
                navToggle.checked = false;
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const navToggle = document.getElementById('nav-toggle');
        if (window.innerWidth >= 1024) {
            navToggle.checked = false; // Ensure menu is closed on desktop
        }
    });
});