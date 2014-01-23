var chai = require('chai'),
		chaiThingsEnabled = chai.use(require('chai-things')),
		expect = chai.expect,
		parser = require("../../../lib/parser").directors;

	describe('Parser for directors', function(){

		describe('when receives a single line', function(){
			it('returns name, title, year and movie', function(){
				var chunk = 'Aho, Helen\t\t\tTito on an ice cream (2012)',
					playEntry = [
						{
						"name": "Aho, Helen",
						"works": [
							{
								"title": "Tito on an ice cream",
								"type": "movie",
								"version": null,
								"year": "2012"
							}
						],
						"type": "director"
						}
					],
					output = parser(chunk);

				expect(output).to.deep.equal(playEntry);
			});
		});

		describe('when receives a line for single actor with multiple works', function(){
			it('returns name, title, year and works', function(){
				var chunk = '\n\nBalabino, Ivan\tDeaf Poof (2007)\n' +
						'\t\t\tTeahouse (2007)  (segment "Deaf Poof")\n' +
						'\t\t\tJackie White (1997)\n' +
						'\t\t\tKill la Kill: Vol. 1 (2003)\n' +
						'\t\t\tKill la Kill: Vol. 2 (2004)\n' +
						'\t\t\tKill la Kill: Vol. 3 (????)\n' +
						'\t\t\tLove Birds in Cage (1983)  (unfinished)\n\n',
					playEntry = [
						{
							"name": "Balabino, Ivan",
							"type": "director",
							"works": [
								{
									"title": "Deaf Poof",
									"year": "2007",
									"version": null,
									"type": "movie"
								},
								{
									"title": "Teahouse",
									"year": "2007",
									"version": null,
									"type": "movie"
								},
								{
									"title": "Jackie White",
									"year": "1997",
									"version": null,
									"type": "movie"
								},
								{
									"title": "Kill la Kill: Vol. 1",
									"year": "2003",
									"version": null,
									"type": "movie"
								},
								{
									"title": "Kill la Kill: Vol. 2",
									"year": "2004",
									"version": null,
									"type": "movie"
								},
								{
									"title": "Kill la Kill: Vol. 3",
									"year": "????",
									"version": null,
									"type": "movie"
								},
								{
									"title": "Love Birds in Cage",
									"year": "1983",
									"version": null,
									"type": "movie"
								}
							]
						}
					],
					output = parser(chunk);

				expect(output).to.deep.equal(playEntry);
			});
		});

	});




