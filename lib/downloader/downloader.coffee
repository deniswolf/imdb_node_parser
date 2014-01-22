FTP  = require 'ftp'
fs   = require 'fs'
zlib = require 'zlib'

module.exports = class Downloader extends require('events').EventEmitter
  options:  {}
  host:     'ftp.fu-berlin.de'
  rootPath: '/pub/misc/movies/database'
  manifest: []
  files: [
    'actors.list.gz'
    'actresses.list.gz'
    'complete-crew.list.gz'
    'crazy-credits.list.gz'
    'genres.list.gz'
    'movies.list.gz'
  ]

  constructor: (options={}) ->
    @options.noisy = !!options.noisy or false

    @on 'completed', ->
      @client.end()
      console.log("Closed connection to #{@host}") if @options.noisy

    @on 'fetched', (options={}) ->
      console.log(if options.exists then "Skipped #{options.source} because #{options.target} already exists" else "Downloaded #{options.source} to #{options.target}") if @options.noisy
      @unzip options.target
      @manifest.push options.file
      @emit('completed', @) if @manifest.length >= @files.length

  fetchAll: ->
    @client = new FTP
    @client.on 'ready', =>
      console.log("Opened connection to #{@host}") if @options.noisy
      @download file for file in @files
    @client.connect
      host: @host

  download: (file) ->
    source = [@rootPath, file].join('/')
    target = "tmp/#{file}"

    fs.exists target, (exists) =>
      if exists
        @emit 'fetched',
          exists : true
          file   : file
          source : source
          target : target
      else
        console.log "Downloading #{source}" if @options.noisy
        @client.get source, (err, stream) =>
          throw err if err
          stream.once 'close', =>
            @emit 'fetched',
              exists : false
              file   : file
              source : source
              target : target
          stream.pipe fs.createWriteStream target
  
  unzip: (file) ->
    outputTarget = file.substring 0, file.lastIndexOf('.gz')
    input  = fs.createReadStream file
    output = fs.createWriteStream outputTarget
    input.pipe(zlib.createGunzip()).pipe output
