'use strict';

var pegBuilder = require('./peg_builder'),
		movieParser = pegBuilder('../grammars/movie.pegjs'),
		regex = /(.*?)\t+((.*? \(\S{4,}\)) ?(\(\S+\))? ?(?!\{\{SUSPENDED\}\})(\{(.*?) ?(\(\S+?\))?\})? ?(\{\{SUSPENDED\}\})?)\s*(\(.*?\))?\s*(\(.*\))?\s*(\[.*\])?\s*(<.*>)?$/;

function actressParser(data){
	var records = data.split("\n"),
			actor = {
				name: '',
				type: 'actress',
				works: []
			};

	records.forEach(function parseRecord(record){
		var match = regex.exec(record),
				work;

		if (!match){ return ;}

		if (match[1]){ actor.name = match[1]; }
		work = movieParser(match[2])[0] || {};
		work.role = match[11];
		if (work.role){ work.role = work.role.replace(/[\[\]]/g, ''); }

		actor.works.push(work);
	});

	if(!actor.works.length){
		return [null];
	}
	return [actor];
}

module.exports = actressParser;