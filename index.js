var englishToHangulMap = {
    "A":"ㅏ",
    "B":"ㅂ",
    "C":"ㄲ",
    "D":"ㄷ",
    "E":"ㅓ",
    "F":"ㅆ",
    "G":"ㄱ",
    "H":"ㅎ",
    "I":"ㅣ",
    "J":"ㅉ",
    "K":"ㅋ",
    "L":"ㄹ",
    "M":"ㅁ",
    "N":"ㄴ",
    "O":"ㅗ",
    "P":"ㅍ",
    "Q":"ㅋ",
    "R":"ㅈ",
    "S":"ㅅ",
    "T":"ㅌ",
    "U":"ㅜ",
    "V":"ㅃ",
    "W":"ㅘ",
    "X":"ㄸ",
    "Y":"ㅟ",
    "Z":"ㅙ", // find a better character for this

    "TH":"ㅊ",
    "NG":"ㅇ",
    "IO":"ㅛ",
    "EI":"ㅔ",
    "IE":"ㅖ",
    "IA":"ㅑ",
    "OU":"ㅝ",
    "AN":"ㅐ"
};

var vowels = ["A","E","I","O","U", "W","Y", "IO", "EI", "IE", "IA", "OU", "AN", "Z"];
var nonTailConsonants = ["J","V","X"];

function engToHangul(engStr) {
  var retStr = "";
  var uppercaseStr = engStr.toUpperCase();
  var hangulBlock = new HangulBlock();

  for (var i = 0, len = uppercaseStr.length; i < len; i++) {
    var englishChar = uppercaseStr[i];

    // Use bigram if it's valid
    if (i < len-1) {
      var englishChar2 = uppercaseStr[i+1]; // i+1 < len
      var bigram = englishChar + englishChar2;
      if (bigram in englishToHangulMap) {
        englishChar = bigram; // Bigram exists. Use bigram.
        i++; // Don't iterate over the second letter (englishChar2)
      }
    }

    // If we have a non-alphabet, add the current hangul char if it exists, then add the non-alphabet
    if (!(englishChar in englishToHangulMap)) {
      var hangul = hangulBlock.toHangul();
      if (hangul != undefined) {
        retStr += hangul;
      }
      hangulBlock.reset();
      retStr += englishChar;
      continue;
    }

    var isVowel = (vowels.indexOf(englishChar) != -1);
    var hangulChar = englishToHangulMap[englishChar];

    if (!hangulBlock.canAddCharacter(englishChar)) {
      // Rule 7: If the third letter in a character is a consonant, and the next letter (The first of the next character) is a vowel, move the consonant from the first character to the second, so you don't have to use a placeholder.  Like so:    Instead of 탗오  (TAC - Placeholder+O), make it 타초  (TA - CO)
      var tail = undefined;
      if (isVowel && hangulBlock.tail != undefined) {
        tail = hangulBlock.tail;
        hangulBlock.tail = undefined;
      }

      var hangul = hangulBlock.toHangul();
      if (hangul != undefined) {
        retStr += hangul;
      }
      hangulBlock.reset();

      // Rule 7
      hangulBlock.lead = tail;
    }

    if (isVowel) {
      hangulBlock.addVowel(hangulChar);
    } else {
      hangulBlock.addConsonant(hangulChar);
    }
  }

  // Add last character if we've reached the end
  var hangul = hangulBlock.toHangul();
  if (hangul != undefined) {
    retStr += hangul;
  }

  return retStr;
}

function genhangul() {
  var englishBox = document.getElementById('englishbox');
  var hangulBox = document.getElementById('hangulbox');
  hangulBox.value = engToHangul(englishBox.value);
}
