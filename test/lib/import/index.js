var fs = require('fs'),
	Stream = require('stream'),
	path = require('path'),
	chai = require('chai'),
	chaiThingsEnabled = chai.use(require('chai-things')),
	expect = chai.expect,
	Import = require("../../../lib/import");

describe('Import', function () {

	it('accepts input and output streams', function () {
		var sourceStream = new Stream(),
				outputStream = new Stream(),
				initImport = function(){new Import(sourceStream, 'movies', outputStream);};

		expect(initImport).not.to.throw();
	});

	it('generates PEGs from source and returns them to output stream', function(done){
		var sourceStream = new Stream.Readable(),
				outputStream = new Stream.Writable({objectMode:true}),
				movieString = '"Bi.L.wnya. No somos ángeles" (2007) {(#1.54)}		2007',
				outputString = '{"title":"Bi.L.wnya. No somos ángeles","year":"2007","version":null,"type":"episode","episode":{"title":null,"season":"1","number":"54",\"format\":null,"year":"2007"}}\n';

		sourceStream._read = function(){
			sourceStream.push(movieString);

			//end of data, finish streaming
			sourceStream.push(null);
		};

		outputStream._write = function(data, enc, callback){
			expect(data).to.be.equal(outputString);
			done();
		};

		new Import(sourceStream, 'movies', outputStream);
	});

});



