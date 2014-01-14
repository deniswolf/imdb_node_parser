'use strict';
var	parsers = require('../parser'),
	PegStream = require('./peg_stream'),
	LinerStream = require('./liner_stream'),
	ObjToBufferStream = require('./bufferizer_stream');

module.exports = function Import(sourceStream, type, outputStream){
	var linerStream = new LinerStream(),
		pegStream = new PegStream(parsers[type]),
		objToBufferStream = new ObjToBufferStream();

	sourceStream
		.pipe(linerStream)
		.pipe(pegStream)
		.pipe(objToBufferStream)
		.pipe(outputStream);
};




