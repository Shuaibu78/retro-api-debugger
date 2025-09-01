#!/bin/bash

# Retro API Debugger - Open Source Setup Script
# This script helps set up the project for open source contribution

set -e

echo "🎮 Setting up Retro API Debugger for open source contribution..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_status "Checking project structure..."

# Check for required files
required_files=(
    "CONTRIBUTING.md"
    "LICENSE"
    "CHANGELOG.md"
    "SECURITY.md"
    ".github/ISSUE_TEMPLATE/bug_report.md"
    ".github/ISSUE_TEMPLATE/feature_request.md"
    ".github/ISSUE_TEMPLATE/theme_request.md"
    ".github/pull_request_template.md"
    ".github/CODE_OF_CONDUCT.md"
    ".github/workflows/ci.yml"
    ".github/workflows/release.yml"
    ".github/FUNDING.yml"
    ".github/dependabot.yml"
    ".prettierrc"
    ".prettierignore"
    ".gitignore"
)

missing_files=()
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -eq 0 ]; then
    print_success "All required open source files are present!"
else
    print_warning "Missing files:"
    for file in "${missing_files[@]}"; do
        echo "  - $file"
    done
fi

# Check package.json for required fields
print_status "Checking package.json configuration..."

if grep -q "YOUR_USERNAME" package.json; then
    print_warning "Please update YOUR_USERNAME in package.json with your actual GitHub username"
fi

if grep -q "your.email@example.com" package.json; then
    print_warning "Please update the email in package.json with your actual email"
fi

# Check for GitHub repository URL
if grep -q "YOUR_USERNAME" package.json; then
    print_warning "Please update the repository URL in package.json"
fi

# Check for funding configuration
if grep -q "YOUR_USERNAME" .github/FUNDING.yml; then
    print_warning "Please update YOUR_USERNAME in .github/FUNDING.yml"
fi

# Check for security contact
if grep -q "security@yourdomain.com" SECURITY.md; then
    print_warning "Please update the security contact email in SECURITY.md"
fi

# Check for contact information in README
if grep -q "YOUR_USERNAME" README.md; then
    print_warning "Please update YOUR_USERNAME in README.md"
fi

if grep -q "your.email@example.com" README.md; then
    print_warning "Please update the contact email in README.md"
fi

# Check for Vercel secrets in CI
if grep -q "secrets.VERCEL_TOKEN" .github/workflows/ci.yml; then
    print_warning "Please set up Vercel secrets in your GitHub repository settings"
fi

# Check for Dependabot configuration
if grep -q "YOUR_USERNAME" .github/dependabot.yml; then
    print_warning "Please update YOUR_USERNAME in .github/dependabot.yml"
fi

print_status "Checking development dependencies..."

# Check if all required packages are installed
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Run 'yarn install' to install dependencies."
else
    print_success "Dependencies are installed"
fi

# Check for TypeScript configuration
if [ ! -f "tsconfig.json" ]; then
    print_warning "tsconfig.json not found"
fi

# Check for ESLint configuration
if [ ! -f "eslint.config.mjs" ]; then
    print_warning "ESLint configuration not found"
fi

# Check for Tailwind configuration
if [ ! -f "tailwind.config.ts" ]; then
    print_warning "Tailwind configuration not found"
fi

print_status "Running basic checks..."

# Check if the project builds
if command -v yarn &> /dev/null; then
    print_status "Testing project build..."
    if yarn build &> /dev/null; then
        print_success "Project builds successfully!"
    else
        print_error "Project build failed. Please check for errors."
    fi
else
    print_warning "Yarn not found. Please install Yarn to run build checks."
fi

# Check if linting passes
if command -v yarn &> /dev/null; then
    print_status "Testing linting..."
    if yarn lint &> /dev/null; then
        print_success "Linting passes!"
    else
        print_warning "Linting issues found. Run 'yarn lint' to see details."
    fi
fi

# Check if type checking passes
if command -v yarn &> /dev/null; then
    print_status "Testing TypeScript type checking..."
    if yarn type-check &> /dev/null; then
        print_success "Type checking passes!"
    else
        print_warning "Type checking issues found. Run 'yarn type-check' to see details."
    fi
fi

print_status "Setup checklist:"

echo ""
echo "📋 Next steps to complete your open source setup:"
echo ""
echo "1. 🔧 Update configuration files:"
echo "   - Replace 'YOUR_USERNAME' with your GitHub username in:"
echo "     - package.json"
echo "     - README.md"
echo "     - .github/FUNDING.yml"
echo "     - .github/dependabot.yml"
echo ""
echo "2. 📧 Update contact information:"
echo "   - Update email addresses in package.json and README.md"
echo "   - Update security contact in SECURITY.md"
echo ""
echo "3. 🔐 Set up GitHub secrets (for CI/CD):"
echo "   - VERCEL_TOKEN"
echo "   - ORG_ID"
echo "   - PROJECT_ID"
echo ""
echo "4. 🚀 Set up deployment:"
echo "   - Connect to Vercel for automatic deployments"
echo "   - Configure GitHub Pages (if needed)"
echo ""
echo "5. 📝 Enable GitHub features:"
echo "   - Enable Issues and Discussions"
echo "   - Enable GitHub Pages (if needed)"
echo "   - Set up branch protection rules"
echo ""
echo "6. 🎯 Create initial issues:"
echo "   - Add 'good first issue' labels"
echo "   - Create beginner-friendly issues"
echo "   - Set up project boards"
echo ""
echo "7. 📚 Documentation:"
echo "   - Review and customize CONTRIBUTING.md"
echo "   - Update README.md with your information"
echo "   - Add screenshots and demos"
echo ""

print_success "Open source setup script completed!"
print_status "Your Retro API Debugger is ready for contributors! 🎮"

echo ""
echo "🎉 Happy coding and welcome to the open source community!"
echo ""
