# Contributing to Retro API Debugger

Thank you for your interest in contributing to Retro API Debugger! 🎮

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- Git

### Development Setup

1. **Fork the repository**

   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/shuaibu78/retro-api-debugger.git
   cd retro-api-debugger
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start development server**

   ```bash
   yarn dev
   ```

4. **Open your browser**

   ```
   http://localhost:3000
   ```

## 🎯 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🎨 **UI/UX enhancements**
- 🌍 **Translations**
- 🧪 **Tests**
- 🔧 **Performance optimizations**

### Development Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**

   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

3. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add new theme switcher"
   # Use conventional commits: feat:, fix:, docs:, style:, refactor:, test:, chore:
   ```

4. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill out the PR template
   - Request review from maintainers

## 📝 Code Style Guidelines

### TypeScript/React

- Use TypeScript for all new code
- Prefer functional components with hooks
- Use meaningful variable and function names
- Add proper type annotations

### Styling

- Use Tailwind CSS classes
- Follow the retro aesthetic theme
- Ensure responsive design
- Test on different screen sizes

### File Organization

```
src/
├── app/                 # Next.js app directory
├── components/          # Reusable React components
├── hooks/              # Custom React hooks
└── types/              # TypeScript type definitions
```

### Naming Conventions

- Components: `PascalCase` (e.g., `RequestForm.tsx`)
- Hooks: `camelCase` starting with `use` (e.g., `useSoundEffects.ts`)
- Files: `kebab-case` for utilities (e.g., `api-utils.ts`)

## 🧪 Testing

### Manual Testing

- Test all new features thoroughly
- Verify retro aesthetic is maintained
- Check keyboard shortcuts work
- Test on different browsers

### Automated Testing

```bash
# Run linting
yarn lint

# Run type checking
yarn type-check

# Build the project
yarn build
```

## 🎨 Design Guidelines

### Retro Aesthetic

- Maintain the CRT/terminal look and feel
- Use the VT323 font consistently
- Keep the green-on-black color scheme as default
- Add glow effects and scanlines where appropriate

### New Themes

When adding new themes:

1. Add to `THEMES` object in `ThemeSwitcher.tsx`
2. Include both dark and light variants
3. Test all UI elements with the new theme
4. Update documentation

### Components

- Use Framer Motion for animations
- Maintain consistent spacing and typography
- Ensure accessibility (keyboard navigation, screen readers)
- Add loading states and error handling

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce**
3. **Expected vs actual behavior**
4. **Screenshots** (if applicable)
5. **Browser/OS information**
6. **Console errors** (if any)

Use the bug report template when creating issues.

## ✨ Feature Requests

For new features:

1. **Check existing issues** first
2. **Describe the feature** clearly
3. **Explain the use case** and benefits
4. **Consider implementation** complexity
5. **Discuss with maintainers** before starting work

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Document component props and usage
- Include examples in comments

### README Updates

- Update feature lists when adding new functionality
- Add screenshots for new features
- Keep installation instructions current

## 🔧 Development Tips

### Local Development

```bash
# Start with hot reload
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

### Debugging

- Use browser dev tools
- Check console for errors
- Use React DevTools extension
- Test API endpoints with the built-in proxy

### Performance

- Optimize images and assets
- Use React.memo for expensive components
- Minimize bundle size
- Test on slower devices

## 🎵 Sound Effects

When adding new sound effects:

- Use the `useSoundEffects` hook
- Keep sounds retro/8-bit style
- Test volume levels
- Provide mute option for accessibility

## 🌍 Internationalization

For translations:

- Add new languages to the i18n system
- Test with different text lengths
- Ensure retro fonts support the language
- Update documentation

## 📋 Pull Request Checklist

Before submitting a PR:

- [ ] Code follows the style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Screenshots added (if UI changes)
- [ ] Feature works on mobile devices
- [ ] No console errors
- [ ] Retro aesthetic is maintained
- [ ] Keyboard shortcuts work (if applicable)
- [ ] Sound effects work (if applicable)

## 🏷️ Release Process

1. **Version bump** in `package.json`
2. **Update CHANGELOG.md**
3. **Create release notes**
4. **Tag the release**
5. **Deploy to production**

## 💬 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the code of conduct

## 🆘 Getting Help

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Report bugs and request features
- 📧 **Email**: Contact maintainers directly
- 📖 **Docs**: Check the README and code comments

## 🎉 Recognition

Contributors will be:

- Listed in the README
- Mentioned in release notes
- Given credit in the project

Thank you for contributing to Retro API Debugger! 🚀

---

_"In the beginning was the command line..."_
