var config = require('../config/config');
var mysql = require('mysql');
var assert = require('assert')
var db = require('../util/db');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host    : config.mysql.host,
    user    : config.mysql.user,
    database: config.mysql.database,
    password: config.mysql.password });

/*
 * GET story/1
 */
exports.storyById = function(req, res){
  res.set('Cache-Control', 'max-age=10');
  db.getFullStoryTree(pool, req.params.id, function(snippets, err) {
    var builtTree = convertSnippetsToFullTree(snippets);
    console.log (JSON.stringify(builtTree));
    // res.send(JSON.stringify(builtTree));
    res.render('story', {treeJson: builtTree});
  });
};

function convertSnippetsToFullTree(snippets) {
  var builtTree = {};
  var root = snippets[0];
  assert(root.length == 0, "First snippet should be the root node");
  builtTree["root"] = root;
  builtTree[root.id] = [];
  for (var i = 1; i < snippets.length; i++) {
    var snip = snippets[i];
    if(!builtTree[snip.ancestor]) {
      builtTree[snip.ancestor] = [];
    }
    builtTree[snip.ancestor].push(snip);
  }
  return builtTree;
}

/*
 * GET stories
 */
exports.allStories = function(req, res){
  res.set('Cache-Control', 'max-age=10');
  db.getAllStories(pool, function(stories, err) {
    console.log (JSON.stringify(stories));
    res.render('story-list', {"storyList": stories});
  });
};

/*
 * GET snippets/id
 */
exports.snippetBranch = function(req, res){
  res.set('Cache-Control', 'max-age=10');
  db.getStoryBranchFromLeafSnippet(pool, req.params.id, function(snippets, err) {
    console.log (JSON.stringify(snippets));
    res.render('branch', {snippets: snippets});
  });
};