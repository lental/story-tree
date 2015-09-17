//select sn.*, snc.* from story_snippets sn
// JOIN story_snippets_closure snc
// ON (sn.id = snc.descendant)
// where snc.story_id = 1
// AND ) ;
exports.getFullStoryTree  = function(pool, story_id, callback) {
  var query = 'SELECT sn.*, snc.* FROM story_snippets sn ' +
              'JOIN story_snippets_closure snc ON (sn.id = snc.descendant) ' +
              'WHERE (snc.story_id = ? AND length = 1) ' +
              'OR snc.descendant = (SELECT snippet_id FROM stories where id=?) ' +
              /*'ORDER BY length ASC, ancestor ASC;'*/ '';
  console.log (query + ", " + story_id);
  pool.query(query, [story_id, story_id], function(err, snippets, fields) {
    if (err) {
      console.log("error getFullStoryTree: " + err);
      callback(null, {message: 'Invalid story query', code: 500});
    } else {
      callback(snippets, null);
    }
  });
};

exports.getAllStories  = function(pool, callback) {
  var query = 'SELECT * FROM stories';
  console.log (query + ", ");
  pool.query(query, function(err, stories, fields) {
    if (err) {
      console.log("error getAllStories: " + err);
      callback(null, {message: 'Invalid stories query', code: 500});
    } else {
      callback(stories, null);
    }
  });
};


exports.getStoryBranchFromLeafSnippet  = function(pool, snippet_id, callback) {
  var query = 'select sn.*, snc.* from story_snippets sn JOIN story_snippets_closure snc ON (sn.id = snc.ancestor) where snc.descendant = ? order by length desc;';
  console.log (query + ", ");
  pool.query(query, [snippet_id], function(err, snippets, fields) {
    if (err) {
      console.log("error getStoryBranchFromLeafSnippet: " + err);
      callback(null, {message: 'Invalid snippets branch query', code: 500});
    } else {
      callback(snippets, null);
    }
  });
};