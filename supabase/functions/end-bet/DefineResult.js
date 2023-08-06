import ComputeInterface, { Bet, Result } from './computes/ComputeInterface.ts';
export default class DefineResult {
    supabaseClient;
    strategy;
    bets = [];
    constructor(supabaseClient, strategy) {
        this.supabaseClient = supabaseClient;
        this.strategy = strategy;
    }
    async defineResult(eventId, winner) {
        const { data: bets } = await this.supabaseClient.from('bets').select('*').eq('event_id', eventId);
        this.bets = bets;
        const results = this.strategy.compute(this.bets, winner);
        await this.saveResult(results);
    }
    async saveResult(results) {
        const { error } = await this.supabaseClient.from('results').insert(results);
        if (error)
            throw error;
    }
}
