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
   title:title space* year:year space* running:runningPeriod
    {return {title: title, year: year, type:'series', running: running} }

movie
  =
    title:title space* year:year space* ignoredInput*
    {return {title: title, year: year, type:'movie'} }

episode
  =
  title:title space* year:year space* episode:episodeChunk
  {return {title: title, year: year, type: 'episode', episode:episode}}

comment = [^\n]+ {return null;}

runningPeriod = (from:(numbers/'????') '-' to:('????'/numbers)) {return {from:from, to:to};}

episodeChunk
  = "{" title:episodeTitle? no:episodeNo? "}" space+ year:episodeYear ignoredInput*
  {
    no || (no = {});
    return {title:title, season:no.season, number: no.number, year:year};
  }

title = quote? space? words:words space? quote? {return words;}

year = '(' numbers:numbers ')' {return numbers;}

episodeTitle = space* words:words space* {return words;}

episodeYear = numbers:numbers {return numbers;}

episodeNo
	= "(#" season:numbers "." number:numbers ")"
{return {season:season, number:number};}


word = letters:letter+ {return letters.join("");}
words = words:(word:word space* {return word;})+ {return words.join(' ').replace('"','');}
letter = [^\(\)\" \t\{\}]
numbers = numbers:[0-9]+ {return numbers.join("")}
space = [ \t]
newline = [\n]
quote = '"'
ignoredInput = [^\n]
