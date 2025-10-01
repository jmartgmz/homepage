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
        // Get the base URL for GitHub Pages compatibility
        const baseUrl = window.location.pathname.endsWith('/') ? 
            window.location.pathname : 
            window.location.pathname + '/';
        
        // Construct font path that works both locally and on GitHub Pages
        const fontPath = globalSettings.font.path.startsWith('http') ? 
            globalSettings.font.path : 
            (baseUrl === '/' ? globalSettings.font.path : baseUrl + globalSettings.font.path);
        
        // Create @font-face rule with fallback
        const fontFace = `
            @font-face {
                font-family: '${globalSettings.font.family}';
                src: url('${fontPath}');
                font-display: swap;
            }
        `;
        
        // Add the font-face declaration to the style element
        fontStyle.textContent = fontFace;
        
        // Test if font loads successfully
        const testFont = new FontFace(globalSettings.font.family, `url(${fontPath})`);
        testFont.load().then(() => {
            console.log('Custom font loaded successfully');
            applyFont(globalSettings.font.family, globalSettings.font.fallback || 'sans-serif');
        }).catch(() => {
            console.warn('Custom font failed to load, using fallback');
            applyFont(null, globalSettings.font.fallback || 'Arial, Helvetica, sans-serif');
        });
    } else {
        // No custom font configured, use default
        applyFont(null, 'Arial, Helvetica, sans-serif');
    }
}

/**
 * Applies font family to the document
 */
function applyFont(customFont, fallback) {
    const fontFamilyStyle = document.createElement('style');
    const fontFamily = customFont ? `'${customFont}', ${fallback}` : fallback;
    
    fontFamilyStyle.textContent = `
        * {
            font-family: ${fontFamily};
        }
    `;
    document.head.appendChild(fontFamilyStyle);
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