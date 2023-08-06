import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { Event } from './computes/ComputeInterface.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0';
import HttpResponse from '../_shared/HttpResponse.ts';
import DefineResult from './DefineResult.ts';
import DispatchCompute from './computes/DispatchCompute.ts';
import { sendNotification } from '../_shared/notifications/index.ts';
import { NotificationType } from '../_shared/notifications/utils.ts';
import { getDomain } from '../_shared/EnvUtils.ts';
export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
serve(async (req) => {
    const { url, method } = req;
    if (method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }
    try {
        const supabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
            global: {
                headers: { Authorization: req.headers.get('Authorization') },
            },
        });
        const { data: { user }, } = await supabaseClient.auth.getUser();
        if (!user)
            return new HttpResponse(401, { success: false, message: 'Unauthorized' });
        const taskPattern = new URLPattern({ pathname: '/end-bet/:id' });
        const matchingPath = taskPattern.exec(url);
        const id = matchingPath ? matchingPath.pathname.groups.id : null;
        if (!id) {
            return new HttpResponse(400, { success: false, message: 'No id provided' });
        }
        const { data: eventsData, error: eventsError } = await supabaseClient.from('events').select('*').eq('id', id);
        if (eventsError)
            throw eventsError;
        const event = eventsData[0];
        if (event.author !== user.id || event.is_finish) {
            return new HttpResponse(403, { success: false, message: 'You allowed to finish this event' });
        }
        const bodyDecoded = await req.json();
        const winner = bodyDecoded.winner;
        if (!event.propositions || !event.propositions.includes(winner)) {
            return new HttpResponse(400, { success: false, message: 'Winner is not a proposition' });
        }
        const defineResult = new DefineResult(supabaseClient, new DispatchCompute());
        await defineResult.defineResult(event.id, winner);
        const { error: errorUpdate } = await supabaseClient
            .from('events')
            .update({ winner, is_finish: true, date_finish: new Date() })
            .eq('id', event.id);
        if (errorUpdate)
            throw errorUpdate;
        const domain = getDomain(event.unit);
        await sendNotification(NotificationType.SEE_RESULTS, {
            eventName: event.title,
            eventDomain: domain,
            eventLink: `${domain}/event/${event.id}`,
            eventImageLink: event.image_url || '',
            eventType: event.unit,
        }, defineResult.bets.map((bet) => bet.user_id));
        return new HttpResponse(200, { success: true });
    }
    catch (error) {
        console.error(error);
        return new HttpResponse(400, { success: false });
    }
});
