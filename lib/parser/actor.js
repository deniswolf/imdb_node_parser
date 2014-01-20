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

function actorParser(record){
	var match = regex.exec(record);
	if(!match) {
		return [null];
	}
	return [{
		name: match[1],
		piece: movieParser(match[3])[0],
		character: match[11].replace(/[\[\]]/g,''),
		type: 'actor'
	}];
}

module.exports = actorParser;