create or replace function count_guess_for_event(eventid integer)
 RETURNS TABLE (
    guess character varying,
    sum bigint
  ) 
  LANGUAGE plpgsql AS
$func$
BEGIN
return query
  SELECT b.guess, SUM(number) as sum
  from bets b 
  where event_id = eventid
  group by b.guess;
END
$func$;
