# Tilo Agency - Full Rebrand System

A modern digital agency website built with Next.js 14+ featuring automated content migration, beautiful frontend design, and a private admin system with LowDB backend.

## 🎨 Features

- ✅ **Automated Content Extraction** - Fetch content from external sites using axios and cheerio
- ✅ **AI-Powered Rebranding** - Transform content to match agency branding
- ✅ **Premium Agency UI** - Modern, glassmorphism design with Sky Blue theme
- ✅ **Admin Inbox System** - Private admin panel to manage contact form submissions
- ✅ **JSON CMS Backend** - LowDB for lightweight, file-based data storage
- ✅ **Fully Responsive** - Mobile-first design with hamburger navigation

## 🧱 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Database**: LowDB (JSON-based)
- **Email**: Nodemailer integration
- **Content Processing**: Axios + Cheerio for web scraping
- **Build Tool**: Turbopack

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ubirdi1997-debug/TiloAgency-.git
cd TiloAgency-
```

2. Install dependencies:
```bash
npm install
```

3. Run the content setup (fetch and rebrand):
```bash
npm run setup-content
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run fetch-content` - Fetch raw content from external site
- `npm run rebrand-content` - Transform raw content to agency branding
- `npm run setup-content` - Run both fetch and rebrand scripts

## 📂 Project Structure

```
TiloAgency-/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── contact/          # Contact form endpoint
│   │   └── admin/            # Admin panel endpoints
│   ├── admin/                # Admin panel page
│   ├── contact/              # Contact page
│   ├── rules/                # Terms & policies page
│   ├── services/             # Services page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── Navbar.tsx            # Navigation with hamburger menu
│   └── Footer.tsx            # Footer component
├── data/                     # Data storage
│   ├── rawContent.json       # Fetched raw content
│   ├── content.json          # Rebranded content
│   └── db.json              # LowDB database
├── lib/                      # Utility functions
│   ├── content.ts            # Content loader
│   └── db.ts                # Database helper
├── scripts/                  # Node.js scripts
│   ├── fetchSiteContent.js   # Content fetcher
│   └── rebrandContent.js     # Content rebrander
├── public/                   # Static assets
└── package.json
```

## 🌐 Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage with hero, services, and CTA |
| `/services` | Detailed services page |
| `/rules` | Terms & policies |
| `/contact` | Contact form |
| `/admin` | Admin panel (password: `admin123`) |

## 🎨 Design Features

- **Glassmorphism Cards** - Modern frosted glass effect
- **Sky Blue Theme** - Professional color palette
- **Smooth Animations** - Hover effects and transitions
- **Responsive Navigation** - Hamburger menu on mobile
- **Large Typography** - Modern, readable font sizes
- **Gradient Backgrounds** - Subtle color transitions

## 🔧 Content Processing Workflow

1. **Fetch Content** (`scripts/fetchSiteContent.js`)
   - Extracts h1, h2, h3 headings
   - Collects paragraphs and list items
   - Captures image URLs
   - Cleans whitespace and removes scripts
   - Outputs to `data/rawContent.json`

2. **Rebrand Content** (`scripts/rebrandContent.js`)
   - Replaces brand references
   - Converts streaming language to agency terminology
   - Shortens long paragraphs
   - Creates structured hero content
   - Outputs to `data/content.json`

## 🔒 Admin Panel

Access the admin panel at `/admin` with password: `admin123`

**Features:**
- View all contact form submissions
- Mark messages as read
- Delete messages
- Reply via email (opens email client)

## 📧 Contact Form

The contact form at `/contact` saves submissions to the LowDB database:
- Name, email, subject, and message fields
- Real-time validation
- Success/error feedback
- Integrates with admin panel

## 🎯 Environment Notes

- **Content Source**: The system is designed to fetch from `vikoofficial.com` but includes fallback mock data
- **Database**: LowDB creates a JSON file at `data/db.json`
- **Admin Password**: Set in `app/admin/page.tsx` (currently: `admin123`)

## 🔐 Security Considerations

⚠️ **For Production Use:**
- Implement proper authentication (e.g., NextAuth.js)
- Use environment variables for sensitive data
- Add CSRF protection
- Implement rate limiting on API routes
- Use a proper database (PostgreSQL, MongoDB, etc.)

## 📱 Mobile Optimization

- Responsive navbar with hamburger menu
- Mobile-optimized card layouts
- Reduced padding on small screens
- Touch-friendly buttons
- Smooth transitions

## 🎨 Customization

### Change Theme Color
Edit `tailwind.config.ts` to modify the color palette:
```typescript
colors: {
  'sky-blue': {
    // Your custom colors here
  }
}
```

### Update Site Name
Modify `data/content.json`:
```json
{
  "site": {
    "name": "Your Agency Name",
    "domain": "yourdomain.com"
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the ISC License.

## 👨‍💻 Author

Created as part of the Tilo Agency rebrand system project.

---

**Built with ❤️ using Next.js and modern web technologies**