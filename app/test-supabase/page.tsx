import { createClient } from '@/utils/supabase/server'

export default async function TestSupabasePage() {
  try {
    const supabase = await createClient()
    
    // Test a simple query
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Supabase Test - Error</h1>
          <pre className="bg-red-100 p-4 rounded">{JSON.stringify(error, null, 2)}</pre>
        </div>
      )
    }
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Supabase Test - Success</h1>
        <p>Connection successful! Found {data} profiles.</p>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Supabase Test - Exception</h1>
        <pre className="bg-red-100 p-4 rounded">
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
      </div>
    )
  }
} 