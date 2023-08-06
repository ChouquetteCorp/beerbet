
  INSERT INTO matchs (sport, league, date, team_a, team_b, venue, api_id)  
  VALUES 
  ON CONFLICT (api_id) DO UPDATE SET 
    sport = EXCLUDED.sport,
    league = EXCLUDED.league,
    date = EXCLUDED.date,
    team_a = EXCLUDED.team_a,
    team_b = EXCLUDED.team_b,
    venue = EXCLUDED.venue
  ;