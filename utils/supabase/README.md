# TropiTrack Supabase Clients

This directory contains dedicated Supabase clients for the TropiTrack application within the TropiTech ecosystem.

## Files

- `tropitrack-client.ts` - Client-side Supabase client for TropiTrack
- `tropitrack-server.ts` - Server-side Supabase client for TropiTrack
- `client.ts` - Main TropiTech admin client
- `server.ts` - Main TropiTech admin server client

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# TropiTrack Supabase Configuration
NEXT_PUBLIC_TROPITRACK_SUPABASE_URL=your_tropitrack_supabase_url
NEXT_PUBLIC_TROPITRACK_SUPABASE_ANON_KEY=your_tropitrack_anon_key
TROPITRACK_SUPABASE_SERVICE_ROLE_KEY=your_tropitrack_service_role_key
```

## Usage

### Client-Side (React Components)

```typescript
import { tropiTrackClient, tropiTrackApi } from '@/utils/supabase/tropitrack-client'

// Use the client directly
const { data, error } = await tropiTrackClient
  .from('time_entries')
  .select('*')

// Use the API functions
const { data, error } = await tropiTrackApi.startTimeEntry(
  userId, 
  projectId, 
  taskId, 
  description
)
```

### Server-Side (Server Components & API Routes)

```typescript
import { tropiTrackServerApi } from '@/utils/supabase/tropitrack-server'

// In a server component or API route
const { data, error } = await tropiTrackServerApi.getTimeEntries(
  userId, 
  startDate, 
  endDate
)
```

## Available API Functions

### Time Tracking
- `startTimeEntry(userId, projectId, taskId?, description?)`
- `stopTimeEntry(entryId)`
- `getActiveTimeEntry(userId)`
- `getTimeEntries(userId, startDate?, endDate?)`

### Projects
- `getProjects(userId?)`
- `getProject(projectId)`

### Tasks
- `getTasks(projectId?)`

### Users
- `getUsers()`
- `getUser(userId)`

### Clients
- `getClients()`

### Reporting
- `getTimeReport(projectId?, startDate?, endDate?)`
- `getPayrollReport(userId?, startDate?, endDate?)`

### Admin Functions (Server Only)
- `getAllTimeEntries(startDate?, endDate?)`
- `getAllProjects()`
- `getAllUsers()`

## TypeScript Types

The clients include comprehensive TypeScript types for all TropiTrack entities:

- `TropiTrackTimeEntry`
- `TropiTrackProject`
- `TropiTrackTask`
- `TropiTrackUser`
- `TropiTrackClient`

## Database Schema

The TropiTrack client expects the following tables in your Supabase database:

- `time_entries` - Time tracking records
- `projects` - Construction projects
- `tasks` - Project tasks
- `users` - Team members
- `clients` - Client companies

## Security

- The client uses the anon key for user operations
- The server client includes a service role key for admin operations
- All functions include proper error handling
- Authentication is handled through Supabase Auth 