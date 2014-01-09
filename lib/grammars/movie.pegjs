start = (line:line newline? {return line;})*

line
  =
    movie    
  /
    comment

movie
  =
    title:title space* year:year space* ignoredInput*
    {return {title: title, year: year} }

title
  = quote? space?
      words:(word:word space* {return word;})+
    space? quote?
    {return words.join(' ').replace('"','');}

year = '(' numbers:numbers ')' {return numbers.join('');}

comment = [\w\n\-\=\b]+ {return null;}

word = letters:letter+ {return letters.join("");}
letter = [^\(\)\=\-\" \t]
numbers = [0-9]+
space = " "
newline = [\n]
quote = '"'
ignoredInput = [^\n]

