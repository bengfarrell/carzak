var app = require('app');  // Module to control application life.
var path = require('path');
var BrowserWindow = require('browser-window');  // Module to create native browser window.

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function() {
    mainWindow = new BrowserWindow( { width: '800px', height: '600px' });
    mainWindow.loadUrl('file://' + __dirname + '/index.html' );
    mainWindow.openDevTools();
    console.log(process.version)
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});