'use strict';
var	parsers = require('../parser'),
	PegStream = require('./peg_stream'),
	LinerStream = require('./liner_stream'),
	ObjToBufferStream = require('./bufferizer_stream');

module.exports = function Import(sourceStream, type, outputStream){
	var linerStream,
		pegStream = new PegStream(parsers[type]),
		objToBufferStream = new ObjToBufferStream(),
		isDataAboutPerson = ["actors","actresses","directors"].indexOf(type) !== -1;

	if(type === "movies" || type === "genres"){
		linerStream  = new LinerStream("\n");
	} else if (isDataAboutPerson) {
		linerStream  = new LinerStream("\n\n");
	} else {
		console.error("Unsupported type: ",type);
		process.exit(1);
	}

	sourceStream
		.pipe(linerStream)
		.pipe(pegStream)
		.pipe(objToBufferStream)
		.pipe(outputStream);
};




