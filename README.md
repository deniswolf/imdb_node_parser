imdb (node.js) parser
===========

It's a set of utilities and libs for obtaining files from IMDB's ftp and parsing them out to JSON.

## Utils
### `extract.js`
parses STDIN or file, writes JSON to STDOUT or file, for more info: `./extract.js -h`

### `download.js`
download archives from IMDB, extracts them and converts from `latin1` encoding to `utf8`, for more info: `./download.js -h`

##Currently supported files:

* movies.list
* genres.list
* actors.list
* actresses.list

##Extracted info:

### movies.list
Returns array of results with movies, episodes, series.

#### movie:
```js
{
  "title":"Movie Title",
  // year or ???? if unknown
  "year":"1995",
  // I, II etc for movies released in the same year with the same title
  "version": null,
  type:"movie"
}
```

#### series

```js
{
  "title": "Series Title",
  // year or ???? if unknown
  "year": "2006",
  // I, II etc for series released in the same year with the same title
  "version": null,
  // {SUSPENDED} if series were cancelled
  "suspended": null,
  "type": "series",
  // years when the show was produced, ???? for unknown or ongoing
  "running": {"from":"2006", "to":"????"}
}
```

#### episode
```js
{
  "title": "Series Title",
  "year": "2006",
  "version": null,
  "type": "episode",
  // episode-specific info
  "episode": {
    "title": "Episode Title",
    // season's number
    "season": "1",
    // episode's number in season
    "number": "1",
    "year": "2006"
  }
}
```

### genres.list
Returns a list of movies, episodes, series with Genre included.
Information is similar to movies.list, but could be less specific (suspended etc states could be omitted).

#### movie

```js
{
  "title": "Movie Title",
  "year": "2002",
  "version": null,
  "type": "movie",
  "genre": "drama"
}
```

#### series
```js
{
  "title": "Series Title",
  "year": "2002",
  "version": null,
  "type": "series",
  "genre": "drama"
}
```

#### episode
```js
{
  "title": "Series Title",
  "year": "2006",
  "version": null,
  "type": "episode",
  "episode": {
    "title": "Episode Title",
    "season": "1",
    "number": "1",
    "year": "2006"
  },
  "genre": "documentary"
}
```

### actors.list, actresses.list
Returns list of actors/actresses.
The only difference between returned info is **type**: "actor" or "actress" respectively.
Collectives, bands and groups could be listed as single actor/actresses (those are IMDB's specifics).

```js
{
  "name": "Actor's name",
  // list of actors works (same as in movies.list + actor's role)
  "works": [
    {
      "role": "Actor's role in piece",
      "title": "Some title",
      "type": "movie",
      "version": null,
      "year": "1995"
    }
  ],
  // "actor" or "actress"
  "type": "actor"
}
```
