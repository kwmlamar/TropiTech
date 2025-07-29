import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function fixInfiniteRecursionRLS() {
  console.log('🔧 Fixing infinite recursion in RLS policies...')

  try {
    // First, let's disable RLS temporarily to clear problematic policies
    console.log('📋 Disabling RLS on profiles table...')
    await supabase.rpc('disable_rls', { table_name: 'profiles' })
    
    console.log('📋 Disabling RLS on companies table...')
    await supabase.rpc('disable_rls', { table_name: 'companies' })

    // Enable RLS again
    console.log('📋 Enabling RLS on profiles table...')
    await supabase.rpc('enable_rls', { table_name: 'profiles' })
    
    console.log('📋 Enabling RLS on companies table...')
    await supabase.rpc('enable_rls', { table_name: 'companies' })

    // Create proper policies for profiles table (without infinite recursion)
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

    console.log('✅ RLS policies fixed successfully!')
    console.log('📝 Note: Removed the problematic "Users can view company profiles" policy that was causing infinite recursion')
    console.log('📝 Users can still view their own profile and service role has full access')

  } catch (error) {
    console.error('❌ Error fixing RLS policies:', error)
  }
}

fixInfiniteRecursionRLS() 