import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedData() {
  console.log('🌱 Seeding database with sample data...')

  // Insert sample companies
  const companies = [
    {
      name: 'Nassau Construction Ltd',
      size: 'large',
      subscription_plan: 'enterprise',
      worker_count: 150,
      status: 'active'
    },
    {
      name: 'Atlantis Builders',
      size: 'medium',
      subscription_plan: 'pro',
      worker_count: 75,
      status: 'active'
    },
    {
      name: 'Paradise Projects',
      size: 'medium',
      subscription_plan: 'pro',
      worker_count: 45,
      status: 'active'
    },
    {
      name: 'Coral Bay Construction',
      size: 'small',
      subscription_plan: 'basic',
      worker_count: 25,
      status: 'active'
    },
    {
      name: 'Bahamas Development Co',
      size: 'large',
      subscription_plan: 'enterprise',
      worker_count: 200,
      status: 'trial'
    }
  ]

  console.log('📦 Inserting companies...')
  for (const company of companies) {
    const { data, error } = await supabase
      .from('companies')
      .insert(company)
      .select()
    
    if (error) {
      console.error('Error inserting company:', error)
    } else {
      console.log(`✅ Inserted company: ${company.name}`)
    }
  }

  // Get company IDs for foreign key relationships
  const { data: companyData } = await supabase
    .from('companies')
    .select('id, name')

  if (!companyData) {
    console.error('No companies found')
    return
  }

  // Insert sample profiles (users)
  const profiles = [
    {
      email: 'admin@nassauconstruction.com',
      full_name: 'John Smith',
      role: 'admin',
      company_id: companyData.find(c => c.name === 'Nassau Construction Ltd')?.id,
      status: 'active'
    },
    {
      email: 'manager@atlantisbuilders.com',
      full_name: 'Sarah Johnson',
      role: 'manager',
      company_id: companyData.find(c => c.name === 'Atlantis Builders')?.id,
      status: 'active'
    },
    {
      email: 'user@paradiseprojects.com',
      full_name: 'Mike Wilson',
      role: 'user',
      company_id: companyData.find(c => c.name === 'Paradise Projects')?.id,
      status: 'active'
    },
    {
      email: 'admin@coralbay.com',
      full_name: 'Lisa Davis',
      role: 'admin',
      company_id: companyData.find(c => c.name === 'Coral Bay Construction')?.id,
      status: 'active'
    }
  ]

  console.log('👥 Inserting profiles...')
  for (const profile of profiles) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
    
    if (error) {
      console.error('Error inserting profile:', error)
    } else {
      console.log(`✅ Inserted profile: ${profile.email}`)
    }
  }

  // Insert sample subscriptions
  const subscriptions = [
    {
      company_id: companyData.find(c => c.name === 'Nassau Construction Ltd')?.id,
      plan: 'enterprise',
      status: 'active',
      amount: 99900, // $999.00 in cents
      currency: 'USD',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      company_id: companyData.find(c => c.name === 'Atlantis Builders')?.id,
      plan: 'pro',
      status: 'active',
      amount: 49900, // $499.00 in cents
      currency: 'USD',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      company_id: companyData.find(c => c.name === 'Paradise Projects')?.id,
      plan: 'pro',
      status: 'active',
      amount: 49900, // $499.00 in cents
      currency: 'USD',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      company_id: companyData.find(c => c.name === 'Coral Bay Construction')?.id,
      plan: 'basic',
      status: 'active',
      amount: 9900, // $99.00 in cents
      currency: 'USD',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  console.log('💳 Inserting subscriptions...')
  for (const subscription of subscriptions) {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert(subscription)
      .select()
    
    if (error) {
      console.error('Error inserting subscription:', error)
    } else {
      console.log(`✅ Inserted subscription for plan: ${subscription.plan}`)
    }
  }

  // Insert sample feature flags
  const featureFlags = [
    {
      name: 'advanced_analytics',
      description: 'Enable advanced analytics dashboard',
      is_enabled: true,
      company_id: companyData.find(c => c.name === 'Nassau Construction Ltd')?.id
    },
    {
      name: 'team_collaboration',
      description: 'Enable team collaboration features',
      is_enabled: true,
      company_id: companyData.find(c => c.name === 'Atlantis Builders')?.id
    },
    {
      name: 'mobile_app',
      description: 'Enable mobile app access',
      is_enabled: false,
      company_id: companyData.find(c => c.name === 'Paradise Projects')?.id
    },
    {
      name: 'api_access',
      description: 'Enable API access for integrations',
      is_enabled: true,
      company_id: companyData.find(c => c.name === 'Coral Bay Construction')?.id
    },
    {
      name: 'custom_branding',
      description: 'Enable custom branding options',
      is_enabled: true,
      company_id: companyData.find(c => c.name === 'Nassau Construction Ltd')?.id
    }
  ]

  console.log('🚩 Inserting feature flags...')
  for (const flag of featureFlags) {
    const { data, error } = await supabase
      .from('feature_flags')
      .insert(flag)
      .select()
    
    if (error) {
      console.error('Error inserting feature flag:', error)
    } else {
      console.log(`✅ Inserted feature flag: ${flag.name}`)
    }
  }

  // Insert sample system logs
  const systemLogs = [
    {
      action: 'user_login',
      details: { user_id: 'sample-user-1', ip: '192.168.1.100' },
      ip_address: '192.168.1.100',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      action: 'company_registered',
      details: { company_name: 'Bahamas Development Co', plan: 'enterprise' },
      ip_address: '192.168.1.101',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      action: 'subscription_upgraded',
      details: { company_id: 'sample-company-1', from_plan: 'basic', to_plan: 'pro' },
      ip_address: '192.168.1.102',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      action: 'feature_flag_enabled',
      details: { flag_name: 'advanced_analytics', company_id: 'sample-company-2' },
      ip_address: '192.168.1.103',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      action: 'user_account_created',
      details: { email: 'newuser@example.com', role: 'user' },
      ip_address: '192.168.1.104',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
  ]

  console.log('📝 Inserting system logs...')
  for (const log of systemLogs) {
    const { data, error } = await supabase
      .from('system_logs')
      .insert(log)
      .select()
    
    if (error) {
      console.error('Error inserting system log:', error)
    } else {
      console.log(`✅ Inserted system log: ${log.action}`)
    }
  }

  // Insert sample TropiBrain insights
  const tropiBrainInsights = [
    {
      problem_summary: 'Users need better project tracking capabilities',
      proposed_feature: 'Enhanced project management dashboard with real-time updates',
      source: 'user_feedback',
      impact_score: 8,
      status: 'in_review'
    },
    {
      problem_summary: 'Mobile app performance issues on older devices',
      proposed_feature: 'Optimize mobile app for better performance on legacy devices',
      source: 'analytics',
      impact_score: 6,
      status: 'approved'
    },
    {
      problem_summary: 'Limited integration options with third-party tools',
      proposed_feature: 'Expand API capabilities and add more integration options',
      source: 'customer_support',
      impact_score: 9,
      status: 'new'
    }
  ]

  console.log('🧠 Inserting TropiBrain insights...')
  for (const insight of tropiBrainInsights) {
    const { data, error } = await supabase
      .from('tropibrain_insights')
      .insert(insight)
      .select()
    
    if (error) {
      console.error('Error inserting TropiBrain insight:', error)
    } else {
      console.log(`✅ Inserted TropiBrain insight: ${insight.proposed_feature.substring(0, 50)}...`)
    }
  }

  console.log('✅ Database seeding completed!')
}

// Run the seeding function
seedData().catch(console.error) 