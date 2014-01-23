'use strict';

var PersonParser = require('./person'),
		type = 'actor',
		regex = /(.*?)\t+((.*? \(\S{4,}\)) ?(\(\S+\))? ?(?!\{\{SUSPENDED\}\})(\{(.*?) ?(\(\S+?\))?\})? ?(\{\{SUSPENDED\}\})?)\s*(\(.*?\))?\s*(\(.*\))?\s*(\[.*\])?\s*(<.*>)?$/;

var actorParser = new PersonParser('actor', regex);

module.exports = actorParser;