-- Add island column to leads table
-- This migration adds the island field to existing leads tables

-- Add island column if it doesn't exist
ALTER TABLE leads ADD COLUMN IF NOT EXISTS island VARCHAR(100);

-- Add index for island column for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_island ON leads(island);

-- Add comment for documentation
COMMENT ON COLUMN leads.island IS 'Island location in the Bahamas for the lead';

-- Update existing leads with default island if needed (optional)
-- UPDATE leads SET island = 'New Providence' WHERE island IS NULL;

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'leads' AND column_name = 'island'; 