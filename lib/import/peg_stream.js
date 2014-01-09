'use strict';
var Transform = require('stream').Transform;
var parser = require('../parsers').movies;

function pegStream(){
	var liner = new Transform( { objectMode: true } );

	liner._transform = function (line, encoding, done) {
		var json;
		try {
			json = parser(line)[0];
		} catch (er) {
			this.emit('error', new Error(er));
			return;
		}

		if(json){
			this.push(json);
		}
		done();
	};

	return liner;
}


module.exports = pegStream;