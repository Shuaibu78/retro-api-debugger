# 🎮 Retro API Debugger

A **retro-style API debugging tool** with CRT aesthetics, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Retro API Debugger](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12+-black?style=for-the-badge&logo=framer)

## ✨ Features

### 🎯 **Core Functionality**
- **Request Form**: URL input, HTTP method selection, custom headers, and request body
- **Animated Response Panel**: Status codes, headers, and formatted response data
- **Request History**: Last 5 requests with click-to-replay functionality
- **CORS Proxy**: Built-in Next.js API route for cross-origin requests

### 🎨 **Retro Aesthetic**
- **VT323 Font**: Authentic monospace terminal font
- **CRT Effects**: Animated scanlines, glowing text, and flicker effects
- **Multiple Themes**: Classic Green, Amber Terminal, Blue Matrix, Red Alert, Purple Haze
- **Matrix Background**: Animated falling characters effect

### 🚀 **Advanced Features**
- **Interactive Terminal**: Command-line interface with help, clear, history commands
- **Real-time Monitoring**: API statistics dashboard with success rates and response times
- **Request Templates**: Pre-built templates for common APIs (GitHub, JSONPlaceholder, etc.)
- **Sound Effects**: Retro beep sounds for interactions and responses
- **Keyboard Shortcuts**: Power user shortcuts for all major functions

### 🎵 **Audio & Visual**
- **Retro Sound Effects**: Square wave beeps for clicks, success, and errors
- **Smooth Animations**: Jank-free Framer Motion animations
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Keyboard navigation and screen reader support

## 🎮 **Keyboard Shortcuts**

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Send request |
| `Ctrl/Cmd + T` | Toggle terminal |
| `Ctrl/Cmd + M` | Toggle monitor |
| `Ctrl/Cmd + H` | Toggle theme switcher |
| `Ctrl/Cmd + R` | Toggle templates |
| `Ctrl/Cmd + Shift + K` | Clear history |
| `Escape` | Close panels |

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd retro-api-debugger

# Install dependencies
yarn install

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 **Usage**

### Making API Requests
1. **Enter URL**: Type your API endpoint
2. **Select Method**: Choose GET, POST, PUT, PATCH, DELETE, HEAD, or OPTIONS
3. **Add Headers**: Use advanced options to add custom headers
4. **Add Body**: For POST/PUT requests, add JSON or text body
5. **Send Request**: Click "SEND REQUEST" or use `Ctrl+Enter`

### Using Templates
1. Click the **TEMPLATES** button (bottom-left)
2. Browse pre-built API templates
3. Click any template to auto-fill the form
4. Customize as needed and send

### Monitoring Performance
1. Click the **MONITOR** button (top-right)
2. View real-time statistics:
   - Total requests made
   - Success rate percentage
   - Average response time
   - Error count
   - Last request timestamp

### Terminal Commands
1. Click the **TERMINAL** button (bottom-right)
2. Available commands:
   - `help` - Show available commands
   - `clear` - Clear request history
   - `history` - Show command history
   - `ping` - Test connection
   - `theme` - Show current theme

## 🎨 **Themes**

Switch between 5 retro themes:
- **Classic Green**: Original green-on-black terminal
- **Amber Terminal**: Warm amber monochrome
- **Blue Matrix**: Cool blue cyberpunk
- **Red Alert**: High-contrast red warning
- **Purple Haze**: Psychedelic purple

## 🛠 **Technical Stack**

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4+
- **Animations**: Framer Motion
- **Font**: VT323 (Google Fonts)
- **Package Manager**: Yarn

## 📁 **Project Structure**

```
src/
├── app/
│   ├── api/proxy/          # CORS proxy endpoint
│   ├── globals.css         # Global styles & CRT effects
│   ├── layout.tsx          # Root layout with font
│   └── page.tsx            # Main application page
├── components/
│   ├── RequestForm.tsx     # API request form
│   ├── ResponsePanel.tsx   # Response display
│   ├── HistoryPanel.tsx    # Request history
│   ├── TerminalCommands.tsx # Interactive terminal
│   ├── MonitoringDashboard.tsx # Stats dashboard
│   ├── ThemeSwitcher.tsx   # Theme selection
│   ├── RequestTemplates.tsx # API templates
│   ├── MatrixBackground.tsx # Animated background
│   └── HelpPanel.tsx       # Keyboard shortcuts help
└── hooks/
    ├── useSoundEffects.ts  # Audio effects
    └── useKeyboardShortcuts.ts # Keyboard handling
```

## 🎯 **Unique Features**

### 1. **Matrix Background Effect**
- Animated falling characters
- Configurable opacity and speed
- Performance optimized with canvas

### 2. **Retro Sound System**
- Web Audio API integration
- Square wave synthesis
- Contextual sound feedback

### 3. **Real-time Monitoring**
- Response time tracking
- Success rate calculation
- Persistent statistics

### 4. **Template System**
- Pre-built API examples
- Searchable template library
- One-click form population

### 5. **Interactive Terminal**
- Command-line interface
- Command history
- Real-time feedback

## 🔧 **Customization**

### Adding New Themes
Edit `src/components/ThemeSwitcher.tsx` and add to the `THEMES` object:

```typescript
const THEMES = {
  // ... existing themes
  newTheme: {
    name: 'NEW THEME',
    background: '#000000',
    foreground: '#ffffff',
    accent: '#ff0000',
    glow: '#ff0000',
  },
};
```

### Adding Sound Effects
Extend `src/hooks/useSoundEffects.ts`:

```typescript
const playCustomSound = useCallback(() => {
  playBeep(1000, 200); // frequency, duration
}, [playBeep]);
```

### Adding Templates
Edit `src/components/RequestTemplates.tsx` and add to the `TEMPLATES` array:

```typescript
const TEMPLATES: RequestTemplate[] = [
  // ... existing templates
  {
    name: 'NEW API',
    description: 'Description of the API',
    url: 'https://api.example.com/endpoint',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  },
];
```

## 🚀 **Deployment**

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```bash
# Build image
docker build -t retro-api-debugger .

# Run container
docker run -p 3000:3000 retro-api-debugger
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **VT323 Font**: Google Fonts
- **CRT Effects**: Inspired by retro terminal aesthetics
- **Matrix Effect**: Inspired by The Matrix (1999)
- **Sound Design**: Retro computer beep aesthetics

---

**Built with ❤️ for the retro computing community**

*"In the beginning was the command line..."*