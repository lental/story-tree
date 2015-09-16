CREATE TABLE `stories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `snippet_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `story_snippets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) DEFAULT NULL,
  `body` text,
  PRIMARY KEY (`id`)
);

CREATE TABLE `story_snippets_closure` (
  `story_id` int(11) DEFAULT NULL,
  `ancestor` int(11) DEFAULT NULL,
  `descendant` int(11) DEFAULT NULL,
  `length` int(11) DEFAULT NULL
);
