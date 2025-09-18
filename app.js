// Edumural Invitation - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNeuralBackground();
    initializeButtonAnimations();
    initializeScrollAnimations();
    initializeLoadingAnimation();
});

// Neural network background animation
function initializeNeuralBackground() {
    const neuralBg = document.querySelector('.neural-background');
    
    // Create animated neural network lines
    function createNeuralLine() {
        const line = document.createElement('div');
        line.className = 'neural-line';
        line.style.cssText = `
            position: absolute;
            width: 1px;
            height: ${Math.random() * 100 + 50}px;
            background: linear-gradient(to bottom, transparent, rgba(212, 165, 116, 0.1), transparent);
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: neuralPulse ${3 + Math.random() * 4}s ease-in-out infinite;
            transform-origin: center;
        `;
        
        neuralBg.appendChild(line);
        
        // Remove line after animation completes
        setTimeout(() => {
            if (line.parentNode) {
                line.parentNode.removeChild(line);
            }
        }, 7000);
    }
    
    // Add CSS animation keyframes
    if (!document.getElementById('neural-animations')) {
        const style = document.createElement('style');
        style.id = 'neural-animations';
        style.textContent = `
            @keyframes neuralPulse {
                0%, 100% { opacity: 0; transform: scale(1) rotate(0deg); }
                50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
            }
            
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
            
            @keyframes shimmer {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create neural lines periodically
    setInterval(createNeuralLine, 2000);
    
    // Initial lines
    for (let i = 0; i < 3; i++) {
        setTimeout(createNeuralLine, i * 500);
    }
}

// Enhanced button animations - Ensuring navigation works
function initializeButtonAnimations() {
    const resourceButtons = document.querySelectorAll('.resource-btn');
    
    resourceButtons.forEach(button => {
        // Ensure buttons work as expected
        button.style.pointerEvents = 'auto';
        button.style.cursor = 'pointer';
        
        // Add visual ripple effect without interfering with navigation
        button.addEventListener('mousedown', function(e) {
            // Allow default navigation behavior
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(244, 208, 63, 0.4);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
            
            // Don't prevent default - let the link work normally
        });
        
        // Add visual feedback only - no interference with link functionality
        button.addEventListener('click', function(e) {
            // Add visual click feedback
            this.style.transform = 'translateY(-1px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Ensure link opens - force navigation if needed
            if (this.href) {
                // Let the browser handle the navigation naturally
                setTimeout(() => {
                    if (this.target === '_blank') {
                        window.open(this.href, '_blank', 'noopener,noreferrer');
                    }
                }, 50);
            }
        });
    });
    
    // Add ripple animation to CSS if not exists
    if (!document.getElementById('ripple-animation')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-animation';
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = [
        '.invitation-header',
        '.message-section',
        '.resources-section',
        '.invitation-footer'
    ];
    
    animatedElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            observer.observe(element);
        }
    });
}

// Loading animation
function initializeLoadingAnimation() {
    const card = document.querySelector('.invitation-card');
    const frame = document.querySelector('.golden-frame');
    
    // Add initial loading state
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) scale(0.95)';
    
    // Animate card appearance
    setTimeout(() => {
        card.style.transition = 'all 1s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    }, 100);
    
    // Add golden frame glow animation
    setTimeout(() => {
        frame.style.animation = 'subtle-glow 3s ease-in-out infinite alternate';
    }, 1500);
    
    // Add glow animation to CSS
    if (!document.getElementById('glow-animation')) {
        const glowStyle = document.createElement('style');
        glowStyle.id = 'glow-animation';
        glowStyle.textContent = `
            @keyframes subtle-glow {
                from {
                    box-shadow: 0 0 10px rgba(212, 165, 116, 0.1);
                }
                to {
                    box-shadow: 0 0 25px rgba(212, 165, 116, 0.2), inset 0 0 25px rgba(212, 165, 116, 0.05);
                }
            }
        `;
        document.head.appendChild(glowStyle);
    }
}

// Title text animation effect
function initializeTitleAnimation() {
    const title = document.querySelector('.main-title');
    if (title) {
        const text = title.textContent;
        title.innerHTML = '';
        
        // Create spans for each letter
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(20px);
                animation: letterFade 0.5s ease-out forwards;
                animation-delay: ${index * 0.05}s;
            `;
            title.appendChild(span);
        });
        
        // Add letter animation to CSS
        if (!document.getElementById('letter-animation')) {
            const letterStyle = document.createElement('style');
            letterStyle.id = 'letter-animation';
            letterStyle.textContent = `
                @keyframes letterFade {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(letterStyle);
        }
    }
}

// Initialize title animation after a brief delay
setTimeout(initializeTitleAnimation, 800);

// Add particle effect on mouse movement
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.98) { // Very reduced frequency
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 2px;
        height: 2px;
        background: rgba(212, 165, 116, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: particleFade 2s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 2000);
}

// Add particle animation
if (!document.getElementById('particle-animation')) {
    const particleStyle = document.createElement('style');
    particleStyle.id = 'particle-animation';
    particleStyle.textContent = `
        @keyframes particleFade {
            0% {
                opacity: 1;
                transform: scale(1) translate(0, 0);
            }
            100% {
                opacity: 0;
                transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
        }
    `;
    document.head.appendChild(particleStyle);
}