# Servifio - Frontend

Client for **Servifio**, a local service marketplace. Signature UI motif: a perforated job-ticket stub, reused across service listings and bookings.

**App:** [servifio.vercel.app](https://servifio.vercel.app) · **API:** [servifio-server.onrender.com](https://servifio-server.onrender.com) · **API docs:** [servifio-server/API_DOCUMENTATION.md](https://github.com/tawchifulislam/servifio-server/blob/main/API_DOCUMENTATION.md)

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · react-hook-form + Zod

## Features

- Role-aware UI and protected routes (`CUSTOMER`, `PROVIDER`, `ADMIN`)
- Service discovery with category/search filters
- Booking flow with live status tracking
- Reviews on completed bookings
- Provider service management, admin category/user management
- Responsive across mobile, tablet, desktop

## Setup

```bash
git clone <repo-url>
cd servifio-client
npm install
```

`.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
npm run dev        # http://localhost:3000
```

## Structure

```text
src/
├── app/           routes (login, services, bookings, provider, admin)
├── components/    ui/ (shadcn), auth/, ticket-card, navbar, etc.
└── lib/           api client, auth store, zod schemas
```

Backend repo: [servifio-server](https://github.com/tawchifulislam/servifio-server)
