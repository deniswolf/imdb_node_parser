'use strict';

var PersonParser = require('./person'),
		type = 'actress',
		regex = /(.*?)\t+((.*? \(\S{4,}\)) ?(\(\S+\))? ?(?!\{\{SUSPENDED\}\})(\{(.*?) ?(\(\S+?\))?\})? ?(\{\{SUSPENDED\}\})?)\s*(\(.*?\))?\s*(\(.*\))?\s*(\[.*\])?\s*(<.*>)?$/;

var actressParser = new PersonParser('actress', regex);

module.exports = actressParser;