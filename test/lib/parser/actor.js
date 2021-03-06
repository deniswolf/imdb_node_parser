var chai = require('chai'),
		chaiThingsEnabled = chai.use(require('chai-things')),
		expect = chai.expect,
		parser = require("../../../lib/parser").actors;

	describe('Parser for actors', function(){

		describe('when receives a single line', function(){
			it('returns name, title, year and character', function(){
				var chunk = '20DD and Friends\t\t\t20dd: Moscow Tour \'95 (1995) (TV)  [Themselves]',
					playEntry = [{
						"name": '20DD and Friends',
						"works": [
							{
								"role": "Themselves",
								"title": "20dd: Moscow Tour '95",
								"type": "movie",
								"version": null,
								"format": "TV",
								"suspended": null,
								"year": "1995"
							}
						],
						"type": 'actor'
					}],
					output = parser(chunk);

				expect(output).to.deep.equal(playEntry);
			});
		});

		describe('when receives a line for single actor with multiple works', function(){
			it('returns name, title, year and character', function(){
				var chunk = '20DD and Friends\t\t\t20dd: Moscow Tour \'95 (1995) (TV) {{SUSPENDED}} [Themselves]\n'+
				'\t\t\t\t"Die große Romance" (2010) {(#3.5)}  [Cats]',
					playEntry = [
						{"name": "20DD and Friends", "type": "actor", "works": [
							{
								"title": "20dd: Moscow Tour '95",
								"year": "1995",
								"version": null,
								"type": "movie",
								"format": "TV",
								"suspended": true,
								"role": "Themselves"
							},
							{"title": "Die große Romance", "year": "2010", "version": null, "type": "episode",
								"episode":
								{"title": null, "season": "3", "number": "5", "format":null, "year": null}, "role": "Cats"}
						]}
					],
					output = parser(chunk);
				expect(output).to.deep.equal(playEntry);
			});
		});

	});




