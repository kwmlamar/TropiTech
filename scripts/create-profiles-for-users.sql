-- Create Profiles for Existing Authenticated Users
-- This script creates profiles for users who have signed up but don't have profile records

-- ============================================================================
-- CREATE PROFILES TABLE (if it doesn't exist)
-- ============================================================================

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    role user_role DEFAULT 'user',
    department VARCHAR(100),
    manager_id UUID REFERENCES profiles(id),
    quota DECIMAL(15,2),
    commission_rate DECIMAL(5,2),
    is_active BOOLEAN DEFAULT true,
    company_id UUID REFERENCES companies(id),
    island VARCHAR(100),
    address TEXT,
    bio TEXT,
    preferences JSONB DEFAULT '{}',
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to existing profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'user';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS department VARCHAR(100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS manager_id UUID REFERENCES profiles(id);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS quota DECIMAL(15,2);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS commission_rate DECIMAL(5,2);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS island VARCHAR(100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

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
    'user'::user_role as role,
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
CREATE INDEX IF NOT EXISTS idx_profiles_company_id ON profiles(company_id);
CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_profiles_last_login_at ON profiles(last_login_at);

-- ============================================================================
-- SET UP ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Admins can view all profiles (adjust role as needed)
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
-- CREATE VIEW FOR USER SUMMARY
-- ============================================================================

CREATE OR REPLACE VIEW user_summary AS
SELECT 
    p.id,
    p.user_id,
    p.email,
    p.full_name,
    p.first_name,
    p.last_name,
    p.role,
    p.department,
    p.is_active,
    p.company_id,
    c.name as company_name,
    p.island,
    p.last_login_at,
    p.created_at,
    p.updated_at,
    CASE 
        WHEN p.last_login_at > NOW() - INTERVAL '7 days' THEN 'active'
        WHEN p.last_login_at > NOW() - INTERVAL '30 days' THEN 'recent'
        ELSE 'inactive'
    END as activity_status
FROM profiles p
LEFT JOIN companies c ON p.company_id = c.id;

-- ============================================================================
-- SAMPLE DATA FOR TESTING (OPTIONAL)
-- ============================================================================

-- Insert sample admin user if no users exist
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
    au.id,
    au.email,
    'Admin User',
    'Admin',
    'User',
    'admin'::user_role,
    true,
    NOW(),
    NOW()
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.user_id
WHERE p.user_id IS NULL 
  AND au.email LIKE '%admin%'
LIMIT 1;

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
    'Profiles by role: ' || role as metric,
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
-- CLEANUP (OPTIONAL - RUN ONLY IF NEEDED)
-- ============================================================================

-- Remove any duplicate profiles (if any exist)
-- DELETE FROM profiles 
-- WHERE id NOT IN (
--     SELECT MIN(id) 
--     FROM profiles 
--     GROUP BY user_id
-- );

-- ============================================================================
-- NOTES
-- ============================================================================

/*
This script will:

1. Create the profiles table if it doesn't exist
2. Insert profile records for all authenticated users who don't have profiles
3. Update existing profiles with missing data
4. Set up proper indexes for performance
5. Configure Row Level Security (RLS) policies
6. Create triggers for automatic updated_at timestamps
7. Create a user summary view
8. Provide verification queries to check the results

To run this script:

1. Connect to your Supabase database
2. Run this entire script
3. Check the verification queries at the end to see the results

The script is safe to run multiple times - it won't create duplicate profiles.
*/ 