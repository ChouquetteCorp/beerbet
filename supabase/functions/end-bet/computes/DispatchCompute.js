import ComputeInterface, { Bet, Result } from './ComputeInterface.ts';
export default class DispatchCompute {
    analyze(bets, winner) {
        return bets.reduce((acc, bet) => {
            if (bet.guess === winner) {
                acc.betsWinner.push(bet);
                acc.totalWinner += bet.number;
                acc.nbWinner++;
            }
            else {
                acc.totalLoser += bet.number;
                acc.nbLoser++;
                acc.betsLoser.push(bet);
            }
            return acc;
        }, { totalWinner: 0, totalLoser: 0, betsWinner: [], betsLoser: [], nbWinner: 0, nbLoser: 0 });
    }
    getGains(betsWinner, totalWinner, totalLoser) {
        return betsWinner.map((bet) => {
            return {
                user: bet.user_id,
                number: (bet.number / totalWinner) * totalLoser,
            };
        });
    }
    compute(bets, winner) {
        const { totalWinner, betsWinner, betsLoser, totalLoser } = this.analyze(bets, winner);
        const gains = this.getGains(betsWinner, totalWinner, totalLoser);
        const result = [];
        gains.forEach((gain) => {
            let finalGain = gain.number;
            betsLoser.every((betLoser) => {
                if (finalGain === 0) {
                    return false;
                }
                if (betLoser.number === 0) {
                    return true;
                }
                else if (betLoser.number > finalGain) {
                    result.push({
                        event_id: betLoser.event_id,
                        from_id: betLoser.user_id,
                        number: +finalGain.toFixed(1),
                        to_id: gain.user,
                    });
                    betLoser.number -= finalGain;
                    finalGain = 0;
                }
                else {
                    result.push({
                        event_id: betLoser.event_id,
                        from_id: betLoser.user_id,
                        number: +betLoser.number.toFixed(1),
                        to_id: gain.user,
                    });
                    finalGain -= betLoser.number;
                    betLoser.number = 0;
                }
                return true;
            });
        });
        return result;
    }
}
