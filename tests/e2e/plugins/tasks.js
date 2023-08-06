import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({
    path: '.env.emulator',
});
const supabase = createClient(process.env.VITE_SUPABASE_URL ?? 'x', process.env.VITE_SUPABASE_ANON_KEY ?? 'x');
// cache session data for each user name
const sessions = {};
export async function getUserSession({ user = 'default' }) {
    // Create a session for the user if it doesn't exist already.
    if (!sessions[user]) {
        const { data } = await supabase.auth.signInWithPassword({
            email: `${user}@chouquettebet.fr`,
            password: `password`,
        });
        if (data.session === null)
            throw new Error('Session is null');
        sessions[user] = data.session;
    }
    return sessions[user];
}
