insert into stories (id, name, snippet_id) values (1, "first story", 1);

insert into story_snippets (id, name, body) values
  (1, "first snippet", "This is the first snippet"),
  (2, "this is second snippet", "This is the second snippet, son of 1"),
  (3, "this is third snippet", "This is the third snippet, son of 1"),
  (4, "this is 4th snippet", "This is the fourth snippet, son of 2");

insert into story_snippets_closure (story_id, ancestor, descendant, length) values
  (1,1,1,0), 
  (1,1,2,1),
  (1,1,3,1),
  (1,1,4,2),
  (1,2,2,0),
  (1,2,4,1),
  (1,3,3,0),
  (1,4,4,0);

insert into stories (id, name, snippet_id) values (2, "The Story of Rodman", 5);

insert into story_snippets (id, name, body) values
  (5, "", "There once was a man "),
  (6, "this is second snippet", "named Rodman."),
  (7, "this is third snippet", "Rodman created life and death."),
  (8, "this is 4th snippet", "Death was Rodman's greatest mistake");


insert into story_snippets (id, name, body) values
  (9, "", "Rodman dreamed of becoming a culinary expert."),
  (10, "this is second snippet", "After spending 15 years at various professional restaurants, Rodman decided to "),
  (11, "", "start up his own restaurant!"),
  (12, "", "give up and become an extreme hula-hoopist.");


insert into story_snippets_closure (story_id, ancestor, descendant, length) values
  (2,5,5,0), 
  (2,5,6,1),
  (2,5,7,2),
  (2,5,8,3),
  (2,6,6,0),
  (2,6,7,1),
  (2,6,8,2),
  (2,7,7,0),
  (2,7,8,1),
  (2,8,8,0);

insert into story_snippets_closure (story_id, ancestor, descendant, length) values
  (2,9,9,0),
  (2,6,9,1),
  (2,5,9,2),
  (2,10,10,0),
  (2,9,10,1),
  (2,6,10,2),
  (2,5,10,3),
  (2,11,11,0),
  (2,10,11,1),
  (2,9,11,2),
  (2,6,11,3),
  (2,5,11,4),
  (2,12,12,0),
  (2,10,12,1),
  (2,9,12,2),
  (2,6,12,3),
  (2,5,12,4);


/*
select snippet_id from stories where id=1

//Get all parent-child relationships for the root.
select sn.*, snc.* from story_snippets sn JOIN story_snippets_closure snc ON (sn.id = snc.descendant) where snc.root =  AND length = 1;
select sn.*, snc.* from story_snippets sn JOIN story_snippets_closure snc ON (sn.id = snc.descendant) where snc.story_id = 1 AND (length = 1 OR snc.descendant = (select snippet_id from stories where id=1)) ;

SELECT sn.*, snc.* FROM story_snippets sn JOIN story_snippets_closure snc ON (sn.id = snc.descendant) WHERE (snc.ancestor = (select snippet_id from stories where id=?) AND length = 1)  OR snc.descendant = (select snippet_id from stories where id=?);, 1

// Get entire tree (no way to parse)
select sn.*, snc.* from story_snippets sn JOIN story_snippets_closure snc ON (sn.id = snc.descendant) where snc.ancestor = (select snippet_id from stories where id=1);

//Get all direct children
select sn.*, snc.* from story_snippets sn JOIN story_snippets_closure snc ON (sn.id = snc.descendant) where snc.ancestor = (select snippet_id from stories where id=1) AND length <= 1;

// Get the "Hot" story end-to-end


CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gplus_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

*/