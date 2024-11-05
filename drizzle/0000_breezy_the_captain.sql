CREATE TABLE IF NOT EXISTS "opinions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"is_anonymous" boolean DEFAULT false NOT NULL,
	"building" text NOT NULL,
	"status" text NOT NULL,
	"willing_to_change" text NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
