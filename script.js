// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Function to show a specific section
    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`a[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Scroll to top of main content
        document.querySelector('.main-content').scrollTop = 0;
    }
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            showSection(targetId);
            
            // Update URL hash without scrolling
            history.pushState(null, null, targetId);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash || '#about';
        showSection(hash);
    });
    
    // Show initial section based on URL hash
    const initialHash = window.location.hash || '#about';
    showSection(initialHash);
    
    // Smooth scrolling for anchor links within sections
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]') && !e.target.classList.contains('nav-link')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Add loading animation for external links
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="http"]')) {
            const link = e.target;
            const originalText = link.textContent;
            link.textContent = 'Opening...';
            
            setTimeout(() => {
                link.textContent = originalText;
            }, 1000);
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.research-item, .project-item, .publication-item, .award-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Search functionality (optional enhancement)
    function addSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 1rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: inherit;
        `;
        
        // Add search input to sidebar
        const sidebar = document.querySelector('.sidebar');
        const nav = document.querySelector('.nav-menu');
        sidebar.insertBefore(searchInput, nav);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const allTextElements = document.querySelectorAll('.section p, .section h3, .section h4, .section li');
            
            allTextElements.forEach(el => {
                const text = el.textContent.toLowerCase();
                if (searchTerm && text.includes(searchTerm)) {
                    el.style.backgroundColor = '#fff3cd';
                } else {
                    el.style.backgroundColor = '';
                }
            });
        });
    }
    
    // Uncomment to enable search functionality
    // addSearchFunctionality();
    
    // Dark mode toggle (optional enhancement)
    function addDarkModeToggle() {
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '🌙';
        toggleButton.className = 'dark-mode-toggle';
        toggleButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            cursor: pointer;
            font-size: 1.2rem;
            z-index: 1001;
        `;
        
        document.body.appendChild(toggleButton);
        
        toggleButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
        
        // Add dark mode styles
        const darkModeStyles = document.createElement('style');
        darkModeStyles.textContent = `
            .dark-mode {
                background-color: #1a1a1a !important;
                color: #e0e0e0 !important;
            }
            .dark-mode .sidebar {
                background: #2d2d2d !important;
                border-color: #404040 !important;
            }
            .dark-mode .section h2,
            .dark-mode .section h3,
            .dark-mode .name {
                color: #f0f0f0 !important;
            }
            .dark-mode .research-item,
            .dark-mode .project-item,
            .dark-mode .publication-item,
            .dark-mode .education-item,
            .dark-mode .award-item,
            .dark-mode .contact-info,
            .dark-mode .contact-form {
                background: #2d2d2d !important;
                border-color: #404040 !important;
            }
        `;
        document.head.appendChild(darkModeStyles);
    }
    
    // Uncomment to enable dark mode toggle
    // addDarkModeToggle();
});

// Utility function to format dates
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Function to add new news items dynamically
function addNewsItem(date, content) {
    const newsList = document.querySelector('.news-list');
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
        <span class="news-date">${formatDate(date)}</span>
        <p>${content}</p>
    `;
    newsList.insertBefore(newsItem, newsList.firstChild);
}

// Function to update CV download count (if you want to track downloads)
function trackCVDownload() {
    const cvLink = document.querySelector('a[href="cv.pdf"]');
    if (cvLink) {
        cvLink.addEventListener('click', function() {
            // You could send this data to your analytics service
            console.log('CV downloaded at:', new Date().toISOString());
        });
    }
}

// Initialize CV download tracking
trackCVDownload();