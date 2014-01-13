var fs = require('fs'),
		path = require('path'),
		chai = require('chai'),
		chaiThingsEnabled = chai.use(require('chai-things')),
		expect = chai.expect,
		parser = require("../../lib/parser").genre;

	describe('Parser for genres', function(){

		describe('when receives a single line', function(){
			it('returns title, year and genre', function(){
				var comment = 'Nosferatu, eine Symphonie des Grauens (1922)		Horror',
					movieWithGenre = [{
						title: 'Nosferatu, eine Symphonie des Grauens',
						year: '1922',
						genre: 'horror',
						version: null
					}],
					output = parser(comment);

				expect(output).to.deep.equal(movieWithGenre);
			});
		});

	});




