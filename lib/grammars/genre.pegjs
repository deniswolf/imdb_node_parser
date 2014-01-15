start = (newline* line:line newline* {return line;})*

line
  =
  episode
  / series
  / movie
  / comment

movie
  =
    title:(words/bracedWordsMovie/space)+ space* year:yearAndVersion  space* status?  space* format? space* genre:genre
    {return {title: title.join(''), year: year.year, version: year.version, type: 'movie', genre:genre} }
  /
    title:(words/bracedWordsMovie/space)+ space* year:yearAndVersion  space* format?  space* status? space* genre:genre
    {return {title: title.join(''), year: year.year, version: year.version, type: 'movie', genre:genre} }

series
  =
  title:seriesTitle space* year:yearAndVersion space* status? space* format? space* genre:genre
  {return {title: title, year: year.year, version: year.version, type: 'series', genre:genre}}


episode =
  title:seriesTitle space* year:yearAndVersion space* status? episode:episodeChunk space* format? space* genre:genre
  {return {title: title, year: year.year, version: year.version, type: 'episode', episode:episode, genre:genre}}

seriesTitle = quote title:[^\"\n]+ quote {return title.join('');}

episodeChunk
  = "{" title:episodeTitle? no:episodeNo? "}" space+ year:('????'/episodeYear)?
  {
    no || (no = {});
    return {title:title, season:no.season, number: no.number, year:year};
  }
  / '{(' episodeDate:([0-9\-]+) ')}' {return {title:episodeDate.join('') };}

comment = [^\n]+ {return null;}

genre = genre:word {return genre.toLowerCase();}

format = '(' [A-Z]+ ')'

status = '{{' [A-Z]+ '}}'

runningPeriod = (from:(numbers/'????') '-' to:('????'/numbers)) {return {from:from, to:to};}

version = '/' romanNumeral:[IVXLCDM]+ {return romanNumeral.join('');}

title = quote? space? words:words space? quote? {return words;}

yearAndVersion = '(' numbers:(numbers/'????') version:version? ')' {return {year:numbers, version:version};}

episodeTitle
  = words:(words/space/bracedWords)+ {return words.join('');}
  / words:words {return words;}

episodeYear = numbers:numbers {return numbers;}

episodeNo
	= "(#" season:numbers "." number:numbers ")"
{return {season:season, number:number};}

bracedWords
  = words:( space* '(' [^\#\)\(] space* words* ')')+
  {return words.join('').replace(/,/g,'');}

bracedWordsMovie
= words:( space* !yearExpression '(' space* words* ')')
  {return words.join('').replace(/,/g,'');}

yearExpression
 = ('('[0-9][0-9][0-9][0-9]')')
 / '(????)'
 / ( '(????' '/' [A-Z]* ')')
 / ('('[0-9][0-9][0-9][0-9] '/' [A-Z]* ')')

word = letters:letter+ {return letters.join("");}
words = words:(word:word space* {return word;})+ {return words.join(' ').replace('"','');}
letter = [^\(\)\" \t\{\}\n]
numbers = numbers:[0-9]+ {return numbers.join("")}
space = [ \t]
newline = [\n]
quote = '"'
ignoredInput = [^\n]
