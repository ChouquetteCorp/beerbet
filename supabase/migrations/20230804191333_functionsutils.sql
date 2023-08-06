
set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.append_old_usernames()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
    BEGIN
      
        UPDATE public.profiles 
        SET old_usernames = array_append((SELECT old_usernames FROM profiles WHERE user_id = NEW.user_id), OLD.username) 
        WHERE user_id = NEW.user_id;

        RETURN NEW;
    END;
    $function$
;

CREATE OR REPLACE FUNCTION public.check_allowed_event(userid uuid, email character varying, eventid bigint, checkdate boolean DEFAULT false)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
SELECT EXISTS (
  SELECT 1
  FROM events
  WHERE 
    (checkDate = false OR events.date > now())
    AND (eventId = events.id) 
    AND (
      (events."allowedDomain" IS NULL) 
      OR (email ~~ ('%@'::text || (events."allowedDomain")::text))
    )
)
    $function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (user_id, username)
  values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$function$
;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();



CREATE OR REPLACE FUNCTION public.is_participant_of(userid uuid, invitecode uuid DEFAULT NULL::uuid)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
SELECT EXISTS (
  SELECT 1
  FROM events_users_participation eup
  WHERE eup.event_code = inviteCode
  AND eup.user_id = userId
);
$function$
;
