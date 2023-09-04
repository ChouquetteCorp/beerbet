
INSERT INTO auth.users ( id, email) VALUES ('d65e1ec1-ac6a-4d97-b4c2-469f43da5d91', 'test@chouquettebet.fr');
INSERT INTO auth.users ( id, email) VALUES ('a9b07459-a01e-447a-9ec5-919bc5da33e1', 'test2@chouquettebet.fr');
INSERT INTO auth.users ( id, email) VALUES ('8b30718d-85f6-449a-9347-be1bac1b406c', 'test3@chouquettebet.fr');
INSERT INTO auth.users ( id, email) VALUES ('6404ecda-a3af-4b50-bf8c-c102bf6e05a7', 'test4@chouquettebet.fr');

update auth.users set
  "role" = 'authenticated',
  aud = 'authenticated',
  confirmation_token = '',
  created_at = now(),
  email_change = '',
  email_change_confirm_status = 0,
  email_change_token_new = '',
  email_confirmed_at = now(),
  encrypted_password = '$2a$10$vQCyRoGamfEBXOR05iNgseK.ukEUPV52W1B95Qt6Tb3kN4N32odji', -- "password"
  instance_id = '00000000-0000-0000-0000-000000000000',
  is_super_admin = false,
  last_sign_in_at = now(),
  raw_app_meta_data = '{"provider": "email", "providers": ["email"]}',
  raw_user_meta_data = '{}',
  recovery_token = '',
  updated_at = now()
;

UPDATE profiles SET old_usernames = '{"Michel", "Cédric", "Thomas"}' WHERE user_id = 'd65e1ec1-ac6a-4d97-b4c2-469f43da5d91';


INSERT INTO public.events VALUES 
  (1, TO_TIMESTAMP('2022-11-01 11:30:28', 'YYYY-MM-DD HH:MI:SS'),TO_TIMESTAMP('2023-11-25 11:31:44', 'YYYY-MM-DD HH:MI:SS'),'Le Grand champion','Une bataille incontournable','Le parie se fait sur la forme d un pot commun','Nantes','d65e1ec1-ac6a-4d97-b4c2-469f43da5d91','{"Jean", "Ervin"}', 'https://xszsqmzqzrgkpqzwuhpi.supabase.co/storage/v1/object/public/bucket-public/versus1.jpg', NULL, false, 'niji.fr', '46b5883c-9c93-4d48-9af3-49a835454633', 'private', NULL ),
  (2, TO_TIMESTAMP('2022-11-01 11:30:28', 'YYYY-MM-DD HH:MI:SS'),TO_TIMESTAMP('2022-11-25 11:31:44', 'YYYY-MM-DD HH:MI:SS'),'Event 2 (not for test3)','Une bataille incontournable','Le parie se fait sur la forme d un pot commun','Nantes','d65e1ec1-ac6a-4d97-b4c2-469f43da5d91','{"Jean", "Ervin"}', 'https://xszsqmzqzrgkpqzwuhpi.supabase.co/storage/v1/object/public/bucket-public/versus2.jpg', 'Jean', true, NULL, 'b2037202-c155-4ea5-99c0-6c37fe4717bf', 'private', TO_TIMESTAMP('2022-11-26 11:30:28', 'YYYY-MM-DD HH:MI:SS') );

SELECT setval('events_id_seq', 2);

INSERT INTO  public.results(event_id, from_id, to_id, number) VALUES
  (2, 'd65e1ec1-ac6a-4d97-b4c2-469f43da5d91', 'a9b07459-a01e-447a-9ec5-919bc5da33e1', 1),
  (2, 'd65e1ec1-ac6a-4d97-b4c2-469f43da5d91', '8b30718d-85f6-449a-9347-be1bac1b406c', 2);


INSERT INTO public.bets (event_id, user_id, number, guess) VALUES
  (2, 'd65e1ec1-ac6a-4d97-b4c2-469f43da5d91', 3, 'Ervin'),
  (2, 'a9b07459-a01e-447a-9ec5-919bc5da33e1', 1, 'Jean'),
  (2, '8b30718d-85f6-449a-9347-be1bac1b406c', 2, 'Jean');


INSERT INTO public.events_users_participation  ( "user_id","event_code") VALUES 
  ('d65e1ec1-ac6a-4d97-b4c2-469f43da5d91', 'b2037202-c155-4ea5-99c0-6c37fe4717bf')
, ('a9b07459-a01e-447a-9ec5-919bc5da33e1', 'b2037202-c155-4ea5-99c0-6c37fe4717bf')
, ('8b30718d-85f6-449a-9347-be1bac1b406c', 'b2037202-c155-4ea5-99c0-6c37fe4717bf');



