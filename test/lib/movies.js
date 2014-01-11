var assert = require("assert");
var parsers = require("../../lib/parsers");

describe('Parser', function(){

	describe('for movie.list', function(){
		describe('when parse line with a movie', function(){
			it('should extract title and year', function(){
				var lineWithTitle = "\"Salmon & Pumkin\" (1995)",
					parsedJSONObject = [{title:'Salmon & Pumkin', year: "1995", type:"movie"}],
					output = parsers.movies(lineWithTitle);
				assert.deepEqual(output, parsedJSONObject);
			});

			it('should parse line for series', function(){
				var lineWithTitleAndEpisode = "\"Salmon & Pumkin\" (1995)",
					parsedJSONObject = [{title:'Salmon & Pumkin', year: "1995", type:"movie"}],
					output = parsers.movies(lineWithTitleAndEpisode);

				assert.deepEqual(output, parsedJSONObject);
			});

			it('should process multiple lines', function(){
				var linesWithTitles = "\"Salmon & Pumkin\" (1995)\n" +
						"Þettwa er ekkert mál (2006)				2006\n",
					parsedJSONObject = [{"title":"Salmon & Pumkin","year":"1995", type:"movie"},{"title":"Þettwa er ekkert mál","year":"2006", type:"movie"}],
					output = parsers.movies(linesWithTitles	);

				assert.deepEqual(output, parsedJSONObject);
			});
		});

		describe('when parse line with an episode', function(){
			it('should extract title and year', function(){
				var lineWithTitle = "\"Salmon & Pumkin\" (1995)" +
						" {I Think I Biwanwadwa/Zwazu's Off Dway Off (#3.8)}	1996",
					parsedJSONObject = [
						{
							title:"Salmon & Pumkin",
							year: "1995",
							type: "episode",
							episode: {
								title: "I Think I Biwanwadwa/Zwazu's Off Dway Off",
								season: "3",
								number: "8",
								year: "1996"
							}
						}
					],
					output = parsers.movies(lineWithTitle);
				assert.deepEqual(output, parsedJSONObject);
			});
		});
	});
});




