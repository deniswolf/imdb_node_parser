start = (newline* line:line newline* {return line;})*

line
  =
    episode
  /
    series
  /
    movie
  /
    comment

series
  =
   title:title space* year:yearAndVersion space* running:runningPeriod
    {return {title: title, year: year.year, version: year.version, type:'series', running: running} }

movie
  =
    title:title space* year:yearAndVersion space* ignoredInput*
    {return {title: title, year: year.year, version: year.version, type:'movie'} }

episode
  =
  title:title space* year:yearAndVersion space* episode:episodeChunk
  {return {title: title, year: year.year, version: year.version, type: 'episode', episode:episode}}

comment = [^\n]+ {return null;}

runningPeriod = (from:(numbers/'????') '-' to:('????'/numbers)) {return {from:from, to:to};}

episodeChunk
  = "{" title:episodeTitle? no:episodeNo? "}" space+ year:episodeYear
  {
    no || (no = {});
    return {title:title, season:no.season, number: no.number, year:year};
  }

version = '/' romanNumeral:[IVXLCDM]+ {return romanNumeral.join('');}

title = quote? space? words:words space? quote? {return words;}

yearAndVersion = '(' numbers:numbers version:version? ')' {return {year:numbers, version:version};}

episodeTitle = space* words:words space* {return words;}

episodeYear = numbers:numbers {return numbers;}

episodeNo
	= "(#" season:numbers "." number:numbers ")"
{return {season:season, number:number};}


word = letters:letter+ {return letters.join("");}
words = words:(word:word space* {return word;})+ {return words.join(' ').replace('"','');}
letter = [^\(\)\" \t\{\}\n]
numbers = numbers:[0-9]+ {return numbers.join("")}
space = [ \t]
newline = [\n]
quote = '"'
ignoredInput = [^\n]
