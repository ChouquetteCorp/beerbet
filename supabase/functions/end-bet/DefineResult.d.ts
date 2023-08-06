import ComputeInterface, { Bet } from './computes/ComputeInterface.ts';
export default class DefineResult {
    private supabaseClient;
    private strategy;
    bets: Bet[];
    constructor(supabaseClient: any, strategy: ComputeInterface);
    defineResult(eventId: number, winner: string): Promise<void>;
    private saveResult;
}
