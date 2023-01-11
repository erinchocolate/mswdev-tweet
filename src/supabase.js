
import { createClient } from '@supabase/supabase-js'
/*Authentication for supabase*/
const supabaseUrl = 'https://ezsycrxangafwhvixmio.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6c3ljcnhhbmdhZndodml4bWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMzMTgzNDYsImV4cCI6MTk4ODg5NDM0Nn0.rQ3TrfMQ6lriaprezpnbW1ZpcjUw_w9H5uiK4RXXSTw";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;