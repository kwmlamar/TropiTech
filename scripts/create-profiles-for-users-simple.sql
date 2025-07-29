-- Create Profiles for Existing Authenticated Users (Simple Version)
-- This script handles existing profiles table and adds missing columns

-- ============================================================================
-- CHECK EXISTING TABLE STRUCTURE
-- ============================================================================

-- First, let's see what columns already exist in the profiles table
-- Run this query to see the current structure:
/*
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;
*/

-- ============================================================================
-- ADD MISSING COLUMNS (SAFE - WON'T FAIL IF COLUMNS EXIST)
-- ============================================================================

-- Add basic columns that are commonly missing
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add role column (if user_role type exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'user';
    ELSE
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';
    END IF;
END $$;

-- Add company-related columns (if companies table exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'companies') THEN
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_id UUID;
        -- Add foreign key constraint if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'profiles_company_id_fkey'
        ) THEN
            ALTER TABLE profiles ADD CONSTRAINT profiles_company_id_fkey 
            FOREIGN KEY (company_id) REFERENCES companies(id);
        END IF;
    END IF;
END $$;

-- Add other optional columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS department VARCHAR(100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS island VARCHAR(100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}';

-- ============================================================================
-- CREATE PROFILES FOR EXISTING AUTHENTICATED USERS
-- ============================================================================

-- Insert profiles for users who exist in auth.users but not in profiles
INSERT INTO profiles (
    user_id,
    email,
    full_name,
    first_name,
    last_name,
    role,
    is_active,
    created_at,
    updated_at
)
SELECT 
    au.id as user_id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', 
              au.raw_user_meta_data->>'name',
              au.email) as full_name,
    au.raw_user_meta_data->>'first_name' as first_name,
    au.raw_user_meta_data->>'last_name' as last_name,
    'user' as role,
    true as is_active,
    au.created_at,
    au.updated_at
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.user_id
WHERE p.user_id IS NULL
  AND au.email IS NOT NULL
  AND au.confirmed_at IS NOT NULL; -- Only confirmed users

-- ============================================================================
-- UPDATE EXISTING PROFILES WITH MISSING DATA
-- ============================================================================

-- Update profiles with missing full_name if we have first_name and last_name
UPDATE profiles 
SET full_name = CONCAT(first_name, ' ', last_name)
WHERE full_name IS NULL 
  AND first_name IS NOT NULL 
  AND last_name IS NOT NULL;

-- Update profiles with email from auth.users if missing
UPDATE profiles p
SET email = au.email
FROM auth.users au
WHERE p.user_id = au.id 
  AND p.email IS NULL 
  AND au.email IS NOT NULL;

-- ============================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_profiles_last_login_at ON profiles(last_login_at);

-- Add company_id index if the column exists
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'company_id') THEN
        CREATE INDEX IF NOT EXISTS idx_profiles_company_id ON profiles(company_id);
    END IF;
END $$;

-- ============================================================================
-- SET UP ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

-- Policy: Admins can update all profiles
CREATE POLICY "Admins can update all profiles" ON profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

-- ============================================================================
-- CREATE TRIGGER FOR UPDATED_AT
-- ============================================================================

-- Create trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_profiles_updated_at();

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check how many profiles were created
SELECT 
    'Profiles created' as metric,
    COUNT(*) as count
FROM profiles 
WHERE created_at >= NOW() - INTERVAL '1 hour'

UNION ALL

-- Check total profiles
SELECT 
    'Total profiles' as metric,
    COUNT(*) as count
FROM profiles

UNION ALL

-- Check profiles by role
SELECT 
    'Profiles by role: ' || COALESCE(role, 'unknown') as metric,
    COUNT(*) as count
FROM profiles 
GROUP BY role

UNION ALL

-- Check active vs inactive users
SELECT 
    'Active users' as metric,
    COUNT(*) as count
FROM profiles 
WHERE is_active = true

UNION ALL

SELECT 
    'Inactive users' as metric,
    COUNT(*) as count
FROM profiles 
WHERE is_active = false;

-- ============================================================================
-- SHOW CURRENT TABLE STRUCTURE
-- ============================================================================

-- Run this to see the final table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position; 