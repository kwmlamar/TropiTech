-- Add island column to contacts table
-- This migration adds the island field to existing contacts tables

-- Add island column if it doesn't exist
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS island VARCHAR(100);

-- Add index for island column
CREATE INDEX IF NOT EXISTS idx_contacts_island ON contacts(island);

-- Update the updated_at trigger to include the new column
-- (This is handled by the existing trigger, no changes needed)

-- Add comment for documentation
COMMENT ON COLUMN contacts.island IS 'Island location in the Bahamas for the contact'; 