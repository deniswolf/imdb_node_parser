'use strict';

var PersonParser = require('./person'),
		type = 'actor',
		// the same regex as for Actor
		regex = /(.*?)\t+((.*? \(\S{4,}\)) ?(\(\S+\))? ?(?!\{\{SUSPENDED\}\})(\{(.*?) ?(\(\S+?\))?\})? ?(\{\{SUSPENDED\}\})?)\s*(\(.*?\))?\s*(\(.*\))?\s*(\[.*\])?\s*(<.*>)?$/;

var directorParser = new PersonParser('director', regex);

module.exports = directorParser;