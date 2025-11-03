/**
 * Main application script
 * Initializes all functionality and sets up event listeners
 */

// Track which navigation set is currently active
let isAlternateNavigation = false;

/**
 * Generates navigation menu from configuration
 */
function generateNavigation(configToUse = null) {
    const navElement = document.getElementById('navigation');
    if (!navElement) return;
    
    // Use provided config or default based on current state
    const config = configToUse || (isAlternateNavigation ? alternateNavigationConfig : navigationConfig);
    if (!config) return;
    
    // Clear existing navigation
    navElement.innerHTML = '';
    
    // Generate navigation from config
    for (const categoryKey in config) {
        const category = config[categoryKey];
        
        // Create category element
        const categoryElement = document.createElement('ul');
        categoryElement.className = category.color;
        
        // Create category title
        const titleElement = document.createElement('a');
        titleElement.textContent = category.title;
        categoryElement.appendChild(titleElement);
        
        // Create links
        category.links.forEach(link => {
            const linkItem = document.createElement('li');
            const linkAnchor = document.createElement('a');
            linkAnchor.href = link.url;
            linkAnchor.textContent = link.name;
            linkItem.appendChild(linkAnchor);
            categoryElement.appendChild(linkItem);
        });
        
        // Add category to navigation
        navElement.appendChild(categoryElement);
    }
}

/**
 * Toggles between navigation sets
 */
function toggleNavigation() {
    isAlternateNavigation = !isAlternateNavigation;
    generateNavigation();
    
    // Update button appearance to indicate current state
    const toggleBtn = document.getElementById('nav-toggle-btn');
    if (toggleBtn) {
        toggleBtn.textContent = isAlternateNavigation ? '<' : '>';
        toggleBtn.setAttribute('aria-label', 
            isAlternateNavigation ? 'Switch to primary navigation' : 'Switch to alternate navigation'
        );
    }
}

/**
 * Sets up search engine based on configuration
 */
function setupSearchEngine() {
    if (!globalSettings.searchEngine) return;
    
    const searchForm = document.querySelector('.search-bar form');
    if (searchForm) {
        searchForm.action = globalSettings.searchEngine.url;
        
        const searchInput = searchForm.querySelector('input[type="text"]');
        if (searchInput) {
            searchInput.name = globalSettings.searchEngine.queryParam;
        }
    }
}

/**
 * Sets up username display if configured
 */
function setupUsername() {
    if (!globalSettings.username) return;
    
    const usernameElement = document.getElementById('username-display');
    if (usernameElement) {
        usernameElement.textContent = globalSettings.username;
    }
}

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Generate navigation from config
    generateNavigation();
    
    // Set up search engine
    setupSearchEngine();
    
    // Set up username if provided
    setupUsername();
    
    // Initialize clock
    updateClock();
    
    // Initialize scaling
    updateScale();
    
    // Set up navigation toggle button
    const toggleBtn = document.getElementById('nav-toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleNavigation);
    }
    
    // Add window resize event listener
    window.addEventListener('resize', updateScale);

    // Add keyboard event listener for navigation and search focus
    // Add keyboard event listener for navigation and search focus
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            toggleNavigation();
        } else if (e.key === 'ArrowUp') {
            // Focus the search bar input
            const searchInput = document.querySelector('.search-bar input[type="text"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
});