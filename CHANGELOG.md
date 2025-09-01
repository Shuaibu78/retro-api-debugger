# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Open source contribution setup
- Issue templates for bugs, features, and themes
- Pull request template
- Code of conduct
- Contributing guidelines

## [1.0.0] - 2024-01-XX

### Added

- 🎮 **Core API Debugger Features**

  - Request form with URL, method, headers, and body inputs
  - Animated response panel with syntax highlighting
  - Request history (last 5 requests) with localStorage persistence
  - CORS proxy API route for cross-origin requests

- 🎨 **Retro Aesthetic**

  - VT323 monospace font for authentic terminal look
  - CRT effects: scanlines, glowing text, and flicker animations
  - Matrix background with animated falling characters
  - 10 retro themes (5 dark + 5 light) with category switching
  - Custom CSS variables for theme management

- 🚀 **Advanced Features**

  - Interactive terminal with command-line interface
  - Real-time API monitoring dashboard with statistics
  - Request templates for popular APIs (GitHub, JSONPlaceholder, etc.)
  - Code generator supporting 10+ programming languages
  - Retro sound effects with Web Audio API
  - Comprehensive keyboard shortcuts system

- 🎵 **Audio & Visual**

  - Square wave beep sounds for interactions
  - Smooth Framer Motion animations
  - Responsive design for all devices
  - Accessibility features and keyboard navigation

- 🎯 **Developer Experience**
  - TypeScript for type safety
  - Next.js 14+ with App Router
  - Tailwind CSS for styling
  - Production-ready build system
  - Hot reload development server

### Technical Details

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4+
- **Animations**: Framer Motion
- **Font**: VT323 (Google Fonts)
- **Package Manager**: Yarn

### Themes Available

#### Dark Themes

- Classic Green (default)
- Amber Terminal
- Blue Matrix
- Red Alert
- Purple Haze

#### Light Themes

- Light Green
- Light Blue
- Light Amber
- Light Purple
- Light Pink

### Code Generation Languages

- JavaScript (Fetch)
- TypeScript (Fetch)
- Python (Requests)
- cURL
- PHP (cURL)
- Java (HttpClient)
- C# (HttpClient)
- Go (net/http)
- Rust (reqwest)
- Swift (URLSession)

### Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Send request
- `Ctrl/Cmd + T`: Toggle terminal
- `Ctrl/Cmd + M`: Toggle monitor
- `Ctrl/Cmd + H`: Toggle theme switcher
- `Ctrl/Cmd + R`: Toggle templates
- `Ctrl/Cmd + G`: Toggle code generator
- `Ctrl/Cmd + Shift + K`: Clear history
- `Escape`: Close panels

---

## Version History

### [0.1.0] - Initial Development

- Basic Next.js setup
- Initial component structure
- Basic API proxy functionality

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
