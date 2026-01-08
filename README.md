# Test Drive Web Application

A frontend application for a car test-drive platform built with Next.js (App Router) and TypeScript. The codebase contains page routes for browsing cars, booking flows, authentication pages, dealer/customer UI components, and utilities for integrating with a backend API and Cloudinary for image uploads.

---

## 🎯 Project Overview

Test Drive is a comprehensive platform that allows customers to:

- Browse and search luxury vehicles
- View detailed car specifications and features
- Book test drives with available time slots
- Manage their bookings
- Submit and view reviews

---

## 📝 Features

- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Smooth animations with Framer Motion
- ✅ Search and filter functionality
- ✅ Multi-step booking process

## 🧰 Tech Stack

- Next.js (App Router)
- React 19 + TypeScript
- Tailwind CSS
- React Query (@tanstack/react-query)
- Axios
- Framer Motion
- Headless UI
- React Icons
- Cloudinary (client-side unsigned uploads)
- ESLint, PostCSS

---

## 📁 Folder Structure (key parts)

- `src/app/` — Next.js App Router pages (home, cars, booking, auth, dealer, customer, review)
- `src/components/` — Reusable components (CarCard, Navbar, loadingState, errorState)
- `src/utils/` — API helpers and utilities (`apiCall.ts`, `api.ts`)
- `src/context/` — Auth context

---

## 🛠 Installation

Prerequisites:

- Node.js (18+ recommended)
- npm (or yarn/pnpm)

Commands:

```bash
# clone
git clone <repo-url>
cd Test-Drive

# install dependencies
npm install
```

Create a `.env.local` file with the required environment variables (see below).

---

## ▶️ Running the Project

Start development server:

```bash
npm run dev
```

Build for production and start:

```bash
npm run build
npm run start
```

Run linter:

```bash
npm run lint
```

The app runs by default at `http://localhost:3000` in development.

---

## 📜 Available Scripts

Defined in `package.json`:

- `dev` — Run Next.js in development mode (`next dev`)
- `build` — Create an optimized production build (`next build`)
- `start` — Start the production server (`next start`)
- `lint` — Run ESLint (`eslint`)

---

## 🔐 Environment Variables

The application expects the following environment variables (observed in source files):

- `NEXT_PUBLIC_API_URL` — Base URL for the backend API (used in `src/utils/apiCall.ts` and pages)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — Your Cloudinary cloud name
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` — Cloudinary unsigned upload preset used in `DealerCarForm`

Example `.env.local`:

```
NEXT_PUBLIC_API_URL=https://api.example.com/
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

---

## 🎨 Design Features

### Color Scheme

- **Primary Red**: `#EF4444` (CTAs, highlights)
- **Gray**: Various shades for text and backgrounds
- **Orange**: `#F97316` (Secondary highlights)
- **White**: Clean backgrounds