INSERT INTO matchs (sport, league, date, team_a, team_b, venue, api_id,city)  
VALUES 
 ('football','Coupe de France','2053-04-29 19:00:00+00','Nantes','Toulouse','Stade de France',1020767,'Saint-Denis'),
 ('football','Feminine Division 1','2053-05-07 10:45:00+00','Paris Saint Germain W','Paris FC W','Stade Municipal Georges Lefèvre',931888,'Saint-Germain-en-Laye'),
 ('football','Feminine Division 1','2053-05-06 11:30:00+00','Soyaux W','Guingamp W','Stade Léo Lagrange',931889,'Soyaux'),
 ('football','Feminine Division 1','2053-05-06 11:30:00+00','Rodez W','Bordeaux W','Stade Paul Lignon',931890,'Rodez'),
 ('football','Feminine Division 1','2053-05-06 11:30:00+00','FC Fleury 91 W','Montpellier W','Terrain Walter Felder',931891,'Fleury Merogis'),
 ('football','Feminine Division 1','2053-05-06 11:30:00+00','Le Havre W','Stade de Reims W','Stade Océane',931892,'Le Havre'),
 ('football','Feminine Division 1','2053-05-06 11:30:00+00','Dijon W','Lyon W','Stade Gaston-Gérard',931893,'Dijon'),
 ('football','Feminine Division 1','2053-05-21 19:00:00+00','Paris Saint Germain W','Lyon W','Stade Jean Bouin',931894,'Paris'),
 ('football','Feminine Division 1','2053-05-21 10:30:00+00','Paris FC W','Soyaux W','Stade Robert Bobin',931895,'Bondoufle'),
 ('football','Feminine Division 1','2053-05-21 10:30:00+00','Guingamp W','Rodez W','Stade Fred Aubert',931896,'Saint-Brieuc'),
 ('football','Feminine Division 1','2053-05-21 10:30:00+00','Bordeaux W','FC Fleury 91 W','Stade Sainte-Germaine',931897,'Le-Bouscat'),
 ('football','Feminine Division 1','2053-05-21 10:30:00+00','Montpellier W','Le Havre W','Stade Bernard Gasset Terrain n°7',931898,'Montpellier'),
 ('football','Feminine Division 1','2053-05-21 10:30:00+00','Stade de Reims W','Dijon W','Stade Louis Blériot N°2',931899,'Bétheny'),
 ('football','Feminine Division 1','2053-05-27 13:00:00+00','Soyaux W','Paris Saint Germain W','Stade Lebon',931900,'Angoulême'),
 ('football','Feminine Division 1','2053-05-27 13:00:00+00','Rodez W','Paris FC W','Stade Paul Lignon',931901,'Rodez'),
 ('football','Feminine Division 1','2053-05-27 13:00:00+00','FC Fleury 91 W','Guingamp W','Stade Auguste Gentelet',931902,'Fleury-Mérogis'),
 ('football','Feminine Division 1','2053-05-27 13:00:00+00','Le Havre W','Bordeaux W','Stade Océane',931903,'Le Havre'),
 ('football','Feminine Division 1','2053-05-27 13:00:00+00','Dijon W','Montpellier W','Stade des Poussots',931904,'Dijon'),
 ('football','Feminine Division 1','2053-05-27 13:00:00+00','Lyon W','Stade de Reims W','Stade Gérard Houllier 1',931905,'Décines-Charpieu'),
 ('football','Ligue 1','2053-04-23 13:00:00+00','Ajaccio','Stade Brestois 29','Stade François Coty',871780,'Ajaccio'),
 ('football','Ligue 1','2053-04-23 13:00:00+00','Lorient','Toulouse','Stade Yves Allainmat - Le Moustoir',871783,'Lorient'),
 ('football','Ligue 1','2053-04-23 13:00:00+00','Nantes','Estac Troyes','Stade de la Beaujoire - Louis Fonteneau',871784,'Nantes'),
 ('football','Ligue 1','2053-04-23 15:05:00+00','Montpellier','Rennes','Stade de la Mosson',871785,'Montpellier'),
 ('football','Ligue 1','2053-04-23 13:00:00+00','Nice','Clermont Foot','Allianz Riviera',871786,'Nice'),
 ('football','Ligue 1','2053-04-23 18:45:00+00','Lyon','Marseille','Groupama Stadium',871787,'Décines-Charpieu'),
 ('football','Ligue 1','2053-04-22 19:00:00+00','Lens','Monaco','Stade Bollaert-Delelis',871788,'Lens'),
 ('football','Ligue 1','2053-04-23 11:00:00+00','Reims','Strasbourg','Stade Auguste-Delaune II',871789,'Reims'),
 ('football','Ligue 1','2053-04-30 11:00:00+00','Monaco','Montpellier','Stade Louis II',871790,'Monaco'),
 ('football','Ligue 1','2053-04-30 13:00:00+00','Clermont Foot','Reims','Stade Gabriel Montpied',871791,'Clermont-Ferrand'),
 ('football','Ligue 1','2053-04-29 15:00:00+00','Lille','Ajaccio','Decathlon Arena – Stade Pierre-Mauroy',871792,'Villeneuve d''Ascq'),
 ('football','Ligue 1','2053-04-30 18:45:00+00','Marseille','Auxerre','Stade Orange Vélodrome',871793,'Marseille'),
 ('football','Ligue 1','2053-04-30 15:05:00+00','Paris Saint Germain','Lorient','Parc des Princes',871794,'Paris'),
 ('football','Ligue 1','2053-04-28 19:00:00+00','Strasbourg','Lyon','Stade de la Meinau',871795,'Strasbourg'),
 ('football','Ligue 1','2053-05-03 19:00:00+00','Stade Brestois 29','Nantes','Stade Francis-Le Blé',871796,'Brest'),
 ('football','Ligue 1','2053-04-30 13:00:00+00','Rennes','Angers','Roazhon Park',871797,'Rennes'),
 ('football','Ligue 1','2053-05-02 19:00:00+00','Toulouse','Lens','Stadium de Toulouse',871798,'Toulouse'),
 ('football','Ligue 1','2053-04-30 13:00:00+00','Estac Troyes','Nice','Stade de l''Aube',871799,'Troyes'),
 ('football','Ligue 1','2053-05-07 13:00:00+00','Ajaccio','Toulouse','Stade François Coty',871800,'Ajaccio'),
 ('football','Ligue 1','2053-05-07 13:00:00+00','Auxerre','Clermont Foot','Stade de l''Abbé Deschamps',871801,'Auxerre'),
 ('football','Ligue 1','2053-05-07 11:00:00+00','Angers','Monaco','Stade Raymond-Kopa',871802,'Angers'),
 ('football','Ligue 1','2053-05-07 13:00:00+00','Lorient','Stade Brestois 29','Stade Yves Allainmat - Le Moustoir',871803,'Lorient'),
 ('football','Ligue 1','2053-05-07 13:00:00+00','Nantes','Strasbourg','Stade de la Beaujoire - Louis Fonteneau',871804,'Nantes'),
 ('football','Ligue 1','2053-05-06 15:00:00+00','Nice','Rennes','Allianz Riviera',871805,'Nice'),
 ('football','Ligue 1','2053-05-07 15:05:00+00','Lyon','Montpellier','Groupama Stadium',871806,'Décines-Charpieu'),
 ('football','Ligue 1','2053-05-06 19:00:00+00','Lens','Marseille','Stade Bollaert-Delelis',871807,'Lens'),
 ('football','Ligue 1','2053-05-06 17:00:00+00','Reims','Lille','Stade Auguste-Delaune II',871808,'Reims'),
 ('football','Ligue 1','2053-05-07 18:45:00+00','Estac Troyes','Paris Saint Germain','Stade de l''Aube',871809,'Troyes'),
 ('football','Ligue 1','2053-05-14 13:00:00+00','Montpellier','Lorient','Stade de la Mosson',871812,'Montpellier'),
 ('football','Ligue 1','2053-05-13 19:00:00+00','Paris Saint Germain','Ajaccio','Parc des Princes',871814,'Paris'),
 ('football','Ligue 1','2053-05-14 13:00:00+00','Stade Brestois 29','Auxerre','Stade Francis-Le Blé',871817,'Brest'),
 ('football','Ligue 1','2053-05-14 13:00:00+00','Rennes','Estac Troyes','Roazhon Park',871818,'Rennes'),
 ('football','Ligue 1','2053-05-14 13:00:00+00','Toulouse','Nantes','Stadium de Toulouse',871819,'Toulouse'),
 ('football','Ligue 1','2053-05-27 19:00:00+00','Angers','Estac Troyes','Stade Raymond-Kopa',871830,'Angers'),
 ('football','Ligue 1','2053-05-27 19:00:00+00','Clermont Foot','Lorient','Stade Gabriel Montpied',871831,'Clermont-Ferrand'),
 ('football','Ligue 1','2053-05-27 19:00:00+00','Lille','Nantes','Decathlon Arena – Stade Pierre-Mauroy',871832,'Villeneuve d''Ascq'),
 ('football','Ligue 1','2053-05-27 19:00:00+00','Montpellier','Nice','Stade de la Mosson',871833,'Montpellier'),
 ('football','Ligue 1','2053-05-27 19:00:00+00','Lyon','Reims','Groupama Stadium',871834,'Décines-Charpieu'),
 ('football','Ligue 1','2053-05-27 19:00:00+00','Marseille','Stade Brestois 29','Stade Orange Vélodrome',871835,'Marseille'),
 ('football','Ligue 1','2053-05-27 19:00:00+00','Lens','Ajaccio','Stade Bollaert-Delelis',871836,'Lens'),
 ('football','Ligue 1','2053-05-27 19:00:00+00','Strasbourg','Paris Saint Germain','Stade de la Meinau',871837,'Strasbourg'),
 ('football','Ligue 1','2053-05-27 19:00:00+00','Rennes','Monaco','Roazhon Park',871838,'Rennes'),
 ('football','Ligue 1','2053-05-27 19:00:00+00','Toulouse','Auxerre','Stadium de Toulouse',871839,'Toulouse'),
 ('football','Ligue 1','2053-06-03 19:00:00+00','Ajaccio','Marseille','Stade François Coty',871840,'Ajaccio'),
 ('football','Ligue 1','2053-06-03 19:00:00+00','Auxerre','Lens','Stade de l''Abbé Deschamps',871841,'Auxerre'),
 ('football','Ligue 1','2053-06-03 19:00:00+00','Monaco','Toulouse','Stade Louis II',871842,'Monaco'),
 ('football','Ligue 1','2053-06-03 19:00:00+00','Lorient','Strasbourg','Stade Yves Allainmat - Le Moustoir',871843,'Lorient'),
 ('football','Ligue 1','2053-06-03 19:00:00+00','Nantes','Angers','Stade de la Beaujoire - Louis Fonteneau',871844,'Nantes'),
 ('football','Ligue 1','2053-06-03 19:00:00+00','Nice','Lyon','Allianz Riviera',871845,'Nice'),
 ('football','Ligue 1','2053-06-03 19:00:00+00','Paris Saint Germain','Clermont Foot','Parc des Princes',871846,'Paris'),
 ('football','Ligue 1','2053-06-03 19:00:00+00','Stade Brestois 29','Rennes','Stade Francis-Le Blé',871847,'Brest'),
 ('football','Ligue 1','2053-06-03 19:00:00+00','Reims','Montpellier','Stade Auguste-Delaune II',871848,'Reims'),
 ('football','Ligue 1','2053-06-03 19:00:00+00','Estac Troyes','Lille','Stade de l''Aube',871849,'Troyes'),
 ('football','UEFA Champions League','2053-05-09 19:00:00+00','Real Madrid','Manchester City','Estadio Santiago Bernabéu',1022981,'Madrid'),
 ('football','UEFA Champions League','2053-05-17 19:00:00+00','Manchester City','Real Madrid','Etihad Stadium',1022982,'Manchester'),
 ('football','UEFA Champions League','2053-05-10 19:00:00+00','AC Milan','Inter','Stadio Giuseppe Meazza',1022983,'Milano'),
 ('football','UEFA Champions League','2053-05-16 19:00:00+00','Inter','AC Milan','Stadio Giuseppe Meazza',1022984,'Milano'),
 ('football','UEFA Champions League Women','2053-04-23 13:30:00+00','VfL Wolfsburg W','Arsenal W','VOLKSWAGEN ARENA',1019860,'Wolfsburg'),
 ('football','UEFA Champions League Women','2053-05-01 16:45:00+00','Arsenal W','VfL Wolfsburg W','Emirates Stadium',1019861,'London'),
 ('football','UEFA Champions League Women','2053-04-27 16:45:00+00','Barcelona W','Chelsea W','Spotify Camp Nou',1019863,'Barcelona'),
 ('football','UEFA Europa League','2053-05-11 19:00:00+00','Juventus','Sevilla','Allianz Stadium',1022970,'Torino'),
 ('football','UEFA Europa League','2053-05-18 19:00:00+00','Sevilla','Juventus','Estadio Ramón Sánchez Pizjuán',1022971,'Sevilla'),
 ('football','UEFA Europa League','2053-05-11 19:00:00+00','AS Roma','Bayer Leverkusen','Stadio Olimpico',1022972,'Roma'),
 ('football','UEFA Europa League','2053-05-18 19:00:00+00','Bayer Leverkusen','AS Roma','BayArena',1022973,'Leverkusen')
  ON CONFLICT (api_id) DO UPDATE SET 
    sport = EXCLUDED.sport,
    league = EXCLUDED.league,
    date = EXCLUDED.date,
    team_a = EXCLUDED.team_a,
    team_b = EXCLUDED.team_b,
    venue = EXCLUDED.venue
  ;
