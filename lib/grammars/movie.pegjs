start = (newline* line:line newline* {return line;})*

line
  =
    episode
  /
    movie
  /
    comment

movie
  =
    title:title space* year:year space* ignoredInput*
    {return {title: title, year: year, type:'movie'} }

episode
  =
  title:title space* year:year space* episode:episodeChunk
  {return {title: title, year: year, type: 'episode', episode:episode}}

comment = [^\n]+ {return null;}

episodeChunk
	= "{" title:episodeTitle? no:episodeNo? "}" space+ year:episodeYear ignoredInput*
{return {title:title, season:no.season, number: no.number, year:year}}

title
  = quote? space?
      words:(word:word space* {return word;})+
    space? quote?
    {return words.join(' ').replace('"','');}

year = '(' numbers:numbers ')' {return numbers.join('');}


episodeTitle
	= space*
	words:(word:word space* {return word;})+
	space*
{return words.join(' ').replace('"','');}

episodeYear
  = numbers:numbers {return numbers.join("")}

episodeNo
	= "(#" season:numbers "." number:numbers ")"
{return {season:season.join(""), number:number.join("")}}


word = letters:letter+ {return letters.join("");}
letter = [^\(\)\" \t\{\}]
numbers = [0-9]+
space = [ \t]
newline = [\n]
quote = '"'
ignoredInput = [^\n]
