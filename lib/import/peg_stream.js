'use strict';
var Transform = require('stream').Transform,
	util = require('util');

function PegStream(parser, options) {
	if(!options){
		options = {};
	}
	options.objectMode = true;
	this.parser = parser;

	Transform.call(this, options);
}

util.inherits(PegStream, Transform);

PegStream.prototype._transform = function (line, encoding, done) {
	var record;
	try {
		record = this.parser(line)[0];
	} catch (er) {
		this.emit('error', new Error(er));
		return;
	}

	if(null === record){
		console.error(line);
	}

	if(record){
		this.push(record);
	}
	done();
};

module.exports = PegStream;