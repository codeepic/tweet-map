var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Module dependencies.
 */
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    config = require('./config/config.js');

/**
 * Main application entry file.
 * Note that the order of loading is important.
*/

// express settings
require('./config/express')(app);

// routes settings
require('./config/routes')(app, io);

// twitter settings
require('./config/twitter')(io);

var port = process.env.PORT || config.port;

// dev environments
app.configure('development', function(){
    // Start up the server on the port specified in the config
    server.listen(port, 'localhost', 511, function() {
        // Once the server is listening automatically open up a browser
        var open = require('open');
        //open('http://localhost:' + port + '/');
    });
    console.info(config.app.name + ' app started on port: ' + port + ' - environment: ' + env);
});

// production environments
app.configure('production', function(){
    app.listen(port, function() {
        console.info(config.app.name + ' app started on port: ' + port  + ' - with environment: ' + env);
    });
});

//expose app
exports = module.exports = app;
