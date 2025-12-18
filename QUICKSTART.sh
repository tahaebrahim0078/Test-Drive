#!/bin/bash
# Quick Start Script for Test Car Application

echo "🚀 Test Car Application - Dealer Dashboard"
echo "=========================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🔧 Setup Configuration..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your actual values"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "📚 Documentation Files:"
echo "  - API_INTEGRATION.md - API endpoints documentation"
echo "  - DEALER_DASHBOARD_SUMMARY.md - Implementation summary"
echo "  - TESTING_GUIDE.md - Testing instructions"
echo ""

echo "🎯 Quick Commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run lint         - Run ESLint"
echo "  npm run lint:fix     - Fix ESLint issues"
echo ""

echo "🌐 Application URLs:"
echo "  - Homepage: http://localhost:3000"
echo "  - Dealer Dashboard: http://localhost:3000/dealer/dashboard"
echo "  - Admin Dashboard: http://localhost:3000/admin/dashboard"
echo ""

echo "✨ Features implemented:"
echo "  ✅ Dealer Dashboard with car management"
echo "  ✅ Component separation (DealerCarForm, DealerCarsTable, DealerBookingsList)"
echo "  ✅ API integration utilities"
echo "  ✅ Role-based authentication"
echo "  ✅ Form validation with error messages"
echo "  ✅ Responsive design"
echo "  ✅ Smooth animations with Framer Motion"
echo ""

echo "🔐 Test Credentials:"
echo "  Email: dealer@example.com"
echo "  Password: password123"
echo "  Role: dealer"
echo ""

echo "Ready to start! Run: npm run dev"
