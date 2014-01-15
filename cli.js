#!/usr/bin/env node
var program = require('commander');

program
	.version('0.0.1')
	.usage(': stream | node.js cli.js -t type | stream')
	.option('-t, --type', 'peg filter to apply')
	.parse(process.argv);

var Import = require('./lib/import');

if(!program.type){
	console.error('Please, provide type of data to parse. For more info add -h flag');
	process.exit();
}

var toggleImport = new Import(process.stdin, program.type, process.stdout);
