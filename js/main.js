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
    // Add Google Calendar overlay to DOM (hidden by default)
    const calendarOverlay = document.createElement('div');
    calendarOverlay.id = 'calendar-overlay';
    calendarOverlay.style.display = 'none';
    calendarOverlay.style.position = 'fixed';
    calendarOverlay.style.top = '0';
    calendarOverlay.style.left = '0';
    calendarOverlay.style.width = '100vw';
    calendarOverlay.style.height = '100vh';
    calendarOverlay.style.background = 'rgba(15,15,18,0.98)';
    calendarOverlay.style.zIndex = '1000';
    calendarOverlay.style.justifyContent = 'center';
    calendarOverlay.style.alignItems = 'center';
    calendarOverlay.style.display = 'flex';
    calendarOverlay.innerHTML = `
        <div style="background: #18181D; border-radius: 18px; box-shadow: 0 8px 32px #0008; padding: 24px; max-width: 90vw; max-height: 90vh; width: 1100px; height: 700px; display: flex; flex-direction: column; align-items: stretch;">
            <div style="color: #BFBFBF; font-size: 26px; margin-bottom: 12px; text-align: left; font-family: inherit;">Google Calendar</div>
            <iframe src="https://calendar.google.com/calendar/embed?mode=MONTH&showTitle=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&wkst=1&bgcolor=%2318181D" style="border: none; width: 100%; height: 100%; flex: 1; background: #18181D; border-radius: 12px;" allowfullscreen></iframe>
            <button id="close-calendar-btn" style="margin-top: 16px; align-self: flex-end; background: #232328; color: #BFBFBF; border: none; border-radius: 6px; padding: 8px 18px; font-size: 18px; cursor: pointer;">Close (Esc)</button>
        </div>
    `;
    document.body.appendChild(calendarOverlay);

    function showCalendarOverlay() {
        calendarOverlay.style.display = 'flex';
        const nav = document.getElementById('navigation');
        if (nav) nav.style.display = 'none';
        const toggleBtn = document.getElementById('nav-toggle-btn');
        if (toggleBtn) toggleBtn.style.display = 'none';
    }
    function hideCalendarOverlay() {
        calendarOverlay.style.display = 'none';
        const nav = document.getElementById('navigation');
        if (nav) nav.style.display = '';
        const toggleBtn = document.getElementById('nav-toggle-btn');
        if (toggleBtn) toggleBtn.style.display = '';
    }

    document.getElementById('close-calendar-btn').onclick = hideCalendarOverlay;

    document.addEventListener('keydown', function(e) {
        if (calendarOverlay.style.display === 'flex') {
            if (e.key === 'Escape' || e.key === 'ArrowUp') {
                hideCalendarOverlay();
            }
            // Prevent navigation keys from acting when calendar is open
            if (["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
            }
            return;
        }
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            toggleNavigation();
        } else if (e.key === 'ArrowUp') {
            // Focus the search bar input
            const searchInput = document.querySelector('.search-bar input[type="text"]');
            if (searchInput) {
                searchInput.focus();
            }
        } else if (e.key === 'ArrowDown') {
            showCalendarOverlay();
        }
    });
});