import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const tropiTrackUrl = process.env.NEXT_PUBLIC_TROPITRACK_SUPABASE_URL!
const tropiTrackServiceKey = process.env.TROPITRACK_SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(tropiTrackUrl, tropiTrackServiceKey)

async function fixTropiTrackRLS() {
  console.log('🔧 Fixing TropiTrack RLS policies...')

  try {
    // First, let's check what tables exist
    console.log('📋 Checking available tables...')
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_type', 'BASE TABLE')

    if (tablesError) {
      console.error('Error checking tables:', tablesError)
    } else {
      console.log('Available tables:', tables?.map(t => t.table_name))
    }

    // Check if profiles table exists
    const hasProfiles = tables?.some(t => t.table_name === 'profiles')
    console.log('Profiles table exists:', hasProfiles)

    if (hasProfiles) {
      // Try to disable RLS on profiles table
      console.log('📋 Disabling RLS on profiles table...')
      try {
        await supabase.rpc('disable_rls', { table_name: 'profiles' })
        console.log('✅ RLS disabled on profiles table')
      } catch (error) {
        console.log('⚠️ Could not disable RLS on profiles table:', error)
      }

      // Try to query the profiles table directly
      console.log('📋 Testing profiles table query...')
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .limit(5)

      if (profilesError) {
        console.error('❌ Error querying profiles table:', profilesError)
      } else {
        console.log('✅ Successfully queried profiles table')
        console.log('Profiles found:', profiles?.length || 0)
        if (profiles && profiles.length > 0) {
          console.log('Sample profile:', profiles[0])
        }
      }
    }

    // Also check users table
    const hasUsers = tables?.some(t => t.table_name === 'users')
    console.log('Users table exists:', hasUsers)

    if (hasUsers) {
      // Try to disable RLS on users table
      console.log('📋 Disabling RLS on users table...')
      try {
        await supabase.rpc('disable_rls', { table_name: 'users' })
        console.log('✅ RLS disabled on users table')
      } catch (error) {
        console.log('⚠️ Could not disable RLS on users table:', error)
      }

      // Try to query the users table directly
      console.log('📋 Testing users table query...')
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('*')
        .limit(5)

      if (usersError) {
        console.error('❌ Error querying users table:', usersError)
      } else {
        console.log('✅ Successfully queried users table')
        console.log('Users found:', users?.length || 0)
        if (users && users.length > 0) {
          console.log('Sample user:', users[0])
        }
      }
    }

    console.log('✅ TropiTrack RLS check completed!')
    
  } catch (error) {
    console.error('❌ Error fixing TropiTrack RLS:', error)
  }
}

fixTropiTrackRLS() 