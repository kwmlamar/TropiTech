# Leads Tables SQL Scripts

This directory contains SQL scripts to create and populate the necessary tables for the leads page functionality in TropiTech CRM.

## Files Overview

### 1. `create-leads-tables.sql`
**Purpose**: Creates all necessary database tables for the leads functionality.

**What it creates**:
- **leads** - Main leads table with company information, status, and TropiTrack integration
- **lead_activities** - Activities and notes for each lead
- **lead_stage_history** - History of lead stage changes for tracking progression
- **lead_sources** - Available lead sources (Website, Referral, Social Media, etc.)
- **lead_response_logs** - Response time tracking for leads
- **app_trials** - App trial tracking for TropiTrack integration
- **lead_metrics** - Aggregated lead metrics for reporting

**Key Features**:
- Row Level Security (RLS) policies for data protection
- Automatic `updated_at` triggers
- Indexes for optimal performance
- Views for easier data access
- Enum types for status, source, priority, and trial status

### 2. `sync-tropitrack-leads.sql`
**Purpose**: Syncs data from TropiTrack database to populate the leads tables.

**Functions included**:
- `sync_tropitrack_clients_to_leads()` - Imports TropiTrack clients as leads
- `sync_tropitrack_trials()` - Syncs TropiTrack trial data
- `update_lead_metrics_from_tropitrack()` - Updates usage metrics from TropiTrack
- `calculate_lead_metrics()` - Calculates daily lead metrics
- `calculate_avg_response_time()` - Calculates average response times

**Integration Points**:
- Pulls client data from TropiTrack database
- Syncs subscription/trial information
- Updates usage metrics (users, projects, time entries)
- Maintains data consistency between systems

### 3. `seed-leads-data.sql`
**Purpose**: Populates tables with realistic sample data for testing and development.

**Sample Data Includes**:
- 15 sample leads with various statuses
- App trial data matching the UI display
- Lead activities and stage history
- Response time logs
- 30 days of lead metrics
- Realistic company names and contact information

## Installation Instructions

### Step 1: Create the Tables
```sql
-- Run the table creation script
\i create-leads-tables.sql
```

### Step 2: Seed with Sample Data (Optional)
```sql
-- Populate with sample data for testing
\i seed-leads-data.sql
```

### Step 3: Sync TropiTrack Data (When Ready)
```sql
-- Enable TropiTrack integration
\i sync-tropitrack-leads.sql

-- Run sync functions (uncomment when ready)
-- SELECT sync_tropitrack_clients_to_leads();
-- SELECT sync_tropitrack_trials();
-- SELECT update_lead_metrics_from_tropitrack();
-- SELECT calculate_lead_metrics();
```

## Database Schema

### Main Tables

#### `leads`
Core leads table with company information and status tracking.

**Key Fields**:
- `company_name`, `contact_name`, `email`, `phone`
- `status` (new, contacted, qualified, app_interested, demo_scheduled, trial_active, app_converted, etc.)
- `source` (website, referral, social_media, events, etc.)
- `estimated_value`, `currency`
- `tropitrack_client_id` - Links to TropiTrack client
- `interested_apps` - Array of apps they're interested in
- `trial_start_date`, `trial_end_date`, `trial_status`

#### `app_trials`
Tracks app trials for leads, especially TropiTrack integration.

**Key Fields**:
- `lead_id` - Links to leads table
- `app_name` - 'TropiTrack', 'TropiBrain', etc.
- `trial_start_date`, `trial_end_date`, `trial_status`
- `users_count`, `projects_count`, `time_entries_count` - Usage metrics
- `tropitrack_subscription_id` - Links to TropiTrack subscription

#### `lead_metrics`
Daily aggregated metrics for reporting and dashboards.

**Key Fields**:
- `date` - Daily metrics
- `total_leads`, `new_leads`, `converted_leads`
- `app_interested_count`, `demo_scheduled_count`, `trial_active_count`, `app_converted_count`
- `avg_response_time_minutes`, `conversion_rate`

