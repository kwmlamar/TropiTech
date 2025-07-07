# 🚀 TropiTech CRM Setup Guide

This guide will help you set up the complete TropiTech CRM system with database, UI, and integrations.

## 📋 Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Supabase account and project
- TropiTrack database access (for data sync)

## 🔧 Environment Setup

1. **Copy environment variables:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your environment variables:**
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # TropiTrack Integration
   TROPITRACK_DATABASE_URL=your_tropitrack_database_url
   TROPITRACK_API_KEY=your_tropitrack_api_key
   
   # TropiBrain Integration
   TROPIBRAIN_API_URL=your_tropibrain_api_url
   TROPIBRAIN_API_KEY=your_tropibrain_api_key
   ```

## 🗄️ Database Setup

### Option 1: Automated Setup (Recommended)

Run the complete setup script:

```bash
pnpm setup:crm
```

This will:
- Create all CRM tables
- Set up indexes and triggers
- Configure RLS policies
- Seed with sample data

### Option 2: Manual Setup

1. **Create tables:**
   ```bash
   pnpm db:create
   ```

2. **Seed data:**
   ```bash
   pnpm db:seed
   ```

## 🏃‍♂️ Running the Application

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start development server:**
   ```bash
   pnpm dev
   ```

3. **Access the CRM:**
   - Main app: http://localhost:3000
   - Admin panel: http://localhost:3000/admin
   - Leads page: http://localhost:3000/admin/leads

## 📊 Database Schema Overview

### Core Tables
- **leads** - Lead management and tracking
- **deals** - Sales pipeline management
- **contacts** - Contact information
- **companies** - Company profiles
- **activities** - Activity tracking
- **tasks** - Task management

### Integration Tables
- **app_trials** - Trial management
- **lead_metrics** - Analytics data
- **lead_sources** - Lead source tracking
- **lead_activities** - Lead activity history

### Views
- **dashboard_summary** - Dashboard metrics
- **lead_summary** - Lead analytics
- **deal_summary** - Deal analytics

## 🔄 Data Integration

### TropiTrack Integration
The CRM automatically syncs data from TropiTrack:
- Lead information
- Trial data
- Usage metrics
- Conversion tracking

### TropiBrain Integration
AI-powered features:
- Lead scoring
- Predictive analytics
- Automated insights
- Smart recommendations

## 🎯 Features

### Lead Management
- ✅ Real-time lead tracking
- ✅ Stage progression
- ✅ Activity logging
- ✅ Trial management
- ✅ Conversion tracking

### Dashboard Analytics
- ✅ Lead metrics
- ✅ Conversion rates
- ✅ Trial statistics
- ✅ Revenue tracking

### User Management
- ✅ Role-based access
- ✅ Team assignments
- ✅ Activity tracking
- ✅ Performance metrics

## 🛠️ Development

### Database Functions
All database operations are handled through:
- `lib/crm-database.ts` - Database client and functions
- `hooks/use-crm.ts` - React hooks for state management

### Adding New Features
1. Add database functions to `crm-database.ts`
2. Create React hooks in `use-crm.ts`
3. Update UI components
4. Add to admin sidebar

### Database Migrations
To modify the schema:
1. Update `scripts/create-complete-crm-tables.sql`
2. Run `pnpm setup:crm` to apply changes
3. Update TypeScript types if needed

## 🔍 Troubleshooting

### Common Issues

**Database connection errors:**
- Verify Supabase credentials
- Check environment variables
- Ensure RLS policies are configured

**Data not loading:**
- Check browser console for errors
- Verify database permissions
- Ensure tables exist and have data

**Build errors:**
- Run `pnpm lint` to check for issues
- Verify TypeScript types
- Check import paths

### Debug Commands

```bash
# Check database connection
pnpm setup:crm

# View database logs
# Check Supabase dashboard

# Reset database
# Drop and recreate tables in Supabase
```

## 📈 Next Steps

1. **Customize the UI** - Modify components to match your brand
2. **Add more features** - Implement deals, contacts, and activities pages
3. **Set up integrations** - Connect with email, calendar, and other tools
4. **Configure analytics** - Set up advanced reporting
5. **Deploy to production** - Deploy to Vercel or your preferred platform

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the database schema
3. Check the Supabase dashboard
4. Contact the development team

---

**🎉 Congratulations!** Your TropiTech CRM is now set up and ready to use! 