/**
 * GOTI Core Design System Functions
 * Essential utilities for premium interactivity and data handling.
 */

// --- Color Manipulation ---

/**
 * Convert hex color to RGBA
 * @param {string} hex - Hex color code
 * @param {number} alpha - Opacity (0-1)
 * @returns {string} RGBA color string
 */
function hexToRgba(hex, alpha = 1) {
    if (!hex) return '';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// --- Responsive Utilities ---

/**
 * Check if viewport matches breakpoint
 * @param {string} breakpoint - Breakpoint name (sm, md, lg, xl, 2xl)
 * @returns {boolean}
 */
function matchesBreakpoint(breakpoint) {
    const breakpoints = {
        'sm': '(min-width: 640px)',
        'md': '(min-width: 768px)',
        'lg': '(min-width: 1024px)',
        'xl': '(min-width: 1280px)',
        '2xl': '(min-width: 1536px)'
    };
    return window.matchMedia(breakpoints[breakpoint]).matches;
}

// --- Animation Utilities ---

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector
 * @param {number} offset - Offset from top (px)
 */
function smoothScrollTo(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (!element) return;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Apply a premium glow pulse effect to an element
 * @param {string} selector - CSS selector or element
 */
function applyGlowPulse(el) {
    const element = typeof el === 'string' ? document.querySelector(el) : el;
    if (!element) return;

    element.style.transition = 'box-shadow 2s ease-in-out';
    setInterval(() => {
        element.style.boxShadow = '0 0 20px rgba(249, 208, 6, 0.4)';
        setTimeout(() => {
            element.style.boxShadow = '0 0 5px rgba(249, 208, 6, 0.1)';
        }, 2000);
    }, 4000);
}

// --- Form & Data Validation ---

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validate phone number (international format)
 */
function isValidPhone(phone) {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phone.replace(/[\s-]/g, ''));
}

// --- UI Helpers ---

/**
 * Dynamically change theme (light/dark)
 */
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('goti-theme', isDark ? 'dark' : 'light');
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('goti-theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
    }

    // Auto-setup button sounds/ripples if desired
    document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mousedown', createRipple);
    });
});

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) { ripple.remove(); }
    button.appendChild(circle);
}

// Exports for module use
window.goti = {
    hexToRgba,
    matchesBreakpoint,
    smoothScrollTo,
    applyGlowPulse,
    isValidEmail,
    isValidPhone,
    toggleTheme
};
