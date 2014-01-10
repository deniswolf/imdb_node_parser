var assert = require("assert");
var parsers = require("../../lib/parsers");

describe('Parser', function(){
	describe('for imdb-like movies list', function(){
		it('should parse line with title and year', function(){
			var lineWithTitle = "Some Title (1998)\n",
				parsedJSONObject = [{title:'Some Title', year: 1998}],
				output = parsers.movies(lineWithTitle);

			assert.deepEqual(output, parsedJSONObject);
		});
	});


	describe('for movies', function(){
		it('should extract title and year', function(){
			var lineWithTitle = "\"Salmon & Pumkin\" (1995) {I Think I Biwanwadwa/Zwazu's Off Dway Off (#3.8)}	1996",
				parsedJSONObject = [{title:'Salmon & Pumkin', year: "1995"}],
				output = parsers.movies(lineWithTitle);
			assert.deepEqual(output, parsedJSONObject);
		});

		it('should parse line for series', function(){
			var lineWithTitleAndEpisode = "\"Salmon & Pumkin\" (1995) {I Think I do/Or's Off Day Off (#3.8)}	1996",
				parsedJSONObject = [{title:'Salmon & Pumkin', year: "1995"}],
				output = parsers.movies(lineWithTitleAndEpisode);

			assert.deepEqual(output, parsedJSONObject);
		});

		it('should process multiple lines', function(){
			var linesWithTitles = "\"Salmon & Pumkin\" (1995) {I Think I do/Or's Off Day Off (#3.8)}	1996\n" +
					"Þettwa er ekkert mál (2006)				2006\n",
				parsedJSONObject = [{"title":"Salmon & Pumkin","year":"1995"},{"title":"Þettwa er ekkert mál","year":"2006"}],
				output = parsers.movies(linesWithTitles	);

			assert.deepEqual(output, parsedJSONObject);
		});
	});
});


return;


var i = require('./lib/import');
i('./fixtures/movies.fixture','movies');

var fs = require('fs');
var source = fs.createReadStream('./fixtures/movies.fixture');

p = require('./lib/import')(source,'movie');


p.on('readable', function () {

	var line = p.read();
	console.log('aaaa',line);
});

source.pipe(liner).pipe(p);