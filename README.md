# TropiTech Admin Dashboard

A modern admin dashboard built with Next.js, Supabase, and Tailwind CSS for managing construction companies and their subscriptions.

## Features

- **Real-time Dashboard**: View live statistics from your Supabase database
- **Company Management**: Manage construction companies and their details
- **User Management**: Handle user profiles and roles
- **Subscription Tracking**: Monitor billing and subscription status
- **Feature Flags**: Control feature rollouts per company
- **System Logs**: Track platform activity and user actions
- **TropiBrain Insights**: AI-powered feature suggestions

## Database Schema

The dashboard connects to the following Supabase tables:

- `companies` - Construction company information
- `profiles` - User profiles and roles
- `subscriptions` - Billing and subscription data
- `feature_flags` - Feature control per company
- `system_logs` - Platform activity tracking
- `tropibrain_insights` - AI-generated feature suggestions

## Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase project with the required tables
- Environment variables configured

### Environment Variables

Create a `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Seed the database with sample data:
```bash
npm run seed
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Dashboard Features

### Statistics Cards
- **Total Users**: Count of active user profiles
- **Active Companies**: Number of companies with 'active' status
- **Monthly Revenue**: Sum of active subscription amounts
- **Active Features**: Count of enabled feature flags

### Recent Activity
- Real-time system logs from user actions
- Company registrations and updates
- Subscription changes and upgrades

### Recent Companies
- Latest registered companies
- Company status indicators
- Registration timestamps

## Database Seeding

The seeding script (`scripts/seed-data.ts`) creates sample data including:

- 5 construction companies with different subscription plans
- 4 user profiles with various roles
- Active subscriptions with different pricing tiers
- Feature flags for different companies
- System logs showing platform activity
- TropiBrain insights for feature suggestions

To run the seeding script:

```bash
npm run seed
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Project Structure

```
my-project/
├── app/
│   └── (admin)/
│       └── dashboard/          # Main dashboard page
├── components/
│   ├── ui/                     # Reusable UI components
│   └── admin-layout.tsx        # Admin layout wrapper
├── utils/
│   └── supabase/              # Supabase client utilities
├── types/
│   └── database.ts            # Database type definitions
└── scripts/
    └── seed-data.ts           # Database seeding script
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
