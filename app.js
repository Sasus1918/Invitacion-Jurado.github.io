// Enhanced invitation page interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth entrance animations
    const animateOnLoad = () => {
        const sections = document.querySelectorAll('.invitation-message, .resources-section, .quote-section, .authors-section');
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, (index + 1) * 200);
        });
    };

    // Enhanced button interactions
    const enhanceButtons = () => {
        const buttons = document.querySelectorAll('.resource-button');
        
        buttons.forEach(button => {
            // Add click animation without interfering with link functionality
            button.addEventListener('click', function(e) {
                // Create ripple effect but don't prevent default behavior
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(218, 165, 32, 0.4);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Allow the link to proceed normally
            });

            // Add hover effects
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    };

    // Neural network animation enhancement
    const enhanceNeuralBackground = () => {
        const neuralBg = document.querySelector('.neural-background');
        let animationFrame;
        let time = 0;

        const animate = () => {
            time += 0.01;
            
            // Subtle pulsing effect
            const opacity = 0.1 + Math.sin(time) * 0.02;
            neuralBg.style.opacity = opacity;
            
            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        // Pause animation when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrame);
            } else {
                animate();
            }
        });
    };

    // Smooth scrolling for better UX
    const addSmoothScrolling = () => {
        // If there were internal links, this would handle smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Keyboard accessibility enhancement
    const enhanceAccessibility = () => {
        const buttons = document.querySelectorAll('.resource-button');
        
        buttons.forEach(button => {
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Trigger the click event which will open the link
                    this.click();
                }
            });

            // Add focus indication
            button.addEventListener('focus', function() {
                this.style.outline = '2px solid #DAA520';
                this.style.outlineOffset = '2px';
            });

            button.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    };

    // Responsive text adjustment
    const adjustTextSizes = () => {
        const adjustForScreenSize = () => {
            const title = document.querySelector('.main-title');
            const message = document.querySelector('.message-text');
            
            if (window.innerWidth <= 480) {
                title.style.fontSize = '2rem';
                message.style.fontSize = '0.95rem';
            } else if (window.innerWidth <= 768) {
                title.style.fontSize = '2.5rem';
                message.style.fontSize = '1rem';
            } else {
                title.style.fontSize = '3.5rem';
                message.style.fontSize = '1.1rem';
            }
        };

        adjustForScreenSize();
        window.addEventListener('resize', adjustForScreenSize);
    };

    // Performance optimization
    const optimizePerformance = () => {
        // Preload fonts
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&display=swap',
            'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap'
        ];

        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = 'style';
            document.head.appendChild(link);
        });
    };

    // Initialize all enhancements
    animateOnLoad();
    enhanceButtons();
    enhanceNeuralBackground();
    addSmoothScrolling();
    enhanceAccessibility();
    adjustTextSizes();
    optimizePerformance();

    // Add loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Add subtle entrance delay for a more elegant reveal
        setTimeout(() => {
            document.querySelector('.invitation-container').style.opacity = '1';
        }, 100);
    });
});

// CSS for ripple effect animation
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    .resource-button {
        position: relative;
        overflow: hidden;
    }
    
    .invitation-container {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded .invitation-container {
        opacity: 1;
    }
`;

document.head.appendChild(rippleStyles);

// Console message for developers (optional easter egg)
console.log(`
╔════════════════════════════════════════╗
║              EduMural                  ║
║        Invitación Jurado              ║
║                                        ║
║  Una plataforma educativa innovadora   ║
║  basada en neuroeducación             ║
╚════════════════════════════════════════╝
`);