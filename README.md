# BEAM Science & Research Academy

A Next.js application connecting researchers, students, and supporters to accelerate scientific discovery and innovation across communities.

## Features

- **Research Project Database** - Browse and support cutting-edge scientific research projects
- **Science Hub Directory** - Connect with local universities, laboratories, and research centers
- **Classes & Workshops** - Educational opportunities mapped to community science nodes
- **Donation Platform** - Support equipment funding, student stipends, and lab initiatives via Stripe
- **Real-time Updates** - Live data synchronization using Supabase subscriptions
- **City-based Filtering** - Find science opportunities in your local area

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for donations)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd beam-science-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Set up Supabase database**
   
   Create the following tables in your Supabase database:

   **research_projects**
   ```sql
   CREATE TABLE research_projects (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     category TEXT NOT NULL,
     city TEXT NOT NULL,
     funding_goal INTEGER NOT NULL,
     current_funding INTEGER DEFAULT 0,
     researcher_name TEXT NOT NULL,
     status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'funded')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **science_hubs**
   ```sql
   CREATE TABLE science_hubs (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     city TEXT NOT NULL,
     type TEXT NOT NULL CHECK (type IN ('university', 'lab', 'research_center')),
     description TEXT NOT NULL,
     contact_email TEXT,
     website TEXT,
     latitude DECIMAL(10, 8),
     longitude DECIMAL(11, 8),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **class_workshops**
   ```sql
   CREATE TABLE class_workshops (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     instructor TEXT NOT NULL,
     city TEXT NOT NULL,
     start_date DATE NOT NULL,
     end_date DATE NOT NULL,
     max_participants INTEGER NOT NULL,
     current_participants INTEGER DEFAULT 0,
     price INTEGER NOT NULL,
     category TEXT NOT NULL,
     status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── classes/           # Classes & workshops page
│   ├── donate/            # Donation page
│   ├── hubs/              # Science hubs page
│   ├── projects/          # Research projects page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── lib/                   # Utility libraries
│   ├── supabase.ts        # Supabase client & types
│   └── stripe.ts          # Stripe configuration
├── public/                # Static assets
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
└── README.md              # This file
```

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Import your GitHub repository in Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Features in Detail

### Research Projects
- Real-time database with Supabase subscriptions
- City and category filtering
- Funding progress tracking
- Project status management

### Science Hubs
- Interactive directory of research institutions
- Location-based filtering
- Contact information and website links
- Type categorization (university, lab, research center)

### Classes & Workshops
- Community science node mapping
- Enrollment tracking
- Date and location filtering
- Participant capacity management

### Donation System
- Stripe integration for secure payments
- Predefined donation categories
- Custom amount support
- Impact tracking and reporting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the BEAM Science team or create an issue in this repository.

---

Built with ❤️ for the scientific community
