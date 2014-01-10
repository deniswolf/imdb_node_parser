'use strict';

var Transform = require('stream').Transform;
var util = require('util');

function Bufferizer(options) {
	if(!options){
		options = {};
	}
	options.objectMode = true;
	Transform.call(this, options);
}

util.inherits(Bufferizer, Transform);

Bufferizer.prototype._transform = function (obj, encoding, done) {
	this.push(JSON.stringify(obj));
	done();
};

module.exports = Bufferizer;