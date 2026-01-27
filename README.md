# TiloAgency

Modern web solutions powered by Next.js with TypeScript and Tailwind CSS.

## Project Structure

```
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles with Tailwind and theme variables
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
├── components/         # Reusable React components
│   ├── Navbar.tsx     # Navigation bar component
│   └── Footer.tsx     # Footer component
├── data/              # Data storage (JSON files)
│   └── content.json   # Content data
├── scripts/           # Utility scripts
│   ├── fetch-content.js    # Script to fetch content
│   └── rebrand-content.js  # Script to rebrand content
└── public/            # Static assets (to be created as needed)
```

## Features

- ✅ Next.js 16+ with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS v4 with custom sky-blue theme
- ✅ Mobile-first responsive design
- ✅ Modular component architecture
- ✅ Clean, modern UI with Navbar and Footer

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run fetch-content` - Run content fetching script
- `npm run rebrand-content` - Run content rebranding script

## Dependencies

- **next** - React framework for production
- **react** & **react-dom** - React library
- **typescript** - TypeScript language
- **tailwindcss** - Utility-first CSS framework
- **axios** - HTTP client for API requests
- **cheerio** - HTML parsing and manipulation
- **lowdb** - Lightweight JSON database
- **nodemailer** - Email sending library

## Theme

The project uses a clean sky-blue color theme with CSS variables:

- Primary: `#87ceeb` (Sky Blue)
- Primary Dark: `#4a9bc9`
- Primary Light: `#b3e5fc`
- Accent: `#00bcd4`

## Design Principles

- Mobile-first responsive design
- Clean and modern UI
- Modular component architecture
- Accessibility-focused
- Performance optimized

## Next Steps

This project is set up with structure and configuration only. Content and additional features are ready to be added.
