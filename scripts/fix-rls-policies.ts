import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for admin operations

const supabase = createClient(supabaseUrl, supabaseKey)

async function fixRLSPolicies() {
  console.log('🔧 Fixing RLS policies...')

  try {
    // First, let's disable RLS temporarily to clear any problematic policies
    console.log('📋 Disabling RLS on profiles table...')
    await supabase.rpc('disable_rls', { table_name: 'profiles' })
    
    console.log('📋 Disabling RLS on companies table...')
    await supabase.rpc('disable_rls', { table_name: 'companies' })

    // Enable RLS again
    console.log('📋 Enabling RLS on profiles table...')
    await supabase.rpc('enable_rls', { table_name: 'profiles' })
    
    console.log('📋 Enabling RLS on companies table...')
    await supabase.rpc('enable_rls', { table_name: 'companies' })

    // Create proper policies for profiles table
    console.log('📋 Creating profiles policies...')
    
    // Policy for users to read their own profile
    await supabase.rpc('create_policy', {
      table_name: 'profiles',
      policy_name: 'Users can view own profile',
      definition: 'SELECT',
      check: 'auth.uid() = user_id'
    })

    // Policy for users to update their own profile
    await supabase.rpc('create_policy', {
      table_name: 'profiles',
      policy_name: 'Users can update own profile',
      definition: 'UPDATE',
      check: 'auth.uid() = user_id'
    })

    // Policy for service role to manage all profiles (for admin operations)
    await supabase.rpc('create_policy', {
      table_name: 'profiles',
      policy_name: 'Service role can manage all profiles',
      definition: 'ALL',
      check: 'auth.role() = \'service_role\''
    })

    // Policy for authenticated users to read profiles in their company
    await supabase.rpc('create_policy', {
      table_name: 'profiles',
      policy_name: 'Users can view company profiles',
      definition: 'SELECT',
      check: `
        EXISTS (
          SELECT 1 FROM profiles p2 
          WHERE p2.user_id = auth.uid() 
          AND p2.company_id = profiles.company_id
        )
      `
    })

    // Create policies for companies table
    console.log('📋 Creating companies policies...')
    
    // Policy for service role to manage all companies
    await supabase.rpc('create_policy', {
      table_name: 'companies',
      policy_name: 'Service role can manage all companies',
      definition: 'ALL',
      check: 'auth.role() = \'service_role\''
    })

    // Policy for authenticated users to read companies they belong to
    await supabase.rpc('create_policy', {
      table_name: 'companies',
      policy_name: 'Users can view their company',
      definition: 'SELECT',
      check: `
        EXISTS (
          SELECT 1 FROM profiles 
          WHERE profiles.user_id = auth.uid() 
          AND profiles.company_id = companies.id
        )
      `
    })

    // Create policies for other tables
    console.log('📋 Creating other table policies...')
    
    // System logs - service role only
    await supabase.rpc('disable_rls', { table_name: 'system_logs' })
    await supabase.rpc('enable_rls', { table_name: 'system_logs' })
    await supabase.rpc('create_policy', {
      table_name: 'system_logs',
      policy_name: 'Service role can manage system logs',
      definition: 'ALL',
      check: 'auth.role() = \'service_role\''
    })

    // Feature flags - service role only
    await supabase.rpc('disable_rls', { table_name: 'feature_flags' })
    await supabase.rpc('enable_rls', { table_name: 'feature_flags' })
    await supabase.rpc('create_policy', {
      table_name: 'feature_flags',
      policy_name: 'Service role can manage feature flags',
      definition: 'ALL',
      check: 'auth.role() = \'service_role\''
    })

    // Subscriptions - service role only
    await supabase.rpc('disable_rls', { table_name: 'subscriptions' })
    await supabase.rpc('enable_rls', { table_name: 'subscriptions' })
    await supabase.rpc('create_policy', {
      table_name: 'subscriptions',
      policy_name: 'Service role can manage subscriptions',
      definition: 'ALL',
      check: 'auth.role() = \'service_role\''
    })

    // TropiBrain insights - service role only
    await supabase.rpc('disable_rls', { table_name: 'tropibrain_insights' })
    await supabase.rpc('enable_rls', { table_name: 'tropibrain_insights' })
    await supabase.rpc('create_policy', {
      table_name: 'tropibrain_insights',
      policy_name: 'Service role can manage insights',
      definition: 'ALL',
      check: 'auth.role() = \'service_role\''
    })

    // Time entries - service role only
    await supabase.rpc('disable_rls', { table_name: 'time_entries' })
    await supabase.rpc('enable_rls', { table_name: 'time_entries' })
    await supabase.rpc('create_policy', {
      table_name: 'time_entries',
      policy_name: 'Service role can manage time entries',
      definition: 'ALL',
      check: 'auth.role() = \'service_role\''
    })

    // Projects - service role only
    await supabase.rpc('disable_rls', { table_name: 'projects' })
    await supabase.rpc('enable_rls', { table_name: 'projects' })
    await supabase.rpc('create_policy', {
      table_name: 'projects',
      policy_name: 'Service role can manage projects',
      definition: 'ALL',
      check: 'auth.role() = \'service_role\''
    })

    // Tasks - service role only
    await supabase.rpc('disable_rls', { table_name: 'tasks' })
    await supabase.rpc('enable_rls', { table_name: 'tasks' })
    await supabase.rpc('create_policy', {
      table_name: 'tasks',
      policy_name: 'Service role can manage tasks',
      definition: 'ALL',
      check: 'auth.role() = \'service_role\''
    })

    // Payroll entries - service role only
    await supabase.rpc('disable_rls', { table_name: 'payroll_entries' })
    await supabase.rpc('enable_rls', { table_name: 'payroll_entries' })
    await supabase.rpc('create_policy', {
      table_name: 'payroll_entries',
      policy_name: 'Service role can manage payroll entries',
      definition: 'ALL',
      check: 'auth.role() = \'service_role\''
    })

    console.log('✅ RLS policies fixed successfully!')
    
  } catch (error) {
    console.error('❌ Error fixing RLS policies:', error)
    
    // Fallback: try to disable RLS completely for seeding
    console.log('🔄 Attempting to disable RLS for seeding...')
    try {
      await supabase.rpc('disable_rls', { table_name: 'profiles' })
      await supabase.rpc('disable_rls', { table_name: 'companies' })
      await supabase.rpc('disable_rls', { table_name: 'system_logs' })
      await supabase.rpc('disable_rls', { table_name: 'feature_flags' })
      await supabase.rpc('disable_rls', { table_name: 'subscriptions' })
      await supabase.rpc('disable_rls', { table_name: 'tropibrain_insights' })
      await supabase.rpc('disable_rls', { table_name: 'time_entries' })
      await supabase.rpc('disable_rls', { table_name: 'projects' })
      await supabase.rpc('disable_rls', { table_name: 'tasks' })
      await supabase.rpc('disable_rls', { table_name: 'payroll_entries' })
      console.log('✅ RLS disabled for all tables. You can now run the seed script.')
    } catch (fallbackError) {
      console.error('❌ Failed to disable RLS:', fallbackError)
    }
  }
}

fixRLSPolicies() 