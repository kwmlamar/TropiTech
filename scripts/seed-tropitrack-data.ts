import { createClient } from '@/utils/supabase/server'

async function seedTropiTrackData() {
  const supabase = await createClient()

  console.log('🌱 Seeding TropiTrack data...')

  // First, let's get some existing companies and users
  const { data: companies } = await supabase
    .from('companies')
    .select('id, name')
    .limit(3)

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .limit(5)

  if (!companies || companies.length === 0) {
    console.log('❌ No companies found. Please seed companies first.')
    return
  }

  if (!profiles || profiles.length === 0) {
    console.log('❌ No profiles found. Please seed profiles first.')
    return
  }

  // Seed projects
  console.log('📋 Creating projects...')
  const projects = [
    {
      company_id: companies[0].id,
      name: 'Downtown Office Complex',
      description: 'Construction of a 15-story office building in downtown area',
      status: 'active' as const,
      start_date: '2024-01-15',
      end_date: '2024-12-31',
      budget: 5000000 // $50,000 in cents
    },
    {
      company_id: companies[0].id,
      name: 'Residential Complex Phase 1',
      description: 'First phase of 50-unit residential complex',
      status: 'active' as const,
      start_date: '2024-02-01',
      end_date: '2024-08-31',
      budget: 3000000 // $30,000 in cents
    },
    {
      company_id: companies[1]?.id || companies[0].id,
      name: 'Shopping Center Renovation',
      description: 'Complete renovation of existing shopping center',
      status: 'on_hold' as const,
      start_date: '2024-03-01',
      end_date: '2024-10-31',
      budget: 2000000 // $20,000 in cents
    }
  ]

  const { data: createdProjects, error: projectError } = await supabase
    .from('projects')
    .insert(projects)
    .select()

  if (projectError) {
    console.error('❌ Error creating projects:', projectError)
    return
  }

  console.log(`✅ Created ${createdProjects?.length || 0} projects`)

  // Seed tasks
  console.log('📝 Creating tasks...')
  const tasks = [
    {
      project_id: createdProjects![0].id,
      name: 'Foundation Work',
      description: 'Excavation and foundation construction',
      status: 'completed' as const,
      priority: 'high' as const,
      estimated_hours: 80
    },
    {
      project_id: createdProjects![0].id,
      name: 'Structural Framework',
      description: 'Steel framework installation',
      status: 'in_progress' as const,
      priority: 'high' as const,
      estimated_hours: 120
    },
    {
      project_id: createdProjects![0].id,
      name: 'Electrical Installation',
      description: 'Electrical systems installation',
      status: 'pending' as const,
      priority: 'medium' as const,
      estimated_hours: 60
    },
    {
      project_id: createdProjects![1].id,
      name: 'Site Preparation',
      description: 'Site clearing and preparation',
      status: 'completed' as const,
      priority: 'high' as const,
      estimated_hours: 40
    },
    {
      project_id: createdProjects![1].id,
      name: 'Foundation Pouring',
      description: 'Concrete foundation pouring',
      status: 'in_progress' as const,
      priority: 'high' as const,
      estimated_hours: 100
    }
  ]

  const { data: createdTasks, error: taskError } = await supabase
    .from('tasks')
    .insert(tasks)
    .select()

  if (taskError) {
    console.error('❌ Error creating tasks:', taskError)
    return
  }

  console.log(`✅ Created ${createdTasks?.length || 0} tasks`)

  // Seed time entries
  console.log('⏱️ Creating time entries...')
  const timeEntries = [
    {
      user_id: profiles[0].id,
      project_id: createdProjects![0].id,
      task_id: createdTasks![0].id,
      start_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      end_time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      duration_minutes: 60,
      description: 'Foundation inspection and quality control',
      status: 'completed' as const
    },
    {
      user_id: profiles[0].id,
      project_id: createdProjects![0].id,
      task_id: createdTasks![1].id,
      start_time: new Date().toISOString(), // Now
      end_time: null,
      duration_minutes: null,
      description: 'Steel framework assembly',
      status: 'active' as const
    },
    {
      user_id: profiles[1]?.id || profiles[0].id,
      project_id: createdProjects![0].id,
      task_id: createdTasks![1].id,
      start_time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      end_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      duration_minutes: 120,
      description: 'Steel beam installation',
      status: 'completed' as const
    },
    {
      user_id: profiles[2]?.id || profiles[0].id,
      project_id: createdProjects![1].id,
      task_id: createdTasks![3].id,
      start_time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      end_time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      duration_minutes: 120,
      description: 'Site clearing and debris removal',
      status: 'completed' as const
    },
    {
      user_id: profiles[3]?.id || profiles[0].id,
      project_id: createdProjects![1].id,
      task_id: createdTasks![4].id,
      start_time: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      end_time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      duration_minutes: 180,
      description: 'Concrete mixing and pouring',
      status: 'completed' as const
    }
  ]

  const { data: createdTimeEntries, error: timeEntryError } = await supabase
    .from('time_entries')
    .insert(timeEntries)
    .select()

  if (timeEntryError) {
    console.error('❌ Error creating time entries:', timeEntryError)
    return
  }

  console.log(`✅ Created ${createdTimeEntries?.length || 0} time entries`)

  // Seed payroll entries
  console.log('💰 Creating payroll entries...')
  const payrollEntries = [
    {
      user_id: profiles[0].id,
      pay_period_start: '2024-01-01',
      pay_period_end: '2024-01-15',
      total_hours: 80,
      hourly_rate: 2500, // $25.00 in cents
      total_pay: 200000, // $2,000.00 in cents
      status: 'paid' as const
    },
    {
      user_id: profiles[1]?.id || profiles[0].id,
      pay_period_start: '2024-01-01',
      pay_period_end: '2024-01-15',
      total_hours: 75,
      hourly_rate: 2200, // $22.00 in cents
      total_pay: 165000, // $1,650.00 in cents
      status: 'paid' as const
    },
    {
      user_id: profiles[2]?.id || profiles[0].id,
      pay_period_start: '2024-01-16',
      pay_period_end: '2024-01-31',
      total_hours: 85,
      hourly_rate: 2800, // $28.00 in cents
      total_pay: 238000, // $2,380.00 in cents
      status: 'pending' as const
    },
    {
      user_id: profiles[3]?.id || profiles[0].id,
      pay_period_start: '2024-01-16',
      pay_period_end: '2024-01-31',
      total_hours: 70,
      hourly_rate: 2000, // $20.00 in cents
      total_pay: 140000, // $1,400.00 in cents
      status: 'approved' as const
    }
  ]

  const { data: createdPayrollEntries, error: payrollError } = await supabase
    .from('payroll_entries')
    .insert(payrollEntries)
    .select()

  if (payrollError) {
    console.error('❌ Error creating payroll entries:', payrollError)
    return
  }

  console.log(`✅ Created ${createdPayrollEntries?.length || 0} payroll entries`)

  console.log('🎉 TropiTrack data seeding completed!')
  console.log(`📊 Summary:`)
  console.log(`   - Projects: ${createdProjects?.length || 0}`)
  console.log(`   - Tasks: ${createdTasks?.length || 0}`)
  console.log(`   - Time Entries: ${createdTimeEntries?.length || 0}`)
  console.log(`   - Payroll Entries: ${createdPayrollEntries?.length || 0}`)
}

// Run the seeding function
seedTropiTrackData().catch(console.error) 