var fs = require('fs'),
		path = require('path'),
		chai = require('chai'),
		chaiThings = chai.use(require('chai-things')),
		expect = chai.expect,
		parser = require("../../lib/parser").movie;

	describe('Parser for movie.list', function(){
		describe('when receives line with a movie', function(){
			it('should extract title and year', function(){
				var lineWithTitle = "\"Salmon & Pumkin\" (1995)",
					parsedJSONObject = [{title:'Salmon & Pumkin', year: "1995", type:"movie"}],
					output = parser(lineWithTitle);
				expect(output).to.deep.equal(parsedJSONObject);
			});

			it('should process multiple lines', function(){
				var linesWithTitles = "\"Salmon & Pumkin\" (1995)\n" +
						"Þettwa er ekkert mál (2006)				2006\n",
					parsedJSONObject = [{"title":"Salmon & Pumkin","year":"1995", type:"movie"},{"title":"Þettwa er ekkert mál","year":"2006", type:"movie"}],
					output = parser(linesWithTitles	);

				expect(output).to.deep.equal(parsedJSONObject);
			});
		});

		describe('when receives line with series', function(){
			it('should extract title, year and running period', function(){
				var lineWithTitleAndEpisode = '"Bi.L.I.F. 2" (2013)					2013-????',
					parsedJSONObject = [{
						title:'Bi.L.I.F. 2',
						year: '2013',
						running: {
							from: "2013",
							to: "????"
						},
						type: 'series'
					}],
					output = parser(lineWithTitleAndEpisode);

				expect(output).to.deep.equal(parsedJSONObject);
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
					output = parser(lineWithTitle);
				expect(output).to.deep.equal(parsedJSONObject);
			});

			it('should extract data even if there is no title', function(){
				var lineWithTitle = '"Bi.L.wnya. No somos ángeles" (2007) {(#1.54)}		2007',
					parsedJSONObject = [
						{
							title:"Bi.L.wnya. No somos ángeles",
							year: "2007",
							type: "episode",
							episode: {
								title: null,
								season: "1",
								number: "54",
								year: "2007"
							}
						}
					],
					output = parser(lineWithTitle);
				expect(output).to.deep.equal(parsedJSONObject);
			});
		});

		describe('when receives a comment or general text line', function(){
			it('returns null', function(){
				var comment = "------ lalala",
					output = parser(comment);

				expect(output).to.deep.equal([null]);
			});
		});

		describe('when receives a bulk of mixed data', function () {
			var bulkTextExample = fs.readFileSync(path.join(__dirname, '../../fixtures/movie.fixture'), 'utf8'),
					exampleEpisode = {
						"title": "#3 Zingle",
						"year": "2006",
						"type": "episode",
						"episode": {
							"title": "Is the Grwnyass Greener?",
							"season": "1",
							"number": "1",
							"year": "2006"
						}
					},
					exampleMovie = {
						"title": "Znyachaznyarownyane podwórko",
						"year": "1974",
						"type": "movie"
					},
					exampleSeries = {
						"title": "#3 Zingle",
						"year": "2006",
						"type": "series",
						"running": {"from":"2006", "to":"????"}
					},
					output = [],
					outputWithoutEmptyLines = [];

			try {
				output = parser(bulkTextExample);
			} catch (e) {
				console.log(e);
			}

			outputWithoutEmptyLines = output.filter(function(record){return record !== null});

			it('should extract all entities properly',function(){
				expect(outputWithoutEmptyLines).to.have.length(236);
			});
			it('should extract movie', function(){
				expect(outputWithoutEmptyLines).to.include.one.deep.equal(exampleMovie);
			});
			it('should extract series', function(){
				expect(outputWithoutEmptyLines).to.include.one.deep.equal(exampleSeries);
			});
			it('should extract episodes', function(){
				expect(outputWithoutEmptyLines).to.include.one.deep.equal(exampleEpisode);
			});

		});
	});




