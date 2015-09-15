
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.set('Cache-Control', 'max-age=10');
  res.send('this will be the home page');
};

