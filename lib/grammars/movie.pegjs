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
  = title:seriesTitle space* year:yearAndVersion space* suspended:suspended? space* running:runningPeriod
    {return {title: title, year: year.year, version: year.version, suspended:suspended, type:'series', running: running} }

movie
  =
    title:words space* year:yearAndVersion space* ignoredInput*
    {return {title: title, year: year.year, version: year.version, type:'movie'} }

episode
  = title:seriesTitle space* year:yearAndVersion space* episode:episodeChunk
    {return {title: title, year: year.year, version: year.version, type: 'episode', episode:episode}}

comment = [^\n]+ {return null;}

seriesTitle = quote title:[^\"\n]+ quote {return title.join('');}

suspended = '{{SUSPENDED}}' {return true;}

runningPeriod = (from:(numbers/'????') '-' to:('????'/numbers)) {return {from:from, to:to};}

episodeChunk
  = "{" title:episodeTitle? no:episodeNo? "}" space+ year:('????'/episodeYear)?
  {
    no || (no = {});
    return {title:title, season:no.season, number: no.number, year:year};
  }
  / '{(' episodeDate:([0-9\-]+) ')}' {return {title:episodeDate.join('') };}

version = '/' romanNumeral:[IVXLCDM]+ {return romanNumeral.join('');}

title = quote? space? words:words space? quote? {return words;}

yearAndVersion = '(' numbers:(numbers/'????') version:version? ')' {return {year:numbers, version:version};}

episodeTitle
  = words:(words '(' words ')'  space* words*) {return words.join('');}
  / words:words {return words;}

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
