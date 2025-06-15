import { supabase } from "../lib/supabaseClient";

export async function logSession({ token, duration }) {
  const { data: { user }, error } = await supabase.auth.getUser(token);
  const { data: logData, error: logError } = await supabase
    .from('study_sessions')
    .insert([{ user_id: user.id, duration }])

    if (logError || !user) {
    throw new Error(logError.message);
  }
  return logData;
}

export async function getAllSessions({ token }) {
  const { data: { user }, error } = await supabase.auth.getUser(token);

  const { data: allSessionsData, error: allSessionsError } = await supabase
    .from('study_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('inserted_at', { ascending: false })

    if (allSessionsError) {
      throw new Error(allSessionsError.message)
    }
    return allSessionsData
}

export async function getSomeSessions({ token, limit }) {
  const { data: { user }, error } = await supabase.auth.getUser(token);

  const { data: topSessionsData, error: topSessionsError } = await supabase
    .from('study_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('duration', { ascending: false })
    .limit(limit)
  
  if (topSessionsError) {
    throw new Error(topSessionsError.message);
  }

  return topSessionsData
}
