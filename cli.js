#!/usr/bin/env node
var program = require('commander');

program
	.version('0.0.1')
	.usage(': stream | node.js cli.js -t type | stream')
	.option('-t, --type [type]', 'peg filter to apply. default: movie', 'movie')
	.parse(process.argv);

var Import = require('./lib/import');

var toggleImport = new Import(process.stdin, program.type, process.stdout);
