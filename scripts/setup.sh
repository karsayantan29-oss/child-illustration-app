#!/bin/bash

# Setup script for Child Illustration Personalizer
# This script helps you set up the project quickly

echo "🎨 Child Illustration Personalizer - Setup Script"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env and add your API keys!"
    echo ""
    echo "   You need one of the following:"
    echo "   1. Replicate API token from: https://replicate.com/account/api-tokens"
    echo "   2. fal.ai API key from: https://fal.ai/dashboard/keys"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Create public directories if they don't exist
echo "📁 Creating public directories..."
mkdir -p public/illustrations
echo "✅ Directories created"
echo ""

# Check API keys
echo "🔑 Checking API keys..."
if grep -q "your_replicate_token_here" .env 2>/dev/null || grep -q "your_fal_key_here" .env 2>/dev/null; then
    echo "⚠️  WARNING: Default API keys detected in .env"
    echo "   Please update .env with your actual API keys before running the app"
    echo ""
else
    echo "✅ API keys appear to be configured"
    echo ""
fi

echo "=================================================="
echo "✨ Setup Complete!"
echo ""
echo "Next steps:"
echo "  1. Add your API keys to .env file"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:3000"
echo ""
echo "For deployment to Vercel:"
echo "  - Run: vercel"
echo "  - Or connect via Vercel dashboard"
echo ""
echo "📚 Read README.md for detailed documentation"
echo "=================================================="
