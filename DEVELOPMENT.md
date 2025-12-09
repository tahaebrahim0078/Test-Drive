# DriveTest - Development Guide

##  Development Setup

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Git

### Initial Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd testcar
```

2. **Install dependencies**

```bash
npm install
```

3. **Create .env.local file**

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Start development server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

---

##  Project Structure

```
testcar/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Auth routes group
│   │   ├── (customer)/        # Customer routes group
│   │   ├── (dealer)/          # Dealer routes group
│   │   ├── (admin)/           # Admin routes group
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CarCard.tsx
│   │   └── ...
│   │
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   │
│   └── utils/                 # Utility functions
│       ├── api.ts             # API calls
│       └── constants.ts       # App constants
│
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

##  Common Development Tasks

### Adding a New Page

1. **Create the page directory**

```bash
mkdir -p src/app/pages/my-page
```

2. **Create page.tsx**

```tsx
export default function MyPage() {
  return <main>{/* Your content */}</main>;
}
```

3. **Access at** `/pages/my-page`

### Adding a New Component

1. **Create component file**

```bash
touch src/components/MyComponent.tsx
```

2. **Component template**

```tsx
"use client";

interface MyComponentProps {
  title?: string;
}

export default function MyComponent({ title }: MyComponentProps) {
  return <div>{title && <h1>{title}</h1>}</div>;
}
```

### Adding Styles

Using Tailwind CSS (already configured):

```tsx
<div className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
  Button
</div>
```

### Adding Animations

Using Framer Motion (already installed):

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>;
```

### Adding Icons

Using React Icons (already installed):

```tsx
import { FiSearch, FiCalendar } from 'react-icons/fi';

<FiSearch size={20} />
<FiCalendar size={20} />
```

---

## 🔗 API Integration

### Update API Calls

Edit `src/utils/api.ts` with your backend endpoints:

```typescript
export async function fetchCars() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`);
  return response.json();
}

export async function createBooking(bookingData: BookingData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  return response.json();
}
```

### Fetch Data in Components

```tsx
"use client";

import { useEffect, useState } from "react";
import { fetchCars } from "@/utils/api";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars()
      .then(setCars)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {cars.map((car) => (
        <div key={car.id}>{car.name}</div>
      ))}
    </div>
  );
}
```

---

##  Testing

### Running Tests

```bash
npm test
```

### Creating Test Files

Place test files alongside components:

```
src/components/
├── Button.tsx
└── Button.test.tsx
```

---

##  Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

##  Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

##  Debugging

### Browser DevTools

- Use Chrome DevTools for debugging
- Check Console for errors
- Use Network tab to debug API calls

### VSCode Extensions

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint

### Enable Source Maps

Already enabled in development mode.

---

##  Coding Standards

### File Naming

- Components: `PascalCase` (e.g., `UserCard.tsx`)
- Pages: `lowercase` (e.g., `page.tsx`)
- Utilities: `camelCase` (e.g., `api.ts`)

### Component Structure

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ComponentProps {
  title: string;
  onClick?: () => void;
}

export default function Component({ title, onClick }: ComponentProps) {
  const [state, setState] = useState("");

  return <div>{title}</div>;
}
```

### Imports Order

1. React imports
2. Next.js imports
3. Third-party libraries
4. Local imports
5. Type imports

---

##  Environment Variables

### Available Variables

```
NEXT_PUBLIC_API_URL        # Backend API URL
NEXT_PUBLIC_APP_NAME       # Application name
NODE_ENV                   # Environment type
```

### Accessing in Code

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

---

##  Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

##  Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear build cache
rm -rf .next
npm run build
```

---

**Happy developing! **
