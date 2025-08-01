import { createClient } from '@supabase/supabase-js'

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function addIslandToLeads() {
  try {
    console.log('Adding island column to leads table...')
    
    // Add the island column
    const { error: alterError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE leads ADD COLUMN IF NOT EXISTS island VARCHAR(100);
        CREATE INDEX IF NOT EXISTS idx_leads_island ON leads(island);
        COMMENT ON COLUMN leads.island IS 'Island location in the Bahamas for the lead';
      `
    })
    
    if (alterError) {
      console.error('Failed to add island column:', alterError)
      process.exit(1)
    }
    
    console.log('✅ Island column added successfully!')
    
    // Test inserting a lead with island data
    const { data: testLead, error: insertError } = await supabase
      .from('leads')
      .insert({
        company_name: 'Test Company',
        contact_name: 'Test Contact',
        email: 'test@example.com',
        island: 'New Providence',
        status: 'new'
      })
      .select()
    
    if (insertError) {
      console.error('Test insert failed:', insertError)
    } else {
      console.log('✅ Test lead with island data inserted:', testLead)
      
      // Clean up test data
      if (testLead && testLead[0]) {
        await supabase
          .from('leads')
          .delete()
          .eq('id', testLead[0].id)
        console.log('✅ Test data cleaned up')
      }
    }
    
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
addIslandToLeads() 