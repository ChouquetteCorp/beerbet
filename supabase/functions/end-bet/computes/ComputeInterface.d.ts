export interface Result {
    event_id: number;
    number: number;
    from_id: string;
    to_id?: string;
}
export interface Bet {
    event_id: number;
    created_at: string | null;
    number: number;
    user_id: string;
    guess: string;
}
export interface Event {
    id: number;
    date: Date;
    title: string;
    subtitle: string | null;
    description: string | null;
    location: string | null;
    author: string | null;
    created_at: Date;
    propositions: string[] | null;
    winner: string | null;
    image_url: string | null;
    is_finish: boolean;
    unit: EventUnit;
}
export declare enum EventUnit {
    CHOUQUETTE = "chouquette",
    BEER = "beer"
}
export default interface ComputeInterface {
    compute(bets: Bet[], winner: string): Result[];
}
