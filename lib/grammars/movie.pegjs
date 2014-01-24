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
    = title:seriesTitle space* year:yearAndVersion space* space* format? space* suspended:suspended? space* running:runningPeriod
    {return {title: title, year: year.year, version: year.version, suspended:suspended, type:'series', running: running} }

movie
  =
    title:notAYearToken+ year:yearAndVersion space* status? space* format:format? space* suspended:suspended? space* ignoredInput*
  {
    return {title: title.join('').trim(), year: year.year, version: year.version, suspended: suspended, format: format, type:'movie'};
  }

episode
  = title:seriesTitle space* year:yearAndVersion space* episode:episodeChunk
    {return {title: title, year: year.year, version: year.version, type: 'episode', episode:episode}}

comment = [^\n]+ {return null;}

seriesTitle = quote title:[^\"\n]+ quote {return title.join('');}

suspended = '{{SUSPENDED}}' {return true;}

runningPeriod
  = (from:(numbers/'????') '-' to:('????'/numbers))
  {return {from:from, to:to};}
  / year:(numbers/'????')
  {return {from:year, to:year};}

episodeChunk
  = "{" title:episodeTitle? format:format? space* no:episodeNo? "}" space+ year:('????'/episodeYear)?
  {
    no || (no = {});
    return {title:title, season:no.season, number: no.number, format: format, year:year};
  }
  / '{(' episodeDate:([0-9\-]+) ')}' {return {title:episodeDate.join('') };}

version = '/' romanNumeral:[IVXLCDM]+ {return romanNumeral.join('');}

title = quote? space? words:words space? quote? {return words;}

yearAndVersion = '(' numbers:(numbers/'????') version:version? ')' {return {year:numbers, version:version};}

episodeTitle
  = words:notAnEpisodeNumToken+ {return words.join('').trim();} 
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

notAnEpisodeNumToken = !(episodeNumExperssion/format) text:. {return text;}
episodeNumExperssion = '(#' [0-9]+ '.' [0-9]+ ')'/'}'

notAYearToken = !yearExpression text:. {return text;}

yearExpression
 = ('('[0-9][0-9][0-9][0-9]')')
 / '(????)'
 / ( '(????' '/' [A-Z]* ')')
 / ('('[0-9][0-9][0-9][0-9] '/' [A-Z]* ')')

format = '(' format:('TV'/'VG'/'V') ')' {return format;}
status = '{{' [A-Z]+ '}}'

word = letters:letter+ {return letters.join("");}
words = words:(word/space)+ {return words.join('').replace('"','').trim();}
letter = [^\(\) \t\{\}\n]
numbers = numbers:[0-9]+ {return numbers.join("")}
space = [ \t]
newline = [\n]
quote = '"'
ignoredInput = [^\n]
