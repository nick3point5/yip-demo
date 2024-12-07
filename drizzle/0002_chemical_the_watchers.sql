ALTER TABLE `posts` RENAME COLUMN "lat" TO "sin_lat";--> statement-breakpoint
ALTER TABLE `posts` RENAME COLUMN "lon" TO "sin_lon";--> statement-breakpoint
ALTER TABLE `posts` ADD `cos_lat` real NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `cos_lon` real NOT NULL;