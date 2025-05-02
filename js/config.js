/**
 * Startpage Configuration
 * This file contains all user-configurable settings for the startpage
 */

// Navigation menu categories and links
const navigationConfig = {
  // University category
  university: {
    title: "University",
    color: "blue",
    links: [
      { name: "Canvas", url: "https://udel.instructure.com" },
      { name: "UDSIS", url: "https://my.udel.edu" },
    ]
  },
  // Email and storage category
  protonServices: {
    title: "Proton",
    color: "blue",
    links: [
      { name: "Mail", url: "https://mail.proton.me/inbox" },
      { name: "Storage", url: "https://drive.proton.me/" },
    ]
  },
  // Google services category
  googleServices: {
    title: "Google",
    color: "blue",
    links: [
      { name: "Mail", url: "https://mail.google.com/mail/inbox" },
      { name: "Storage", url: "https://drive.google.com/drive/home" },
    ]
  },
  // AI models category
  aiModels: {
    title: "LLM",
    color: "blue",
    links: [
      { name: "GPT", url: "https://chatgpt.com" },
      { name: "Claude", url: "https://claude.ai" },
    ]
  },
};

// Global appearance and behavior settings
const globalSettings = {
  // Font configuration
  font: {
    family: 'Font',
    path: 'assets/fonts/apple/Univers 47 Condensed Light Oblique.otf',
  },
  // Search engine (default: Google)
  searchEngine: {
    name: "Google",
    url: "https://www.google.com/search",
    queryParam: "q"
  },
  // Username to display (optional)
  username: "",
  // Theme color (affects accent colors)
  themeColor: "blue" // Options: blue, green, red, yellow
};

// Export configuration for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { navigationConfig, globalSettings };
}