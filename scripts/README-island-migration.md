# Island Migration for Leads Table

This migration adds an `island` column to the `leads` table to track which island in the Bahamas each lead is from.

## What the migration does:

1. Adds a `VARCHAR(100)` column called `island` to the `leads` table
2. Creates an index on the `island` column for better query performance
3. Adds a comment to document the column purpose
4. Tests the migration by inserting and then removing a test record

## How to run the migration:

### Option 1: Using npm script (Recommended)
```bash
npm run add:island
```

### Option 2: Direct execution
```bash
npx tsx scripts/add-island-to-leads-simple.ts
```

### Option 3: Manual SQL execution
If you have access to the Supabase dashboard, you can run the SQL directly:

```sql
-- Add island column if it doesn't exist
ALTER TABLE leads ADD COLUMN IF NOT EXISTS island VARCHAR(100);

-- Add index for island column for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_island ON leads(island);

-- Add comment for documentation
COMMENT ON COLUMN leads.island IS 'Island location in the Bahamas for the lead';
```

## Environment Variables Required:

Make sure you have these environment variables set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Expected Islands:

Common islands in the Bahamas that might be used:
- New Providence (Nassau)
- Grand Bahama
- Abaco
- Eleuthera
- Exuma
- Andros
- Bimini
- Long Island
- Cat Island
- San Salvador

## Verification:

After running the migration, you can verify it worked by:

1. Checking the database schema in Supabase dashboard
2. Running a query to see the new column:
   ```sql
   SELECT column_name, data_type, is_nullable 
   FROM information_schema.columns 
   WHERE table_name = 'leads' AND column_name = 'island';
   ```

## Rollback (if needed):

If you need to remove the island column:
```sql
ALTER TABLE leads DROP COLUMN IF EXISTS island;
DROP INDEX IF EXISTS idx_leads_island;
```

## Notes:

- The migration is idempotent (safe to run multiple times)
- Existing leads will have `NULL` for the island field
- You may want to update existing leads with default island values after the migration 