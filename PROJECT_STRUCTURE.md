# Project Structure

This document provides an overview of the Retro API Debugger project structure and organization.

## 📁 Directory Structure

```
retro-api-debugger/
├── .github/                          # GitHub-specific files
│   ├── ISSUE_TEMPLATE/               # Issue templates
│   │   ├── bug_report.md            # Bug report template
│   │   ├── feature_request.md       # Feature request template
│   │   └── theme_request.md         # Theme request template
│   ├── workflows/                    # GitHub Actions workflows
│   │   ├── ci.yml                   # Continuous Integration
│   │   └── release.yml              # Release automation
│   ├── CODE_OF_CONDUCT.md           # Community guidelines
│   ├── FUNDING.yml                  # Sponsorship configuration
│   └── dependabot.yml               # Dependency updates
├── scripts/                          # Utility scripts
│   └── setup-open-source.sh         # Open source setup script
├── src/                              # Source code
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API routes
│   │   │   └── proxy/                # CORS proxy endpoint
│   │   │       └── route.ts          # Proxy route handler
│   │   ├── globals.css               # Global styles and CRT effects
│   │   ├── layout.tsx                # Root layout component
│   │   └── page.tsx                  # Main application page
│   ├── components/                   # React components
│   │   ├── RequestForm.tsx           # API request form
│   │   ├── ResponsePanel.tsx         # Response display panel
│   │   ├── HistoryPanel.tsx          # Request history panel
│   │   ├── TerminalCommands.tsx      # Interactive terminal
│   │   ├── MonitoringDashboard.tsx   # API statistics dashboard
│   │   ├── ThemeSwitcher.tsx         # Theme selection component
│   │   ├── RequestTemplates.tsx      # API request templates
│   │   ├── MatrixBackground.tsx      # Animated background
│   │   ├── HelpPanel.tsx             # Keyboard shortcuts help
│   │   └── CodeGenerator.tsx         # Code generation component
│   └── hooks/                        # Custom React hooks
│       ├── useSoundEffects.ts        # Audio effects hook
│       └── useKeyboardShortcuts.ts   # Keyboard shortcuts hook
├── public/                           # Static assets
│   ├── favicon.ico                   # Site favicon
│   └── [other static files]          # Additional assets
├── .gitignore                        # Git ignore rules
├── .prettierrc                       # Prettier configuration
├── .prettierignore                   # Prettier ignore rules
├── CHANGELOG.md                      # Version history
├── CONTRIBUTING.md                   # Contribution guidelines
├── LICENSE                           # MIT License
├── package.json                      # Project configuration
├── README.md                         # Project documentation
├── SECURITY.md                       # Security policy
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── eslint.config.mjs                 # ESLint configuration
```

## 🏗️ Architecture Overview

### Frontend Architecture

The application follows a modern React architecture with Next.js App Router:

- **App Router**: Uses Next.js 14+ App Router for file-based routing
- **TypeScript**: Full TypeScript support for type safety
- **Component-Based**: Modular React components with clear separation of concerns
- **Custom Hooks**: Reusable logic extracted into custom hooks
- **State Management**: React hooks for local state management

### Component Hierarchy

```
App (page.tsx)
├── MatrixBackground
├── RequestForm
├── ResponsePanel
├── HistoryPanel
├── TerminalCommands
├── MonitoringDashboard
├── ThemeSwitcher
├── RequestTemplates
├── HelpPanel
└── CodeGenerator
```

### Styling Architecture

- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS Variables**: Theme system with CSS custom properties
- **CRT Effects**: Custom CSS animations and effects
- **Responsive Design**: Mobile-first responsive design
- **Retro Aesthetic**: Consistent retro/terminal styling

### API Architecture

- **Proxy Route**: `/api/proxy` handles CORS and request forwarding
- **Type Safety**: Full TypeScript interfaces for API data
- **Error Handling**: Comprehensive error handling and user feedback
- **Response Processing**: Smart JSON/text response handling

## 🎨 Theme System

### Theme Structure

Themes are defined in `ThemeSwitcher.tsx` with the following structure:

```typescript
interface Theme {
  name: string; // Display name
  background: string; // Background color
  foreground: string; // Text color
  accent: string; // Accent color
  glow: string; // Glow effect color
  category: 'dark' | 'light'; // Theme category
}
```

