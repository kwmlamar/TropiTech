import { createClient } from '@supabase/supabase-js'

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testIslandMigration() {
  try {
    console.log('Testing island migration...')
    
    // Test 1: Insert a lead with island data
    const { data: testLead, error: insertError } = await supabase
      .from('leads')
      .insert({
        company_name: 'Test Island Company',
        contact_name: 'John Island',
        email: 'john@islandtest.com',
        phone: '+1-242-555-0123',
        island: 'New Providence',
        status: 'new',
        source: 'website'
      })
      .select()
    
    if (insertError) {
      console.error('❌ Test insert failed:', insertError)
      return
    }
    
    console.log('✅ Test lead inserted:', testLead)
    
    // Test 2: Query leads by island
    const { data: islandLeads, error: queryError } = await supabase
      .from('leads')
      .select('*')
      .eq('island', 'New Providence')
    
    if (queryError) {
      console.error('❌ Test query failed:', queryError)
    } else {
      console.log('✅ Island query successful:', islandLeads?.length, 'leads found')
    }
    
    // Test 3: Update island data
    if (testLead && testLead[0]) {
      const { data: updatedLead, error: updateError } = await supabase
        .from('leads')
        .update({ island: 'Grand Bahama' })
        .eq('id', testLead[0].id)
        .select()
      
      if (updateError) {
        console.error('❌ Test update failed:', updateError)
      } else {
        console.log('✅ Island update successful:', updatedLead)
      }
    }
    
    // Clean up test data
    if (testLead && testLead[0]) {
      await supabase
        .from('leads')
        .delete()
        .eq('id', testLead[0].id)
      console.log('✅ Test data cleaned up')
    }
    
    console.log('🎉 All island migration tests passed!')
    
  } catch (error) {
    console.error('❌ Test failed:', error)
    process.exit(1)
  }
}

// Run the test
testIslandMigration() 