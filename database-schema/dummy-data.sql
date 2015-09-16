insert into stories (id, name, snippet_id) values (1, "first story", 1);

insert into story_snippets (id, name, body) values
  (1, "first snippet", "This is the first snippet"),
  (2, "this is second snippet", "This is the second snippet, son of 1"),
  (3, "this is third snippet", "This is the third snippet, son of 1"),
  (4, "this is 4th snippet", "This is the fourth snippet, son of 2");

insert into story_snippets_closure (ancestor, descendant, length) values
  (1,1,0), 
  (1,2,1),
  (1,3,1),
  (1,4,2),
  (2,2,0),
  (2,4,1),
  (3,3,0),
  (4,4,0);

/*
select snippet_id from stories where id=1

// Get entire tree (no way to parse)
select sn.*, snc.* from story_snippets sn JOIN story_snippets_closure snc ON (sn.id = snc.descendant) where snc.ancestor = (select snippet_id from stories where id=1);

//Get all direct children
select sn.*, snc.* from story_snippets sn JOIN story_snippets_closure snc ON (sn.id = snc.descendant) where snc.ancestor = (select snippet_id from stories where id=1) AND length = 1;

// Get the "Hot" story end-to-end
select sn.*, snc.* from story_snippets sn JOIN story_snippets_closure snc ON (sn.id = snc.ancestor) where snc.descendant = 4 order by length desc;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gplus_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

*/