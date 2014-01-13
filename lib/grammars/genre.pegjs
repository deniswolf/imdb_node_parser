start = (newline* line:line newline* {return line;})*

line
  =
    movie
  /
    comment

movie
  =
    title:title space* year:yearAndVersion space* genre:genre ignoredInput*
    {return {title: title, year: year.year, version: year.version, genre:genre} }

comment = [^\n]+ {return null;}

genre = genre:word {return genre.toLowerCase();}

runningPeriod = (from:(numbers/'????') '-' to:('????'/numbers)) {return {from:from, to:to};}

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
