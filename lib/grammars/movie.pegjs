start = (line:line newline? {return line;})*

line
  =
    title:title space? year:year space? ignoredInput? newline
    {return {title: title, year: parseInt(year,10)} }
  /
    comment

title
  = quote? space?
      words:(word:word space? {return word;})+
    space? quote?
    {return words.join(' ');}

year = '(' numbers:numbers ')' {return numbers.join('');}

comment = [a-zA-Z0-9\w\n\-\=\b]+ {return null;}

word = letters:letter+ {return letters.join("");}
letter = [^\(\)\=\-\" \t]
numbers = [0-9]+
space = " "
newline = "\n"
quote = '"'
ignoredInput = [^\n]

