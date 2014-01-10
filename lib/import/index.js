'use strict';

var fs = require('fs');

var parsers = require('../parsers'),
	PegStream = require('./peg_stream'),
	LinerStream = require('./liner_stream'),
	ObjToBufferStream = require('./bufferizer_stream');

module.exports = function Import(filename, type){
	var sourceStream = fs.createReadStream(filename),
		linerStream = new LinerStream(),
		pegStream = new PegStream(parsers[type]),
		objToBufferStream = new ObjToBufferStream({objectMode:true});

	sourceStream.pipe(linerStream).pipe(pegStream).pipe(objToBufferStream).pipe(process.stdout);
};




