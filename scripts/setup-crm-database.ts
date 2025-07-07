import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupCRMDatabase() {
  console.log('🚀 Setting up TropiTech CRM Database...')
  
  try {
    // Read SQL files
    const sqlPath = join(process.cwd(), 'scripts', 'create-complete-crm-tables.sql')
    const seedPath = join(process.cwd(), 'scripts', 'seed-complete-crm-data.sql')
    
    console.log('📖 Reading SQL files...')
    const createTablesSQL = readFileSync(sqlPath, 'utf-8')
    const seedDataSQL = readFileSync(seedPath, 'utf-8')
    
    // Execute create tables SQL
    console.log('🔨 Creating CRM tables...')
    const { error: createError } = await supabase.rpc('exec_sql', { sql: createTablesSQL })
    
    if (createError) {
      console.error('❌ Error creating tables:', createError)
      return
    }
    
    console.log('✅ CRM tables created successfully!')
    
    // Execute seed data SQL
    console.log('🌱 Seeding CRM data...')
    const { error: seedError } = await supabase.rpc('exec_sql', { sql: seedDataSQL })
    
    if (seedError) {
      console.error('❌ Error seeding data:', seedError)
      return
    }
    
    console.log('✅ CRM data seeded successfully!')
    
    // Verify setup
    console.log('🔍 Verifying setup...')
    const { data: tables, error: verifyError } = await supabase
      .from('leads')
      .select('count')
      .limit(1)
    
    if (verifyError) {
      console.error('❌ Error verifying setup:', verifyError)
      return
    }
    
    console.log('🎉 TropiTech CRM Database setup complete!')
    console.log('📊 You can now access your CRM at: http://localhost:3000/admin')
    
  } catch (error) {
    console.error('❌ Setup failed:', error)
  }
}

// Run setup
setupCRMDatabase() 