// ========================================
//   MAIN JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    loadProfileData();
    initGalleryFilter();
    initLightbox();
    initContactForm();
    initScrollAnimations();
});

// ========================================
//   NAVIGATION
// ========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
}

// ========================================
//   LOAD PROFILE DATA FROM JSON
// ========================================
async function loadProfileData() {
    try {
        const response = await fetch('data/profile.json');
        const data = await response.json();
        
        // Load achievements
        loadAchievements(data.achievements);
        
        // Load businesses
        loadBusinesses(data.businesses);
        
        // Load gallery
        loadGallery(data.gallery);
        
        // Load testimonials
        loadTestimonials(data.testimonials);
        
        // Load philosophy values
        loadPhilosophyValues(data.philosophy.values);
        
        // Load social media links
        loadSocialMedia(data.socialMedia);
        
        // Load contact info
        loadContactInfo(data.contact);
        
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

function loadAchievements(achievements) {
    const grid = document.getElementById('achievements-grid');
    grid.innerHTML = achievements.map(achievement => `
        <div class="achievement-card">
            <div class="achievement-icon">${achievement.icon}</div>
            <span class="achievement-year">${achievement.year}</span>
            <h3 class="achievement-title">${achievement.title}</h3>
            <p class="achievement-description">${achievement.description}</p>
        </div>
    `).join('');
}

function loadBusinesses(businesses) {
    const grid = document.getElementById('businesses-grid');
    grid.innerHTML = businesses.map(business => `
        <div class="business-card">
            <img src="${business.image}" alt="${business.name}" class="business-image">
            <div class="business-content">
                <h3 class="business-name">${business.name}</h3>
                <p class="business-description">${business.description}</p>
                <div class="business-services">
                    ${business.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
                </div>
                <a href="${business.link}" class="business-link">
                    Ver Más <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');
}

function loadGallery(gallery) {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = gallery.map((item, index) => `
        <div class="gallery-item" data-category="${item.category}" data-index="${index}">
            <img src="${item.image}" alt="${item.title}" class="gallery-img">
            <div class="gallery-overlay">
                <h3 class="gallery-title">${item.title}</h3>
                <p class="gallery-category">${item.category}</p>
            </div>
        </div>
    `).join('');
}

function loadTestimonials(testimonials) {
    const slider = document.getElementById('testimonials-slider');
    slider.innerHTML = `
        <div class="testimonials-track">
            ${testimonials.map(testimonial => `
                <div class="testimonial-card">
                    <div class="testimonial-rating">
                        ${'[★'.repeat(5)]}
                    </div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <div class="testimonial-author">
                        <h4 class="author-name">${testimonial.name}</h4>
                        <p class="author-role">${testimonial.role}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function loadPhilosophyValues(values) {
    const grid = document.getElementById('values-grid');
    grid.innerHTML = values.map(value => `
        <div class="value-card">
            <div class="value-icon">${value.icon}</div>
            <h3 class="value-title">${value.title}</h3>
            <p class="value-description">${value.description}</p>
        </div>
    `).join('');
}

function loadSocialMedia(socialMedia) {
    const container = document.getElementById('social-links');
    const footerContainer = document.getElementById('social-links-footer');
    
    const platforms = {
        instagram: 'fab fa-instagram',
        facebook: 'fab fa-facebook-f',
        twitter: 'fab fa-twitter',
        tiktok: 'fab fa-tiktok',
        youtube: 'fab fa-youtube',
        linkedin: 'fab fa-linkedin-in'
    };
    
    const linksHTML = Object.entries(socialMedia).map(([platform, url]) => `
        <a href="${url}" target="_blank" class="social-link-footer" data-platform="${platform}">
            <i class="${platforms[platform]}"></i>
        </a>
    `).join('');
    
    container.innerHTML = linksHTML;
    footerContainer.innerHTML = linksHTML;
}

function loadContactInfo(contact) {
    document.getElementById('booking-email').textContent = contact.bookingEmail;
    document.getElementById('business-email').textContent = contact.businessEmail;
    document.getElementById('press-email').textContent = contact.pressEmail;
    document.getElementById('address').textContent = contact.address;
}

// ========================================
//   GALLERY FILTER
// ========================================
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========================================
//   LIGHTBOX
// ========================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentIndex = 0;
    let visibleItems = [];
    
    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => 
            item.style.display !== 'none'
        );
    }
    
    function openLightbox(index) {
        updateVisibleItems();
        currentIndex = index;
        const item = visibleItems[currentIndex];
        const img = item.querySelector('.gallery-img');
        const title = item.querySelector('.gallery-title').textContent;
        
        lightboxImg.src = img.src;
        lightboxImg.alt = title;
        lightboxCaption.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        openLightbox(currentIndex);
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        openLightbox(currentIndex);
    }
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateVisibleItems();
            const newIndex = visibleItems.indexOf(item);
            openLightbox(newIndex);
        });
    });
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

// ========================================
//   CONTACT FORM
// ========================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert(`¡Gracias ${name}! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.`);
        
        // Reset form
        form.reset();
    });
}

// ========================================
//   SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.about-content, .achievement-card, .business-card, .gallery-item, .testimonial-card, .value-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.98);
        padding: 20px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }
        
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// ========================================
//   KEYFRAMES ANIMATIONS
// ========================================
const keyframes = document.createElement('style');
keyframes.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
        }
        40% {
            transform: translateX(-50%) translateY(-10px);
        }
        60% {
            transform: translateX(-50%) translateY(-5px);
        }
    }
    
    @keyframes scroll {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(15px);
        }
    }
`;
document.head.appendChild(keyframes);
