'use strict';

var fs = require('fs');

var parsers = require('../parsers'),
	PegStream = require('./peg_stream'),
	LinerStream = require('./liner_stream');

module.exports = function Import(filename, type){
	var sourceStream = fs.createReadStream(filename),
		linerStream = new LinerStream(),
		pegStream = new PegStream(parsers[type]);

	pegStream.on('readable', function () {
		var line;
		while (null !== (line = pegStream.read())) {
			console.log('aaaa',line);
		}

	});

	sourceStream.pipe(linerStream).pipe(pegStream);
};




