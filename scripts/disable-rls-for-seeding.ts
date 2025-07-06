import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function disableRLSForSeeding() {
  console.log('🔧 Disabling RLS for seeding...')

  const tables = [
    'profiles',
    'companies', 
    'system_logs',
    'feature_flags',
    'subscriptions',
    'tropibrain_insights',
    'time_entries',
    'projects',
    'tasks',
    'payroll_entries'
  ]

  for (const table of tables) {
    try {
      console.log(`📋 Disabling RLS on ${table} table...`)
      await supabase.rpc('disable_rls', { table_name: table })
      console.log(`✅ RLS disabled on ${table}`)
    } catch (error) {
      console.log(`⚠️  Could not disable RLS on ${table}:`, error)
    }
  }

  console.log('✅ RLS disabled for all tables. You can now run the seed script.')
}

disableRLSForSeeding() 