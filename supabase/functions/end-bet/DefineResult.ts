import ComputeInterface, { Bet, Result } from './computes/ComputeInterface.ts'

export default class DefineResult {
  private supabaseClient: any
  private strategy: ComputeInterface
  public bets: Bet[] = []

  constructor(supabaseClient: any, strategy: ComputeInterface) {
    this.supabaseClient = supabaseClient
    this.strategy = strategy
  }

  public async defineResult(eventId: number, winner: string) {
    const { data: bets } = await this.supabaseClient.from('bets').select('*').eq('event_id', eventId)
    this.bets = <Bet[]>bets

    const results = this.strategy.compute(this.bets, winner)

    await this.saveResult(results)
  }

  private async saveResult(results: Result[]) {
    const { error } = await this.supabaseClient.from('results').insert(results)
    if (error) throw error
  }
}
