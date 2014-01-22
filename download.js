#!/usr/bin/env node
var program = require('commander');

program
	.version('0.0.1')
	.usage('./download.js to download all the necessary files from IMDB server.')
	.parse(process.argv);

var Downloader = require('./lib/downloader'),
		downloader = new Downloader({noisy:true});

downloader.on('completed', function(){
	console.log('all files were downloaded');
});

downloader.fetchAll();
