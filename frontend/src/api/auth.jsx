import { supabase } from "../lib/supabaseClient";
// 1. register a new user
export async function signUp({ email, password, username, name }) {
  // 1. call supabase.auth.signUp with email, password, and metadata
  // 2. if error, throw or return { error }
  // 3. return user data
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        name,
      }
    }
  })

  if (error) {
    throw new Error(error.message)
  }

  return data.user

}

// 2. log an existing user in
export async function signIn({ email, password }) {
  // call supabase.auth.signInWithPassword
  // handle error
  // return session
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  if (error) {
    throw new Error(error.message)
  }

  return data.session
}

// 3. log out
export async function signOut() {
  // call supabase.auth.signOut
  const { data, error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message) 
  }
}

// 4. get the current logged-in user
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user;   // may be null if no one is signed in
}

