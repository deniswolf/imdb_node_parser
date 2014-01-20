var fs = require('fs'),
		path = require('path'),
		chai = require('chai'),
		chaiThingsEnabled = chai.use(require('chai-things')),
		expect = chai.expect,
		parser = require("../../../lib/parser").actor;

	describe('Parser for actors', function(){

		describe('when receives a single line', function(){
			it('returns name, title, year and character', function(){
				var chunk = '20DD and Friends\t\t\t20dd: Moscow Tour \'95 (1995) (TV)  [Themselves]',
					playEntry = [{
						name: '20DD and Friends',
						piece: {
							title: '20dd: Moscow Tour \'95',
							year: '1995',
							type: 'movie',
							version: null
						},
						character: 'Themselves',
						type: 'actor'
					}],
					output = parser(chunk);

				expect(output).to.deep.equal(playEntry);
			});
		});

		xdescribe('when receives massive of entries', function(){
//			var bulkTextExample = fs.readFileSync(path.join(__dirname, '../../fixtures/genres.fixture'), 'utf8'),
//					outputWithoutEmptyLines = parser(bulkTextExample).filter(function(record){return record;});
//
//			it('is able to parse all of them', function(){
//				expect(outputWithoutEmptyLines).to.have.length(78);
//			});
		});

	});




