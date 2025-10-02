/**
 * Startpage Configuration
 * This file contains all user-configurable settings for the startpage
 */

// Navigation menu categories and links (Primary set)
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
  // Server category
    server: {
    title: "Server",
    color: "blue",
    links: [
      { name: "Files", url: "https://filebrowser.cosmos.karyio.com/" },
      { name: "Cosmos", url: "https://cosmos.karyio.com/cosmos-ui/" },
    ]
  },
};

// Alternate navigation set (shows when toggled)
const alternateNavigationConfig = {
  // Learning category
  Learning: {
    title: "Learning",
    color: "blue",
    links: [
      { name: "Odin", url: "https://www.theodinproject.com/dashboard" },
      { name: "Youtube", url: "https://youtube.com" },
    ]
  },
  // LLM Category
  aiModels: {
    title: "LLM",
    color: "blue",
    links: [
      { name: "GPT", url: "https://chatgpt.com" },
      { name: "Claude", url: "https://claude.ai" },
    ]
  },
  // Programming Category
  Programming: {
    title: "Important",
    color: "blue",
    links: [
      { name: "Indeed", url: "https://secure.indeed.com" },
      { name: "Github", url: "https://github.com/jmartgmz" },
    ]
  },
    Improve: {
    title: "Improve",
    color: "blue",
    links: [
      { name: "Neetcode", url: "https://neetcode.io/practice" },
      { name: "Monkeytype", url: "https://monkeytype.com/" },
    ]
  },
};

// Global appearance and behavior settings
const globalSettings = {
  // Font configuration
  font: {
    family: 'Font',
    path: 'assets/fonts/apple/Univers 47 Condensed Light Oblique.otf',
    fallback: 'Arial, Helvetica, sans-serif'
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
  module.exports = { navigationConfig, alternateNavigationConfig, globalSettings };
}