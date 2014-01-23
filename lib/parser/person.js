'use strict';

var pegBuilder = require('./peg_builder'),
		movieParser = pegBuilder('../grammars/movie.pegjs');

function personParserGenerator(type,regex){
	return function personParser(data){
		var records = data.split("\n"),
			actor = {
				name: '',
				type: type,
				works: []
			};

		records.forEach(function parseRecord(record){
			var match = regex.exec(record),
				work;

			if (!match){ return ;}

			if (match[1]){ actor.name = match[1]; }
			work = movieParser(match[2])[0] || {};

			if (match[11]){
				work.role = match[11].replace(/[\[\]]/g, '');
			}

			actor.works.push(work);
		});

		if(!actor.works.length){
			return [null];
		}
		return [actor];
	};

}

module.exports = personParserGenerator;