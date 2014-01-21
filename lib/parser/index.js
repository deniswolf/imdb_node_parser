'use strict';

var pegBuilder = require('./peg_builder');

module.exports = {
	movie: pegBuilder('../grammars/movie.pegjs'),
	genre: pegBuilder('../grammars/genre.pegjs'),
	actor: require('./actor'),
	actress: require('./actress')
};
