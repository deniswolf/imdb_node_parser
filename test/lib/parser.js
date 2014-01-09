var assert = require("assert");
var parsers = require("../../lib/parsers");

describe('Parser', function(){
	describe('for imdb-like movies list', function(){
		it('should parse line with title and year', function(){
			var lineWithTitle = "Some Title (1998)\n",
				parsedJSONObject = [{title:'Some Title', year: 1998}],
				output = parsers.imdbLikeMovie(lineWithTitle);

			assert.deepEqual(output, parsedJSONObject);
		});
	});
});
