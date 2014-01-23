(function() {
	var FTP = require('ftp'),
		fs = require('fs'),
		zlib = require('zlib'),
		Iconv = require('iconv').Iconv;

	var Downloader,
		__hasProp = {}.hasOwnProperty,
		__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	module.exports = Downloader = (function(_super) {
		__extends(Downloader, _super);

		Downloader.prototype.options = {};

		Downloader.prototype.host = 'ftp.fu-berlin.de';

		Downloader.prototype.rootPath = '/pub/misc/movies/database';

		Downloader.prototype.manifest = [];

		Downloader.prototype.files = [
			'actors.list.gz',
			'actresses.list.gz',
			'genres.list.gz',
			'movies.list.gz',
			'directors.list.gz'
		];

		function Downloader(options) {
			if (options == null) {
				options = {};
			}
			this.options.noisy = !!options.noisy || false;
			this.on('completed', function() {
				this.client.end();
				if (this.options.noisy) {
					return console.log("Closed connection to " + this.host);
				}
			});
			this.on('fetched', function(options) {
				if (options == null) {
					options = {};
				}
				if (this.options.noisy) {
					console.log(options.exists ? "Skipped " + options.source + " because " + options.target + " already exists" : "Downloaded " + options.source + " to " + options.target);
				}
				this.unzip(options.target);
				this.manifest.push(options.file);
				if (this.manifest.length >= this.files.length) {
					return this.emit('completed', this);
				}
			});
		}

		Downloader.prototype.fetchAll = function() {
			var _this = this;
			this.client = new FTP;
			this.client.on('ready', function() {
				var file, _i, _len, _ref, _results;
				if (_this.options.noisy) {
					console.log("Opened connection to " + _this.host);
				}
				_ref = _this.files;
				_results = [];
				for (_i = 0, _len = _ref.length; _i < _len; _i++) {
					file = _ref[_i];
					_results.push(_this.download(file));
				}
				return _results;
			});
			return this.client.connect({
				host: this.host
			});
		};

		Downloader.prototype.download = function(file) {
			var source, target,
				_this = this;
			source = [this.rootPath, file].join('/');
			target = "tmp/" + file;
			return fs.exists(target, function(exists) {
				if (exists) {
					return _this.emit('fetched', {
						exists: true,
						file: file,
						source: source,
						target: target
					});
				} else {
					if (_this.options.noisy) {
						console.log("Downloading " + source);
					}
					return _this.client.get(source, function(err, stream) {
						if (err) {
							throw err;
						}
						stream.once('close', function() {
							return _this.emit('fetched', {
								exists: false,
								file: file,
								source: source,
								target: target
							});
						});
						return stream.pipe(fs.createWriteStream(target));
					});
				}
			});
		};

		Downloader.prototype.unzip = function(file) {
			var outputTarget = file.substring(0, file.lastIndexOf('.gz')),
					input = fs.createReadStream(file),
					iconv = new Iconv('latin1','utf8'),
					output = fs.createWriteStream(outputTarget);

			return input.pipe(zlib.createGunzip()).pipe(iconv).pipe(output);
		};

		return Downloader;

	})(require('events').EventEmitter);

}).call(this);
