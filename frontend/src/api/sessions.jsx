// log a session
const { data: logData, error: logError } = await supabase
  .from('study_sessions')
  .insert([{ user_id: user.id, duration }])

// fetch all sessions
const { data: allSessionsData, error: allSessionsError } = await supabase
  .from('study_sessions')
  .select('*')
  .eq('user_id', user.id)
  .order('inserted_at', { ascending: false })

// fetch top-N longest
const { data: topSessionsData, error: topSessionsError } = await supabase
  .from('study_sessions')
  .select('*')
  .eq('user_id', user.id)
  .order('duration', { ascending: false })
  .limit(N)
