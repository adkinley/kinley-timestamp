/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  
  app.route('/:timestamp').get(function(req, res) {
    var value = req.params.timestamp;
    var result = {"unix":null, "natural":null};

    var d;

    if (isNaN(value))
     d = new Date(value);
   else {
    d = new Date(value*1000);
   }

    if (d.toDateString()!=="Invalid Date") {
    result.unix = d.getTime()/1000;
    result.natural = d.toDateString();
    } 

    res.send(result);

  })
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
