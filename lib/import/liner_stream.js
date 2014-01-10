'use strict';
var Transform = require('stream').Transform;

function lineSplitter(){
	var liner = new Transform( { objectMode: true } );

	liner._transform = function (chunk, encoding, done) {
		var data = chunk.toString();
		if (this._lastLineData) {
			data = this._lastLineData + data;
		}

		var lines = data.split("\n");
		this._lastLineData = lines.pop();

		lines.forEach(this.push.bind(this));
		done();
	};

	liner._flush = function (done) {
		if (this._lastLineData) {
			this.push(this._lastLineData)
		}
		this._lastLineData = null;
		done();
	};

	return liner;
}


module.exports = lineSplitter;