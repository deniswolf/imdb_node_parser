'use strict';

var pegBuilder = require('./peg_builder');

module.exports = {
	movies: pegBuilder('../grammars/movie.pegjs'),
	genres: pegBuilder('../grammars/genre.pegjs'),
	actors: require('./actor'),
	directors: require('./director'),
	actresses: require('./actress')
};
