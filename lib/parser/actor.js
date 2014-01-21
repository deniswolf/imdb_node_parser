'use strict';

var fs = require('fs');
var PEG = require('pegjs');
var path = require('path');

function buildPEG(filename){
	var peg = fs.readFileSync(path.join(__dirname, filename), 'utf8'),
		parser = PEG.buildParser(peg).parse;

	return parser;
}

var regex = /(.*?)\t+((.*? \(\S{4,}\)) ?(\(\S+\))? ?(?!\{\{SUSPENDED\}\})(\{(.*?) ?(\(\S+?\))?\})? ?(\{\{SUSPENDED\}\})?)\s*(\(.*?\))?\s*(\(.*\))?\s*(\[.*\])?\s*(<.*>)?$/;
var movieParser = buildPEG('../grammars/movie.pegjs');

function actorParser(data){
	var records = data.split("\n"),
		actor = {
			name: '',
			type: 'actor',
			works: []
		};
	records.forEach(function parseRecord(record){
		var match = regex.exec(record),
				work;
		if (!match){ return null;}

		if (match[1]){ actor.name = match[1]; }
		work = movieParser(match[2])[0] || {};
		work.role = match[11].replace(/[\[\]]/g,'');
		actor.works.push(work);
	});

	if(actor.works.length === 0){
		return [null];
	}
	return [actor];
}

module.exports = actorParser;