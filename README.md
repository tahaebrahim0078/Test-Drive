# DriveTest Platform - Frontend

A modern, responsive Next.js web application for booking luxury car test drives. Built with TypeScript, Tailwind CSS, and Framer Motion for smooth animations.

## 🎯 Project Overview

DriveTest is a comprehensive platform that allows customers to:

- Browse and search luxury vehicles
- View detailed car specifications and features
- Book test drives with available time slots
- Manage their bookings
- Submit and view reviews

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd testcar

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will start at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── cars/
│   │   ├── page.tsx             # Cars listing page
│   │   └── [id]/
│   │       └── page.tsx         # Car detail page
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   └── register/
│   │       └── page.tsx         # Register page
│   ├── booking/
│   │   └── [id]/
│   │       └── page.tsx         # Booking page
└── components/
    ├── Navbar.tsx               # Navigation bar
    ├── Footer.tsx               # Footer
    └── CarCard.tsx              # Car card component
```

## 🎨 Design Features

### Color Scheme

- **Primary Red**: `#EF4444` (CTAs, highlights)
- **Gray**: Various shades for text and backgrounds
- **Orange**: `#F97316` (Secondary highlights)
- **White**: Clean backgrounds

### Components

- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Company info, links, and social media
- **CarCard**: Reusable component for displaying cars
- **Motion**: Smooth animations with Framer Motion

## 📄 Pages Implemented

### Public Pages

✅ **Home** (`/`) - Landing page with hero, features, testimonials, and CTA
✅ **Browse Cars** (`/cars`) - Search and filter cars
✅ **Car Details** (`/cars/[id]`) - Detailed car information with gallery
✅ **Login** (`/auth/login`) - User authentication
✅ **Register** (`/auth/register`) - New user registration
✅ **Booking** (`/booking/[id]`) - Multi-step booking process

## 🔧 Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather)

## 🎬 Running the Project

### Development Mode

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 📝 Features

- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Smooth animations with Framer Motion
- ✅ Search and filter functionality
- ✅ Multi-step booking process
- ✅ Image gallery with carousel
- ✅ Rating and reviews display
- ✅ Form validation
- ✅ Dark/Light mode ready

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

---

**Happy coding! 🚗✨**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
