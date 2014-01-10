'use strict';
var Transform = require('stream').Transform;

function pegStream(parser){
	var liner = new Transform( { objectMode: true } );

	liner._transform = function (line, encoding, done) {
		var record;
		try {
			record = parser(line)[0];
		} catch (er) {
			this.emit('error', new Error(er));
			return;
		}

		if(record){
			this.push(record);
		}
		done();
	};

	return liner;
}


module.exports = pegStream;