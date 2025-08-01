import { createClient } from '@supabase/supabase-js'

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function debugIslandValues() {
  try {
    console.log('🔍 Debugging island values in database...')
    
    // Get all leads with island values
    const { data: leads, error } = await supabase
      .from('leads')
      .select('id, company_name, island')
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (error) {
      console.error('❌ Error fetching leads:', error)
      return
    }
    
    console.log('\n📊 Island values in database:')
    console.log('='.repeat(50))
    
    leads?.forEach((lead, index) => {
      console.log(`${index + 1}. Company: ${lead.company_name}`)
      console.log(`   Island: "${lead.island}"`)
      console.log(`   Island type: ${typeof lead.island}`)
      console.log(`   Island length: ${lead.island?.length || 0}`)
      console.log(`   Island === "": ${lead.island === ""}`)
      console.log(`   Island === null: ${lead.island === null}`)
      console.log(`   Island === undefined: ${lead.island === undefined}`)
      console.log('')
    })
    
    // Test with a specific island value
    console.log('🧪 Testing with "New Providence":')
    const testValue = "New Providence"
    console.log(`Test value: "${testValue}"`)
    console.log(`Test value type: ${typeof testValue}`)
    console.log(`Test value length: ${testValue.length}`)
    
    // Check if any leads have this exact value
    const { data: matchingLeads, error: matchError } = await supabase
      .from('leads')
      .select('id, company_name, island')
      .eq('island', testValue)
    
    if (matchError) {
      console.error('❌ Error checking for matching leads:', matchError)
    } else {
      console.log(`Found ${matchingLeads?.length || 0} leads with "New Providence"`)
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error)
  }
}

// Run the debug
debugIslandValues() 