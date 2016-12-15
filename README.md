# Hangul-English

Hangul-English is a little website utility that allows you to type English in Hangul.

## Inspiration

Hangul-English is a project I wrote after my trip to South Korea in November 2016. Hangul is such a beautiful writing system, a hybrid of the simple alphabet with compact Chinese character blocks, and I thought it would be fun to type English using it. Plus, I figured it could be useful for things like class and school notes, where the greater density could be helpful in squeezing more information onto one page without learning a whole new language or using something as radical as [Dotsies][dotsies].

## Character map

### Background

The character map is based on [this forum post by *Metax*][metax-forum-post]. I have made numerous improvements as I have noticed some inefficiencies and quirks with *Metax's* system:

- 'ㅇ' is used to represent 'X' when its original 'ng' sound would have been very useful.
- The extremely common "th" bigram has to be written in two characters, e.g. "the" is written "트허", and the rare 'z' letter is represented by one character. Inefficient.
- The characters corresponding to 'F', 'Q' and 'V' ('ㅉ', 'ㄸ' and 'ㅃ') cannot end a character, but [the letter 'F' ends 4.7% of words][norvig-frequencies].

### Map

#### Consonants

| Jamo | English | Remarks                                                                                  |
|------|---------|------------------------------------------------------------------------------------------|
| ㅂ    | b       |                                                                                          |
| ㄲ    | c       |                                                                                          |
| ㄷ    | d       |                                                                                          |
| ㅆ    | f       |                                                                                          |
| ㄱ    | g       |                                                                                          |
| ㅎ    | h       |                                                                                          |
| ㅉ    | j       | Cannot end a character. Rarely appears as the last letter in a word.                     |
| ㅋ    | k       | Mapped to the same character as 'K' as there are no more free consonants for 'Q'.        |
| ㄹ    | l       |                                                                                          |
| ㅁ    | m       |                                                                                          |
| ㄴ    | n       |                                                                                          |
| ㅍ    | p       |                                                                                          |
| ㅋ    | q       | Mapped to the same character as 'K' as there are no more free consonants for 'Q'.        |
| ㅈ    | r       |                                                                                          |
| ㅅ    | s       |                                                                                          |
| ㅌ    | t       |                                                                                          |
| ㅃ    | v       | Cannot end a character. Rarely appears as the last letter in a word.                     |
| ㄸ    | x       | Cannot end a character. Rarely appears as the last letter in a word.                     |
| ㅙ    | z       | Assigned something random because Z is so rarely used. We need to find something better. |

#### Vowels

| Jamo | English     |
|------|-------------|
| ㅏ    | a           |
| ㅓ    | e           |
| ㅣ    | i           |
| ㅗ    | o           |
| ㅜ    | u           |
| ㅘ    | w           |
| ㅟ    | y           |
| ㅡ    | placeholder |
| ㅕ    |             |
| ㅠ    |             |
| ㅒ    |             |
| ㅙ    |             |
| ㅞ    |             |
| ㅚ    |             |
| ㅢ    |             |

#### Bigrams

| Jamo | English | Remarks                                                      |
|------|---------|--------------------------------------------------------------|
| ㅊ    | th      | The most common bigram.                                      |
| ㅇ    | ng      | A common bigram. “Ng” is its original Korean pronounciation. |
| ㅛ    | io      |                                                              |
| ㅔ    | ei      |                                                              |
| ㅖ    | ie      |                                                              |
| ㅑ    | ia      |                                                              |
| ㅝ    | ou      |                                                              |
| ㅐ    | an      | So that "and" can be written as 1 character.                 |

## Sample

Below are the 50 most common words in English according to [this post by Peter Norvig][norvig-frequencies] typed in Hangul-English.

| Word  | Percent | Hangul-English |
|-------|---------|--------|
| the   | 7.14%   | 처      |
| of    | 4.16%   | 옸      |
| and   | 3.04%   | 앧      |
| to    | 2.60%   | 토      |
| in    | 2.27%   | 인      |
| a     | 2.06%   | 아      |
| is    | 1.13%   | 잇      |
| that  | 1.08%   | 챁      |
| for   | 0.88%   | 쏮      |
| it    | 0.77%   | 잍      |
| as    | 0.77%   | 앗      |
| was   | 0.74%   | 와앗     |
| with  | 0.70%   | 와잋     |
| be    | 0.65%   | 버      |
| by    | 0.63%   | 뷔      |
| on    | 0.62%   | 온      |
| not   | 0.61%   | 놑      |
| he    | 0.55%   | 허      |
| i     | 0.52%   | 이      |
| this  | 0.51%   | 칫      |
| are   | 0.50%   | 아저     |
| or    | 0.49%   | 옺      |
| his   | 0.49%   | 힛      |
| from  | 0.47%   | 쓰좀     |
| at    | 0.46%   | 앝      |
| which | 0.42%   | 와힊흐    |
| but   | 0.38%   | 붙      |
| have  | 0.37%   | 하뻐     |
| an    | 0.37%   | 애      |
| had   | 0.35%   | 핟      |
| they  | 0.33%   | 처위     |
| you   | 0.31%   | 위워     |
| were  | 0.31%   | 와어저    |
| their | 0.29%   | 쳊      |
| one   | 0.29%   | 오너     |
| all   | 0.28%   | 알르     |
| we    | 0.28%   | 와어     |
| can   | 0.22%   | 깨      |
| her   | 0.22%   | 헞      |
| has   | 0.22%   | 핫      |
| there | 0.22%   | 처저     |
| been  | 0.22%   | 버언     |
| if    | 0.21%   | 있      |
| more  | 0.21%   | 모저     |
| when  | 0.20%   | 와헌     |
| will  | 0.20%   | 와일르    |
| would | 0.20%   | 와월드    |
| who   | 0.20%   | 와호     |
| so    | 0.19%   | 소      |
| no    | 0.19%   | 노      |

Almost all of the 20 most common words can be represented by only 1 character.

## Todo

1. Write code to convert Hangul-English back to English.
2. Use a larger text input box.
3. Beautify the web page.

[metax-forum-post]: https://www.bzpower.com/board/topic/14553-linguists-corner-using-hangul-korean-alphabet-to-write-english/?p=732806
[norvig-frequencies]: http://norvig.com/mayzner.html
[dotsies]: http://dotsies.org
