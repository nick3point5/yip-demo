CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`root` integer NOT NULL,
	`reply` integer NOT NULL,
	`message` text NOT NULL,
	`userId` integer NOT NULL,
	`lat` real NOT NULL,
	`lon` real NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `followers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`followed` integer NOT NULL
);
