const fs = require('fs');

async function runSQL() {
  const sql = fs.readFileSync('supabase/schema.sql', 'utf8');
  
  const SUPABASE_URL = 'https://zpxslrdbiebwqrvqdvim.supabase.co';
  const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpweHNscmRiaWVid3FydnFkdmltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDM5NDE4NSwiZXhwIjoyMDk1OTcwMTg1fQ.fWwfKeQ_tvpYgNDY_q2s41XQ3YUJNj_GNPCsuIdZu2w';

  // Split SQL by semicolons and execute each statement via the REST API
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });

  // Use the SQL endpoint instead
  const pgResponse = await fetch(`${SUPABASE_URL}/pg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });

  console.log('pg response:', pgResponse.status, await pgResponse.text().catch(() => ''));
}

runSQL().catch(console.error);
