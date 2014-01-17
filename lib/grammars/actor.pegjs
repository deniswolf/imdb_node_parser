lines = actors:Actor+ EOF {return actors;}

Actor = nick:Nickname? name:Name IgnoredInput (EOL/EOF)
{return {
  name: name,
  nickname: nick,
};}

Name = i:(first:(', '/[^ ]) l:NameLetters {return first.replace(',','').trim()+l+' ';})+
{return i.join('').trim();}

Nickname = "'" i:(l:NickLetters Space? {return l+' ';})+ ("',"/"'") Space
{return i.join('').trim();}

Space = [ ]
NickLetters = i:NickLetter+ {return i.join('');}
NickLetter = !(Space/"'") text:. {return text+'';}
NameLetters = i:NameLetter+ {return i.join('');}
NameLetter = !(Space/'"'/'('/',') text:. {return text+'';}
IgnoredInput = text:IgnoredToken+ {return text;}
IgnoredToken = !EOL text:. {return text;}
EOL = ("\n\n")
EOF = !.