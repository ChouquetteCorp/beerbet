import { type Session } from '@supabase/supabase-js';
export declare function getUserSession({ user }: {
    user?: string | undefined;
}): Promise<Session>;
