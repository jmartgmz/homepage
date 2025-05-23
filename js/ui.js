/**
 * UI helper functions
 * Handles font loading and dynamic UI updates
 */

// Create a style element for the dynamic font-face declaration
const fontStyle = document.createElement('style');
document.head.appendChild(fontStyle);

/**
 * Sets up custom font based on configuration
 */
function setupFont() {
    if (typeof globalSettings !== 'undefined' && globalSettings.font) {
        // Create @font-face rule
        const fontFace = `
            @font-face {
                font-family: '${globalSettings.font.family}';
                src: url('${globalSettings.font.path}');
            }
        `;
        
        // Add the font-face declaration to the style element
        fontStyle.textContent = fontFace;
        
        // Create another style element for setting font-family on elements
        const fontFamilyStyle = document.createElement('style');
        fontFamilyStyle.textContent = `
            body, .time-display, .username-display, .search-bar input[type="text"], .search-bar button {
                font-family: '${globalSettings.font.family}', sans-serif;
            }
        `;
        document.head.appendChild(fontFamilyStyle);
    }
}

/**
 * Updates scaling based on window size
 */
function updateScale() {
    const container = document.querySelector('.scaling-container');
    const originalWidth = 1344; // Original design width
    const originalHeight = 638; // Original design height
    const baseScale = 0.8; // Base scale factor (80% of original size)
    
    // Calculate available space
    const availableWidth = window.innerWidth;
    const availableHeight = window.innerHeight;
    
    // Calculate scale factors for width and height
    const scaleX = (availableWidth / originalWidth) * baseScale;
    const scaleY = (availableHeight / originalHeight) * baseScale;
    
    // Use the smaller scale factor to ensure everything fits
    const scaleFactor = Math.min(scaleX, scaleY);
    
    // Apply the scale factor as a CSS variable
    document.documentElement.style.setProperty('--scale-factor', scaleFactor);
}

// Set up font as early as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFont);
} else {
    setupFont();
}