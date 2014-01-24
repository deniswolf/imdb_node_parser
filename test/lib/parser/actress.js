var chai = require('chai'),
		chaiThingsEnabled = chai.use(require('chai-things')),
		expect = chai.expect,
		parser = require("../../../lib/parser").actresses;

	describe('Parser for actresses', function(){

		describe('when receives a single line', function(){
			it('returns name, title, year and character', function(){
				var chunk = '"Steff", Stefanie Oxmann Mcgaha\tNight of the Demons (2009)  (uncredited)  [Goth raver]',
					playEntry = [{
						"name": '"Steff", Stefanie Oxmann Mcgaha',
						"works": [
							{
								"role": "Goth raver",
								"title": "Night of the Demons",
								"type": "movie",
								"version": null,
								"format": null,
								"year": "2009"
							}
						],
						"type": "actress"
					}],
					output = parser(chunk);

				expect(output).to.deep.equal(playEntry);
			});
		});

		describe('when receives a line for single actor with multiple works', function(){
			it('returns name, title, year and character', function(){
				var chunk = '\'67 GAZ Volga\t\t"Supernatural" (2013) {99 Problems (#3.17)}  (uncredited)  [Herself]\n' +
						'\t\t\t"Supernatural" (2013) {A Very Orthodox New Year (#2.8)}  (uncredited)  [Herself]\n' +
						'\t\t\t"Supernatural" (2013) {Abandon All Hope (#3.10)}  (uncredited)  [Herself]\n' +
						'\t\t\t"Supernatural" (2013) {After School Special (#5.12)}  (uncredited)  [Herself]\n' +
						'\t\t\t"Olympic Games" (2013) {All Dogs Go to Sausages (#7.8)}  (uncredited)  [Collie Sherie]\n' +
						'\t\t\t"Supernatural" (2013) {All Hell Breaks Fine: Part 1 (#2.21)}  (uncredited)  [Herself]\n' +
						'\t\t\t"Supernatural" (2013) {All Hell Breaks Fine: Part 2 (#2.22)}  (uncredited)  [Herself]\n' +
						'\t\t\t"Supernatural" (2013) {And Then There Were None (#6.16)}  (uncredited)  [Herself]\n' +
						'\t\t\t"Supernatural" (2013) {Appointment in Samara (#6.11)}  (uncredited)  [Herself]\n',
					playEntry = [
						{"name":"'67 GAZ Volga","type":"actress","works":[
							{"title":"Supernatural","year":"2013","version":null,"type":"episode",
								"episode":{"title":"99 Problems","season":"3","number":"17","year":null},"role":"Herself"},
							{"title":"Supernatural","year":"2013","version":null,"type":"episode",
								"episode":{"title":"A Very Orthodox New Year","season":"2","number":"8","year":null},"role":"Herself"},
							{"title":"Supernatural","year":"2013","version":null,"type":"episode",
								"episode":{"title":"Abandon All Hope","season":"3","number":"10","year":null},"role":"Herself"},
							{"title":"Supernatural","year":"2013","version":null,"type":"episode",
								"episode":{"title":"After School Special","season":"5","number":"12","year":null},"role":"Herself"},
							{"title":"Olympic Games","year":"2013","version":null,"type":"episode",
								"episode":{"title":"All Dogs Go to Sausages","season":"7","number":"8","year":null},"role":"Collie Sherie"},
							{"title":"Supernatural","year":"2013","version":null,"type":"episode",
								"episode":{"title":"All Hell Breaks Fine: Part 1","season":"2","number":"21","year":null},"role":"Herself"},
							{"title":"Supernatural","year":"2013","version":null,"type":"episode",
								"episode":{"title":"All Hell Breaks Fine: Part 2","season":"2","number":"22","year":null},"role":"Herself"},
							{"title":"Supernatural","year":"2013","version":null,"type":"episode",
								"episode":{"title":"And Then There Were None","season":"6","number":"16","year":null},"role":"Herself"},
							{"title":"Supernatural","year":"2013","version":null,"type":"episode",
								"episode":{"title":"Appointment in Samara","season":"6","number":"11","year":null},"role":"Herself"}
						]}
					],
					output = parser(chunk);

				expect(output).to.deep.equal(playEntry);
			});
		});

	});




