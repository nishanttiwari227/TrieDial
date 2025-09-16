# Smart Phonebook - Vanilla JavaScript

A modern, offline-first phonebook application built with pure vanilla JavaScript, HTML, and CSS. Features lightning-fast Trie-based search, voice search capabilities, and comprehensive contact management.

## Features

- **⚡ Lightning Fast Search**: Trie data structure for O(m) search complexity
- **🎤 Voice Search**: Web Speech API integration for hands-free searching
- **📱 Responsive Design**: Works perfectly on mobile and desktop
- **🌙 Theme Toggle**: Dark/light mode with localStorage persistence
- **📊 Contact Management**: Full CRUD operations with favorites system
- **🏷️ Tag System**: Organize contacts by Family, Work, Friends, Other
- **📞 Call Simulation**: Realistic call interface with controls
- **💾 Import/Export**: JSON-based backup and restore functionality
- **🔍 Real-time Suggestions**: Auto-complete as you type
- **📋 48 Sample Contacts**: Pre-loaded with diverse Indian contacts

## Quick Start

### Option 1: Direct File Opening
1. Download all files: `index.html`, `style.css`, `script.js`
2. Open `index.html` directly in any modern web browser
3. That's it! The app works completely offline

### Option 2: GitHub Pages Deployment
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" → main branch
4. Your phonebook will be live at `https://yourusername.github.io/repository-name`

### Option 3: Local Development
```bash
# Simple Python server (optional, for development)
python3 -m http.server 8000
# Then open http://localhost:8000
```

## How to Use

1. **Search**: Type in the search box or click the microphone for voice search
2. **Add Contact**: Click the "+" button to add new contacts
3. **Edit Contact**: Click on any contact to edit their information
4. **Call Simulation**: Click the phone icon to simulate calls
5. **Filter**: Use tag buttons to filter contacts by category
6. **Theme**: Toggle between light and dark modes
7. **Backup**: Export contacts as JSON or import from backup

## Technical Details

- **No Framework Dependencies**: Pure vanilla JavaScript (37KB)
- **No Build Process**: Ready to run as-is
- **No Backend Required**: All data stored in browser localStorage
- **Modern Browser Support**: Uses Web Speech API, localStorage, CSS Grid/Flexbox
- **Responsive**: Mobile-first design with touch-friendly controls

## File Structure

```
phonebook/
├── index.html    (10KB) - Main HTML structure
├── style.css     (17KB) - Complete styling with themes
├── script.js     (37KB) - Full application logic with Trie implementation
└── README.md     - This documentation
```

## Browser Compatibility

- Chrome 25+ (recommended for voice search)
- Firefox 16+
- Safari 7+
- Edge 12+

Voice search requires microphone permissions and works best in Chrome.

## License

MIT License - Feel free to use, modify, and distribute.
