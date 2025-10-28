CREATE TABLE "habit" (
	"id" serial PRIMARY KEY NOT NULL,
	"habit_name" varchar(50) NOT NULL,
	"frequency" varchar(20) NOT NULL,
	"time_scheduled" text NOT NULL,
	"date_created" timestamp DEFAULT now() NOT NULL,
	"is_done" boolean DEFAULT false NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL
);
