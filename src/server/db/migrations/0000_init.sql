CREATE TABLE "competitions" (
	"id" integer PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"emblem" text,
	"current_matchday" integer,
	CONSTRAINT "competitions_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" integer PRIMARY KEY NOT NULL,
	"competition_id" integer NOT NULL,
	"season" integer NOT NULL,
	"matchday" integer,
	"stage" text NOT NULL,
	"utc_date" timestamp with time zone NOT NULL,
	"status" text NOT NULL,
	"home_team_id" integer,
	"away_team_id" integer,
	"home_goals" integer,
	"away_goals" integer,
	"home_goals90" integer,
	"away_goals90" integer,
	"duration" text NOT NULL,
	"home_penalties" integer,
	"away_penalties" integer,
	"last_updated" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scorers" (
	"competition_id" integer NOT NULL,
	"season" integer NOT NULL,
	"player_id" integer NOT NULL,
	"player_name" text NOT NULL,
	"team_id" integer NOT NULL,
	"played_matches" integer DEFAULT 0 NOT NULL,
	"goals" integer DEFAULT 0 NOT NULL,
	"assists" integer DEFAULT 0 NOT NULL,
	"penalties" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "scorers_competition_id_season_player_id_pk" PRIMARY KEY("competition_id","season","player_id")
);
--> statement-breakpoint
CREATE TABLE "squad_players" (
	"id" integer PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"name" text NOT NULL,
	"position" text,
	"date_of_birth" date,
	"nationality" text
);
--> statement-breakpoint
CREATE TABLE "standings" (
	"competition_id" integer NOT NULL,
	"season" integer NOT NULL,
	"team_id" integer NOT NULL,
	"position" integer NOT NULL,
	"played_games" integer NOT NULL,
	"won" integer NOT NULL,
	"draw" integer NOT NULL,
	"lost" integer NOT NULL,
	"points" integer NOT NULL,
	"goals_for" integer NOT NULL,
	"goals_against" integer NOT NULL,
	CONSTRAINT "standings_competition_id_season_team_id_pk" PRIMARY KEY("competition_id","season","team_id")
);
--> statement-breakpoint
CREATE TABLE "sync_runs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sync_runs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"mode" text NOT NULL,
	"status" text NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone,
	"requests" integer DEFAULT 0 NOT NULL,
	"error" text
);
--> statement-breakpoint
CREATE TABLE "team_competitions" (
	"competition_id" integer NOT NULL,
	"season" integer NOT NULL,
	"team_id" integer NOT NULL,
	CONSTRAINT "team_competitions_competition_id_season_team_id_pk" PRIMARY KEY("competition_id","season","team_id")
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"short_name" text NOT NULL,
	"tla" text NOT NULL,
	"crest" text,
	"club_colors" text
);
--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_home_team_id_teams_id_fk" FOREIGN KEY ("home_team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_away_team_id_teams_id_fk" FOREIGN KEY ("away_team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scorers" ADD CONSTRAINT "scorers_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scorers" ADD CONSTRAINT "scorers_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "squad_players" ADD CONSTRAINT "squad_players_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "standings" ADD CONSTRAINT "standings_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "standings" ADD CONSTRAINT "standings_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_competitions" ADD CONSTRAINT "team_competitions_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_competitions" ADD CONSTRAINT "team_competitions_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "matches_competition_date_idx" ON "matches" USING btree ("competition_id","utc_date");--> statement-breakpoint
CREATE INDEX "matches_home_team_idx" ON "matches" USING btree ("home_team_id");--> statement-breakpoint
CREATE INDEX "matches_away_team_idx" ON "matches" USING btree ("away_team_id");--> statement-breakpoint
CREATE INDEX "squad_players_team_idx" ON "squad_players" USING btree ("team_id");--> statement-breakpoint
CREATE INDEX "team_competitions_team_idx" ON "team_competitions" USING btree ("team_id");