import ComputeInterface, { Bet, Result } from './ComputeInterface.ts'

export default class PotCommunCompute implements ComputeInterface {
  compute(bets: Bet[], winner: string): Result[] {
    const result: Result[] = []
    bets.forEach((bet) => {
      if (bet.guess !== winner) {
        result.push({
          event_id: bet.event_id,
          number: bet.number,
          from_id: bet.user_id,
        })
      }
    })
    return result
  }
}
