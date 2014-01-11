var fs = require('fs'),
		path = require('path'),
		assert = require("assert"),
		parsers = require("../../lib/parsers");

	describe('Parser for movie.list', function(){
		describe('when receives line with a movie', function(){
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

		describe('when receives line with an episode', function(){
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

		describe('when receives a comment or general text line', function(){
			it('returns null', function(){
				var comment = "------ lalala",
					output = parsers.movies(comment);

				assert.deepEqual([null], output);
			});
		});

		describe('when receives a bulk of mixed data', function(){
			var bulkTextExample = fs.readFileSync(path.join(__dirname, '../../fixtures/movies.fixture'), 'utf8');

			try {
				output = parsers.movies(bulkTextExample);
			} catch (e){
				console.log(e)
			}



		});
	});




