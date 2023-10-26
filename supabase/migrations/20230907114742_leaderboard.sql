

CREATE OR REPLACE FUNCTION get_leaderboard(userid uuid, _unit event_units, datestart timestamp DEFAULT '2020-01-01 00:00:00+00', dateend timestamp with time zone  DEFAULT NOW())
  RETURNS TABLE (
    user_id uuid,
    username character varying,
    old_usernames character varying[],
    win real,
    lost real,
    score real
  ) 
  LANGUAGE plpgsql AS
$func$
BEGIN
return query
  SELECT p.*, COALESCE(SUM(rW.number) ,0) as win,  COALESCE(SUM(rL.number),0) as lost,  COALESCE(SUM(rW.number),0) - COALESCE(SUM(rL.number) ,0) as score
  FROM  profiles p
  right JOIN  events_users_participation eup1 ON  eup1.user_id = p.user_id
  LEFT JOIN results rW ON rW.to_id = p.user_id
  LEFT JOIN results rL ON rL.from_id = p.user_id
  WHERE 
    p.user_id != userid AND
    eup1.event_code IN (
      select eup.event_code
      from  events_users_participation eup, events e
      WHERE eup.user_id = userid
      AND e.invite_code = eup.event_code
      AND e.date_finish BETWEEN dateStart AND dateEnd
      AND e.unit = _unit
    )
      group by p.user_id
  order by score DESC;
END
$func$;




CREATE OR REPLACE FUNCTION get_score_beetween(userid1 uuid,userid2 uuid)
  RETURNS TABLE (
    win real,
    lost real,
    score real
  ) 
  LANGUAGE plpgsql AS
$func$
BEGIN
return query
 SELECT COALESCE(SUM(rW.number) ,0) as win,  COALESCE(SUM(rL.number),0) as lost,  COALESCE(SUM(rW.number),0) - COALESCE(SUM(rL.number) ,0) as score
   FROM  profiles p
   LEFT JOIN results rW ON rW.to_id = p.user_id AND rW.from_id = userid2
  LEFT JOIN results rL ON rL.from_id = p.user_id AND rL.to_id = userid2
  WHERE p.user_id = userid1;
END
$func$;