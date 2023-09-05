
create policy "Enable delete for users based on user_id"
on "public"."bets"
as permissive
for delete
to public
using (((auth.uid() = user_id) AND check_allowed_event(auth.uid(), (auth.email())::character varying, event_id, true)));


create policy "Enable for user who have access to event"
on "public"."bets"
as permissive
for select
to authenticated
using (check_allowed_event(auth.uid(), (auth.email())::character varying, event_id));


create policy "Enable insert own bet and event not ended"
on "public"."bets"
as permissive
for insert
to public
with check (((auth.uid() = user_id) AND check_allowed_event(auth.uid(), (auth.email())::character varying, event_id, true)));


create policy "Enable modify own bet and event not ended"
on "public"."bets"
as permissive
for update
to public
using (((auth.uid() = user_id) AND check_allowed_event(auth.uid(), (auth.email())::character varying, event_id, true)))
with check (((auth.uid() = user_id) AND check_allowed_event(auth.uid(), (auth.email())::character varying, event_id, true)));


create policy "Enable delete for users based on user_id"
on "public"."events"
as permissive
for delete
to public
using ((auth.uid() = author));


create policy "Enable for enterprise event (allowedDomain)"
on "public"."events"
as permissive
for select
to authenticated
using (((type = 'enterprise'::event_types) AND (auth.email() ~~ ('%@'::text || ("allowedDomain")::text))));


create policy "Enable insert for user"
on "public"."events"
as permissive
for insert
to authenticated
with check ((auth.uid() = author));


create policy "Enable read access for author"
on "public"."events"
as permissive
for select
to authenticated
using ((author = auth.uid()));


create policy "Enable read access for private event"
on "public"."events"
as permissive
for select
to authenticated
using (((type = 'private'::event_types) AND is_participant_of(auth.uid(), invite_code)));


create policy "Enable read access for public event"
on "public"."events"
as permissive
for select
to public
using ((type = 'public'::event_types));


create policy "Enable update for users based on uid"
on "public"."events"
as permissive
for update
to public
using ((auth.uid() = author))
with check ((auth.uid() = author));


create policy "Enable event author to list"
on "public"."events_users_participation"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT events.id
   FROM events
  WHERE (events.author = auth.uid()))));


create policy "Enable insert if user_id = auth.uid()"
on "public"."events_users_participation"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));


create policy "Enable read if user_id = auth.uid()"
on "public"."events_users_participation"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Enable read access for all users"
on "public"."matchs"
as permissive
for select
to public
using (true);


create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."results"
as permissive
for insert
to authenticated
with check ((auth.uid() IN ( SELECT events.author
   FROM events
  WHERE (events.id = results.event_id))));


create policy "Enable read access for user who have access to the event"
on "public"."results"
as permissive
for select
to authenticated
using (check_allowed_event(auth.uid(), (auth.email())::character varying, event_id, false));


CREATE TRIGGER update_old_usernames_trigger AFTER UPDATE ON public.profiles FOR EACH ROW WHEN (((new.username)::text <> (old.username)::text)) EXECUTE FUNCTION append_old_usernames();


create policy "Authenticated user can upload image jpg, png in public folder U"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'events'::text) AND (storage.extension(name) = ANY (ARRAY['jpg'::text, 'png'::text])) AND (lower((storage.foldername(name))[1]) = 'public'::text)));


create policy "Authenticated user can upload image jpg, png in public folder"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'events'::text) AND (storage.extension(name) = ANY (ARRAY['jpg'::text, 'png'::text])) AND (lower((storage.foldername(name))[1]) = 'public'::text)));


create policy "Give access"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'events'::text));

insert into storage.buckets(id, name, public) VALUES ('events', 'events', true);



