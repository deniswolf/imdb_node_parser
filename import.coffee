lazy = require 'lazy'
fs   = require 'fs'

movies = []

firstLineFound = false

lazy(fs.createReadStream('tmp/movies.list'))
  .lines
  .forEach (line) ->
    if line.toString()
    
    console.log line.toString()

return


Downloader = require './lib/downloader'
downloader = new Downloader
downloader.on 'completed', ->
  
downloader.fetchAll()
