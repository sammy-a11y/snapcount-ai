import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yakqwaunovbjeiyfscmb.supabase.co '
const supabaseAnonKey = 'sb_publishable_P3tEeOdsbSQGt3nAvIuIkw_HgQ1M9PU '

export const supabase = createClient(supabaseUrl, supabaseAnonKey)