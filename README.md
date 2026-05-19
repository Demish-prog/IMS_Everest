# Everest IMS — Network Analytics Frontend

Enterprise-grade Network Monitoring / IMS dashboard inspired by EverestIMS and Trisul Network Analytics.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7
- Zustand (state)
- TanStack Table
- Recharts
- Framer Motion
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Routes

| Path | Description |
|------|-------------|
| `/dashboard` | KPIs, traffic charts, top devices |
| `/alerts` | Alert cards + summary sidebar |
| `/retro` | Retro counters, trends, tables |
| `/sessions` | Netflow sessions table |
| `/admin` | Admin overview |
| `/admin/probes` | Probe management |
| `/admin/settings` | Platform settings |

## Project Structure

```
src/
├── components/   # UI + layout components
├── layouts/      # MainLayout, AdminLayout
├── pages/        # Route pages
├── routes/       # Lazy-loaded routing
├── store/        # Zustand stores
├── hooks/        # useSidebar, useMediaQuery
├── services/     # API abstraction + sample data
├── charts/       # Recharts wrappers
├── tables/       # TanStack Table
├── modals/       # Global modal system
└── styles/       # Tailwind theme
```

## Features

- Fully responsive (mobile drawer sidebar, scrollable tables)
- Dark/light theme toggle
- Collapsible sidebar with expandable nav groups
- Global search, notifications, probe selector
- Lazy-loaded routes with skeleton loaders
- Error boundaries
- Accessible focus states and ARIA labels

## Build

```bash
npm run build
npm run preview
```
