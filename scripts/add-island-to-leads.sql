-- Add island column to leads table
-- This migration adds the island field to existing leads tables

-- Add island column if it doesn't exist
ALTER TABLE leads ADD COLUMN IF NOT EXISTS island VARCHAR(100);

-- Add index for island column
CREATE INDEX IF NOT EXISTS idx_leads_island ON leads(island);

-- Update the updated_at trigger to include the new column
-- (This is handled by the existing trigger, no changes needed)

-- Add comment for documentation
COMMENT ON COLUMN leads.island IS 'Island location in the Bahamas for the lead'; 