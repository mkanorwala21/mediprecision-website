# MediPrecision Website

Complete React + TypeScript + Supabase medical equipment manufacturer website.

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Supabase (backend/database)
- React Router DOM (routing)
- React Hook Form + Zod (forms)
- React Hot Toast (notifications)
- Lucide React (icons)

## Getting Started

### Prerequisites
- Node.js 18+
- A Supabase account and project

### Setup

1. Clone the repository:
```bash
git clone https://github.com/mkanorwala21/mediprecision-website.git
cd mediprecision-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your actual Supabase credentials.

4. Set up Supabase database tables:

Run the following SQL in your Supabase SQL editor:

```sql
-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  features TEXT[],
  specifications JSONB,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table  
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enquiries table
CREATE TABLE enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  product_interest TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

5. Start the development server:
```bash
npm run dev
```

## Pages

- `/` - Home page
- `/about` - About MediPrecision
- `/products` - Product catalog
- `/products/:slug` - Product detail
- `/quality` - Quality & certifications
- `/oem` - OEM services
- `/contact` - Contact form
- `/admin` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/products` - Manage products
- `/admin/categories` - Manage categories
- `/admin/enquiries` - View enquiries

## Admin Login

Default credentials (change in .env):
- Username: `admin`
- Password: `admin123`

## Build

```bash
npm run build
```

Output will be in the `dist/` folder.