var fs = require('fs'),
		path = require('path'),
		chai = require('chai'),
		chaiThings = chai.use(require('chai-things')),
		expect = chai.expect,
		parser = require("../../../lib/parser").movies;

	describe('Parser for movie.list', function(){
		describe('when receives line with a movie', function(){
			it('should extract title and year', function(){
				var lineWithTitle = "Salmon & Pumkin (1995) (TV)",
					parsedJSONObject = [
						{title:'Salmon & Pumkin', year: "1995", "version": null, type:"movie", suspended: null, format: "TV"}
					],
					output = parser(lineWithTitle);
				expect(output).to.deep.equal(parsedJSONObject);
			});

			it('should process multiple lines', function(){
				var linesWithTitles = "Salmon & Pumkin (1995)\n" +
						"Þettwa er ekkert mál (2006)				2006\n",
					parsedJSONObject = [
						{"title":"Salmon & Pumkin","year":"1995", "version": null,  type:"movie", suspended: null, format: null},
						{"title":"Þettwa er ekkert mál","year":"2006", "version": null, type:"movie", suspended: null, format: null}
					],
					output = parser(linesWithTitles	);

				expect(output).to.deep.equal(parsedJSONObject);
			});
		});

		describe('when different movies have the same name', function(){
			it('should return specific version suffix', function(){
				var linesWithMovies = "Nostalgia (2006/I)          2006\n"+
						"Nostalgia (2006/II)         2006\n"+
						"Nostalgia (2007)          2007\n"+
						"Nostalgia (2008)          2008\n",
						firstMovie = { title: 'Nostalgia', year: '2006', version: 'I', type: 'movie', suspended: null, format: null },
						secondMovie = { title: 'Nostalgia', year: '2006', version: 'II', type: 'movie', suspended: null, format: null },
						output = parser(linesWithMovies);

				expect(output).
					to.include.one.deep.equal(firstMovie)
					.and.include.one.deep.equal(secondMovie);
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
						"suspended": null,
						"version": null,
						type: 'series'
					}],
					output = parser(lineWithTitleAndEpisode);

				expect(output).to.deep.equal(parsedJSONObject);
			});
		});

		describe('when receives line with an episode', function(){
			it('should extract title and year', function(){
				var lineWithTitle = "\"Salmon & Pumkin\" (1995)" +
						" {I Think I Biwanwadwa/Zwazu's Off Dway Off (V) (#3.8)}	1996",
					parsedJSONObject = [
						{
							title:"Salmon & Pumkin",
							year: "1995",
							version: null,
							type: "episode",
							episode: {
								title: "I Think I Biwanwadwa/Zwazu's Off Dway Off",
								format: "V",
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
							version: null,
							type: "episode",
							episode: {
								title: null,
								season: "1",
								number: "54",
								format: null,
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
			var bulkTextExample = fs.readFileSync(path.join(__dirname, '../../fixtures/movies.fixture'), 'utf8'),
					exampleEpisode = {
						"title": "#3 Zingle",
						"year": "2006",
						"version": null,
						"type": "episode",
						"episode": {
							"title": "Is the Grwnyass Greener?",
							"season": "1",
							"number": "1",
							"format": null,
							"year": "2006"
						}
					},
					exampleMovie = {
						"title": "Znyachaznyarownyane podwórko",
						"year": "1974",
						"version": null,
						"format": null,
						"suspended": null,
						"type": "movie"
					},
					exampleSeries = {
						"title": "#3 Zingle",
						"year": "2006",
						"version": null,
						"suspended": null,
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




