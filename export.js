#!/usr/bin/env node
var program = require('commander'),
		Import = require('./lib/import'),
		fs = require('fs'),
		path = require('path'),
		contentType,
		inputStream,
		outputStream;

program
	.version('0.0.2')
	.usage('-t type')
	.option('-t, --type [type]', 'peg filter to apply. default: movie', 'movies')
	.option('-p, --print', 'print results to STDOUT.')
	.option('-i, --input', 'accept input from STDIN.')
	.option('-f, --from [filename]', 'read from the [filename]')
	.option('-o, --output [filename]', 'write results to this file.')
	.parse(process.argv);

contentType = program.type;

if(program.print){
	outputStream = process.stdout;
} else {
	var outputFile = path.resolve(program.output);
	outputStream = fs.createWriteStream(outputFile);
}

if(program.input){
	inputStream = process.stdin;
} else if(program.from){
	inputStream = fs.createReadStream(path.resolve(program.from));
} else {
	inputStream = fs.createReadStream('./tmp/'+contentType+'.list');
}

if(!outputStream){
	console.error('please chose the output stream/file');
}

var toggleImport = new Import(inputStream, contentType, outputStream);
