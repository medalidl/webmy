// ========================================
// ESPERAR CARGA DEL DOM
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // INTRO CINEMATOGRÁFICA CON GSAP
    // ========================================
    const introTimeline = gsap.timeline();
    
    introTimeline
        .to('.intro-content', {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out'
        })
        .to('.loader-bar', {
            width: '200px',
            duration: 1.5,
            ease: 'power2.inOut'
        }, '-=1')
        .to('.intro-overlay', {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.8,
            delay: 0.5,
            onComplete: () => {
                document.querySelector('.intro-overlay').classList.add('intro-hidden');
                initHeroAnimations();
            }
        });

    // ========================================
    // SLIDER ROMÁNTICO (SWIPER)
    // ========================================
    const romanticSwiper = new Swiper('.romantic-swiper', {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChange: function() {
                animateHearts();
            }
        }
    });

    // ========================================
    // CORAZONES FLOTANTES
    // ========================================
    function animateHearts() {
        const activeSlide = document.querySelector('.swiper-slide-active .hearts-container');
        if (!activeSlide) return;
        
        activeSlide.innerHTML = '';
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('i');
            heart.classList.add('fas', 'fa-heart', 'heart');
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 4 + 's';
            heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
            activeSlide.appendChild(heart);
        }
    }
    
    animateHearts();

    // ========================================
    // ANIMACIONES HERO CON GSAP
    // ========================================
    function initHeroAnimations() {
        gsap.registerPlugin(ScrollTrigger);
        
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (activeSlide) {
            gsap.from('.gsap-hero-text', {
                opacity: 0,
                y: 50,
                duration: 1.5,
                ease: 'power4.out',
                delay: 0.3
            });
            
            gsap.from('.gsap-hero-desc', {
                opacity: 0,
                y: 30,
                duration: 1.5,
                ease: 'power4.out',
                delay: 0.6
            });
        }
    }

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========================================
    // MENU MOBILE
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10,10,10,0.98)';
            navLinks.style.padding = '2rem';
        }
    });

    // ========================================
    // HISTORIAS (STORIES) FUNCIONALIDAD
    // ========================================
    const storiesSwiper = new Swiper('.stories-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: false,
    });

    const storyModal = document.getElementById('story-modal');
    const storyImages = [
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800',
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800',
        'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800'
    ];
    
    let currentStoryIndex = 0;
    let storyInterval;

    document.querySelectorAll('.story-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            currentStoryIndex = index;
            openStory(index);
        });
    });

    function openStory(index) {
        storyModal.classList.add('active');
        updateStoryContent(index);
        startStoryProgress();
    }

    function closeStory() {
        storyModal.classList.remove('active');
        stopStoryProgress();
    }

    function updateStoryContent(index) {
        const img = storyModal.querySelector('.story-content-display img');
        img.src = storyImages[index];
    }

    function startStoryProgress() {
        stopStoryProgress();
        const progress = storyModal.querySelector('.progress');
        progress.style.width = '0%';
        progress.style.transition = 'width 3s linear';
        
        setTimeout(() => {
            progress.style.width = '100%';
        }, 100);
        
        storyInterval = setTimeout(() => {
            nextStory();
        }, 3000);
    }

    function stopStoryProgress() {
        clearTimeout(storyInterval);
        const progress = storyModal.querySelector('.progress');
        progress.style.transition = 'none';
        progress.style.width = '0%';
    }

    function nextStory() {
        currentStoryIndex = (currentStoryIndex + 1) % storyImages.length;
        updateStoryContent(currentStoryIndex);
        startStoryProgress();
    }

    function prevStory() {
        currentStoryIndex = (currentStoryIndex - 1 + storyImages.length) % storyImages.length;
        updateStoryContent(currentStoryIndex);
        startStoryProgress();
    }

    document.querySelector('.close-story').addEventListener('click', closeStory);
    document.querySelector('.next-story').addEventListener('click', () => {
        nextStory();
    });
    document.querySelector('.prev-story').addEventListener('click', () => {
        prevStory();
    });

    // ========================================
    // REELS SWIPER
    // ========================================
    const reelsSwiper = new Swiper('.reels-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        },
        on: {
            slideChange: function() {
                handleReelVideos(this);
            }
        }
    });

    function handleReelVideos(swiper) {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
        });
        
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (activeSlide) {
            const video = activeSlide.querySelector('video');
            if (video) {
                video.play().catch(e => console.log('Autoplay prevented'));
            }
        }
    }

    // ========================================
    // GALERÍA INSTAGRAM - LIKES
    // ========================================
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('liked');
            if (this.classList.contains('liked')) {
                this.classList.remove('far');
                this.classList.add('fas');
                
                gsap.from(this, {
                    scale: 1.5,
                    duration: 0.3,
                    ease: 'back.out'
                });
            } else {
                this.classList.remove('fas');
                this.classList.add('far');
            }
        });
    });

    // ========================================
    // ANIMACIONES SCROLL TRIGGER
    // ========================================
    gsap.utils.toArray('.gsap-fade-up').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.gsap-scale-up').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
    });

    gsap.from('.gsap-reveal-left', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
        },
        opacity: 0,
        x: -100,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.from('.gsap-reveal-right', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
        },
        opacity: 0,
        x: 100,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
    });

    // ========================================
    // CONTADORES ANIMADOS
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-item h3');
    
    statNumbers.forEach(stat => {
        const target = stat.innerText;
        const hasPlus = target.includes('+');
        const hasK = target.includes('k');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        
        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                once: true
            },
            innerHTML: numericValue,
            duration: 2,
            snap: { innerHTML: 1 },
            ease: 'power1.inOut',
            onUpdate: function() {
                let val = Math.round(this.targets()[0].innerHTML);
                stat.innerText = val + (hasPlus ? '+' : '') + (hasK ? 'k+' : '');
            }
        });
    });

    // ========================================
    // FORMULARIO CONTACTO
    // ========================================
    const contactForm = document.querySelector('.contact-box form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
        btn.style.background = '#4CAF50';
        
        gsap.from(btn, {
            scale: 1.1,
            duration: 0.3,
            ease: 'back.out'
        });
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });

});
