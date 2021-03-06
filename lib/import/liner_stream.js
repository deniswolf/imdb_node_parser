'use strict';
var Transform = require('stream').Transform,
	util = require('util');

function LineSplitter(splitBy, options) {
	this.splitBy = splitBy;
	if(!options){
		options = {};
	}
	options.objectMode = true;
	Transform.call(this, options);
}

util.inherits(LineSplitter, Transform);

LineSplitter.prototype._transform = function (chunk, encoding, done) {
	var data = chunk.toString();
	if (this._lastLineData) {
		data = this._lastLineData + data;
	}

	var lines = data.split(this.splitBy);
	this._lastLineData = lines.pop();

	lines.forEach(this.push.bind(this));
	done();
};

LineSplitter.prototype._flush = function (done) {
	if (this._lastLineData) {
		this.push(this._lastLineData)
	}
	this._lastLineData = null;
	done();
};


module.exports = LineSplitter;