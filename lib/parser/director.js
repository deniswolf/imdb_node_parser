'use strict';

var pegBuilder = require('./peg_builder'),
		movieParser = pegBuilder('../grammars/movie.pegjs'),
		regex = /(.*?)\t+((.*? \(\S{4,}\)) ?(\(\S+\))? ?(?!\{\{SUSPENDED\}\})(\{(.*?) ?(\(\S+?\))?\})? ?(\{\{SUSPENDED\}\})?)\s*(\(.*?\))?\s*(\(.*\))?\s*(\[.*\])?\s*(<.*>)?$/;

function directorParser(data){
	var records = data.split("\n"),
			director = {
				name: '',
				type: 'director',
				works: []
			};

	records.forEach(function parseRecord(record){
		var match = regex.exec(record),
				work;

		if (!match){ return ;}

		if (match[1]){ director.name = match[1]; }
		work = movieParser(match[2])[0] || {};

		director.works.push(work);
	});

	if(!director.works.length){
		return [null];
	}
	return [director];
}

module.exports = directorParser;