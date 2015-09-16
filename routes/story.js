/*
 * GET story/1
 */

exports.storyById = function(req, res){
  res.set('Cache-Control', 'max-age=10');
  res.send('this will be a story:' + req.params.id);
};