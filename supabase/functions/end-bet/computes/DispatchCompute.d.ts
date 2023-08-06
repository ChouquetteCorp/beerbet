import ComputeInterface, { Bet, Result } from './ComputeInterface.ts';
export default class DispatchCompute implements ComputeInterface {
    analyze(bets: Bet[], winner: string): Bet;
    getGains(betsWinner: Bet[], totalWinner: number, totalLoser: number): {
        user: any;
        number: number;
    }[];
    compute(bets: Bet[], winner: string): Result[];
}
