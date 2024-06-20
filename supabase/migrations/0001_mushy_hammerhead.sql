CREATE TABLE IF NOT EXISTS "voltage_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"voltage" double precision NOT NULL
);
--> statement-breakpoint
DROP TABLE "posts_table";--> statement-breakpoint
DROP TABLE "users_table";