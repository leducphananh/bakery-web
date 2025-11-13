# 🧁 Milove Bakery Website

A modern, beautiful bakery website built with Next.js, featuring a sweet pink aesthetic and smooth animations.

## ✨ Features

- 🎨 **Beautiful Design**: Pink-themed UI with gradient backgrounds and smooth animations
- 🖼️ **Optimized Images**: Using Next.js Image component with Unsplash integration
- 🎭 **Custom Fonts**: Pacifico for headings and Poppins for body text via next/font
- 📱 **Responsive Design**: Mobile-friendly layout with Tailwind CSS v4
- 🧩 **UI Components**: Built with Radix UI primitives and shadcn/ui components
- 🎯 **TypeScript**: Fully typed for better development experience
- 🌙 **Dark Mode Support**: Built-in dark mode capabilities

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd bakery-web
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **UI Components**: [Radix UI](https://radix-ui.com), [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Fonts**: [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with Google Fonts
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Code Quality**: ESLint, Prettier

## 📦 Key Dependencies

- `next` - React framework
- `react` & `react-dom` - UI library
- `tailwindcss` - Utility-first CSS framework
- `@radix-ui/*` - Unstyled, accessible UI components
- `lucide-react` - Icon library
- `react-hook-form` - Form handling
- `recharts` - Chart library
- `sonner` - Toast notifications
- `next-themes` - Theme management

## 🎨 Customization

### Colors

The color scheme is defined in `app/globals.css` using CSS custom properties. Main colors:

- Pink accent: `#FFB5C5`
- Brown text: `#8B5A3C`
- Cream background: `#FFF5E6` to `#FFE9F0`

### Fonts

Fonts are configured in `app/layout.tsx`:

- **Pacifico**: Decorative font for headings and logo
- **Poppins**: Clean sans-serif for body text

Use Tailwind classes:

- `font-pacifico` for headings
- `font-poppins` or default for body text

## 📄 Project Structure

```
bakery-web/
├── app/
│   ├── components/
│   │   ├── figma/          # Image components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ProductCard.tsx
│   │   └── ReviewCard.tsx
│   ├── globals.css         # Global styles & theme
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🖼️ Image Configuration

External image domains are configured in `next.config.ts`:

- `images.unsplash.com` - Product and hero images
- `i.pravatar.cc` - Avatar images

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

You can also deploy to:

- Netlify
- Railway
- AWS Amplify
- Digital Ocean

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from modern bakery websites
- Images from [Unsplash](https://unsplash.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

Made with ❤️ for bakery lovers