### CSS Variables

Themes are applied using CSS custom properties:

```css
:root {
  --background: #0a0a0a;
  --foreground: #00ff00;
  --accent: #00ff41;
  --glow: #00ff00;
}
```

## 🔧 Development Workflow

### Local Development

1. **Install Dependencies**: `yarn install`
2. **Start Dev Server**: `yarn dev`
3. **Build Project**: `yarn build`
4. **Run Linting**: `yarn lint`
5. **Type Check**: `yarn type-check`

### Code Organization

- **Components**: Single responsibility, reusable components
- **Hooks**: Custom logic and state management
- **Types**: TypeScript interfaces and types
- **Styles**: Tailwind classes with custom CSS for effects
- **Utils**: Utility functions and helpers

### File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `RequestForm.tsx`)
- **Hooks**: `camelCase.ts` starting with `use` (e.g., `useSoundEffects.ts`)
- **Types**: `camelCase.ts` (e.g., `apiTypes.ts`)
- **Utils**: `camelCase.ts` (e.g., `apiUtils.ts`)

## 🚀 Deployment

### Build Process

1. **Type Checking**: TypeScript compilation
2. **Linting**: ESLint code quality checks
3. **Building**: Next.js production build
4. **Optimization**: Asset optimization and bundling

### Deployment Targets

- **Vercel**: Primary deployment platform
- **GitHub Pages**: Alternative static hosting
- **Docker**: Containerized deployment option

## 🧪 Testing Strategy

### Manual Testing

- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Responsive**: Desktop, tablet, mobile
- **Accessibility**: Keyboard navigation, screen readers
- **Performance**: Load times, animations, memory usage

### Automated Testing

- **Linting**: ESLint for code quality
- **Type Checking**: TypeScript for type safety
- **Build Testing**: Ensure production builds work
- **CI/CD**: GitHub Actions for automated testing

## 📚 Documentation

### Code Documentation

- **JSDoc**: Function and component documentation
- **TypeScript**: Type definitions as documentation
- **Comments**: Inline code comments for complex logic
- **README**: Comprehensive project documentation

### User Documentation

- **Contributing Guide**: How to contribute to the project
- **Security Policy**: Security reporting and guidelines
- **Changelog**: Version history and changes
- **Issue Templates**: Structured issue reporting

## 🔒 Security Considerations

### Client-Side Security

- **Input Validation**: All user inputs are validated
- **XSS Prevention**: React's built-in XSS protection
- **CSRF Protection**: Same-origin policy enforcement
- **Content Security**: No inline scripts or styles

### API Security

- **CORS Handling**: Proper CORS configuration
- **Input Sanitization**: Request data sanitization
- **Error Handling**: Secure error messages
- **Rate Limiting**: Consider implementing rate limiting

## 🎯 Performance Optimization

### Frontend Optimization

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js image optimization
- **Bundle Analysis**: Regular bundle size monitoring
- **Lazy Loading**: Component lazy loading where appropriate

### Runtime Optimization

- **React Optimization**: Proper use of React hooks
- **Animation Performance**: Optimized Framer Motion animations
- **Memory Management**: Proper cleanup and garbage collection
- **Caching**: Browser caching strategies

## 🌍 Internationalization

### Current Status

- **English Only**: Currently supports English only
- **Extensible**: Architecture supports i18n
- **Future Plans**: Multi-language support planned

### Implementation Strategy

- **React i18n**: Use react-i18next for translations
- **Locale Detection**: Browser locale detection
- **Fallback**: English as fallback language
- **RTL Support**: Right-to-left language support

## 🔮 Future Architecture

### Planned Improvements

- **Plugin System**: Extensible plugin architecture
- **State Management**: Redux or Zustand for complex state
- **Testing**: Jest and React Testing Library
- **Storybook**: Component documentation and testing
- **PWA**: Progressive Web App features

### Scalability Considerations

- **Micro-frontends**: Potential micro-frontend architecture
- **API Gateway**: Centralized API management
- **Caching**: Redis or similar caching layer
- **CDN**: Content delivery network integration

---

This structure is designed to be maintainable, scalable, and welcoming to contributors. Each component has a clear purpose and the architecture supports future growth and feature additions.