## Integration with TropiTrack

The leads system integrates with TropiTrack in several ways:

1. **Client Import**: TropiTrack clients are imported as leads
2. **Trial Tracking**: TropiTrack trials are tracked in `app_trials` table
3. **Usage Metrics**: User count, project count, and time entries are synced
4. **Status Mapping**: TropiTrack client status maps to lead status

### TropiTrack Data Flow
```
TropiTrack Database → Sync Functions → Leads Tables → UI Display
```

## Views for Easy Data Access

### `lead_summary`
Combines lead data with activity counts and assigned user information.

### `app_trial_summary`
Shows trial information with calculated trial status.

### `lead_metrics_summary`
Daily metrics for reporting and dashboards.

## Sample Queries

### Get All Leads with Status
```sql
SELECT 
  company_name,
  status,
  source,
  estimated_value,
  created_at
FROM leads
ORDER BY created_at DESC;
```

### Get Trial Users
```sql
SELECT 
  l.company_name,
  at.trial_start_date,
  at.trial_end_date,
  at.trial_status,
  at.users_count,
  at.projects_count
FROM app_trials at
JOIN leads l ON at.lead_id = l.id
WHERE at.app_name = 'TropiTrack'
ORDER BY at.trial_end_date ASC;
```

### Get Lead Metrics for Today
```sql
SELECT 
  total_leads,
  new_leads,
  converted_leads,
  conversion_rate,
  app_interested_count,
  trial_active_count,
  app_converted_count
FROM lead_metrics
WHERE date = CURRENT_DATE;
```

### Get Lead Sources Breakdown
```sql
SELECT 
  source,
  COUNT(*) as lead_count,
  COUNT(*) FILTER (WHERE status IN ('won', 'app_converted')) as converted_count,
  ROUND(
    (COUNT(*) FILTER (WHERE status IN ('won', 'app_converted'))::DECIMAL / COUNT(*)::DECIMAL * 100, 2
  ) as conversion_rate
FROM leads
GROUP BY source
ORDER BY lead_count DESC;
```

## Security Features

### Row Level Security (RLS)
All tables have RLS enabled with policies that:
- Allow users to view leads from their company
- Allow users to insert leads for their company
- Allow users to update leads they created or are assigned to

### Data Protection
- UUID primary keys for security
- Timestamp tracking for audit trails
- Foreign key constraints for data integrity
- Automatic `updated_at` triggers

## Performance Optimizations

### Indexes
- Status, source, and assignment indexes for fast filtering
- Created date indexes for chronological queries
- TropiTrack integration indexes for sync operations

### Aggregated Metrics
- Daily metrics table for fast dashboard queries
- Pre-calculated conversion rates and response times
- Separate metrics table to avoid expensive aggregations

## Maintenance

### Regular Tasks
1. **Daily**: Run `calculate_lead_metrics()` to update daily metrics
2. **Weekly**: Run TropiTrack sync functions to keep data current
3. **Monthly**: Review and clean up old lead data

### Monitoring
- Monitor lead conversion rates
- Track response times
- Review trial conversion rates
- Analyze lead source effectiveness

## Troubleshooting

### Common Issues

1. **RLS Policy Errors**: Ensure user has proper company_id in profiles table
2. **TropiTrack Sync Failures**: Check TropiTrack database connectivity
3. **Performance Issues**: Verify indexes are created properly
4. **Data Consistency**: Run sync functions regularly

### Debug Queries
```sql
-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'leads';

-- Verify TropiTrack integration
SELECT COUNT(*) FROM leads WHERE tropitrack_client_id IS NOT NULL;

-- Check metrics calculation
SELECT * FROM lead_metrics WHERE date = CURRENT_DATE;
```

## Next Steps

1. **Integration**: Connect the leads page UI to these database tables
2. **Automation**: Set up scheduled jobs for TropiTrack sync
3. **Analytics**: Create additional views for advanced reporting
4. **API**: Build REST API endpoints for lead management
5. **Notifications**: Add alerts for trial expirations and follow-ups 