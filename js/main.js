/**
 * Main application script
 * Initializes all functionality and sets up event listeners
 */

/**
 * Generates navigation menu from configuration
 */
function generateNavigation() {
    const navElement = document.getElementById('navigation');
    if (!navElement || !navigationConfig) return;
    
    // Clear existing navigation
    navElement.innerHTML = '';
    
    // Generate navigation from config
    for (const categoryKey in navigationConfig) {
        const category = navigationConfig[categoryKey];
        
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
    
    // Add window resize event listener
    window.addEventListener('resize', updateScale);
});