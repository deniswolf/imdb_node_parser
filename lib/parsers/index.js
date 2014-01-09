'use strict';

var fs = require('fs');
var PEG = require('pegjs');
var path = require('path');


/**
 * Build PEG parser from *.pegjs file
 * @param filename
 * @returns {*}
 */
function buildPEG(filename){
	var peg = fs.readFileSync(path.join(__dirname, filename), 'utf8'),
		parser = PEG.buildParser(peg).parse;

	return parser;
}

var Parser = {};
Parser.imdbLikeMovie = buildPEG('../grammars/movie.pegjs');

module.exports = Parser;
