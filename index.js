var engulmap = {
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

var hangulJamo = {
  lead: undefined,
  vowel: undefined,
  tail: undefined,

  canAddConsonant: function() {
    return (this.lead == undefined || this.tail == undefined);
  },

  canAddVowel: function() {
    return (this.vowel == undefined);
  },

  canAddCharacter: function(engChar) {
    var isVowel = (vowels.indexOf(engChar) != -1);
    if (isVowel) {
      return this.canAddVowel();
    } else {
      if (nonTailConsonants.indexOf(engChar) != -1) {
        return (this.lead == undefined);
      }
      return this.canAddConsonant();
    }
  },

  addConsonant: function(consonant) {
    if (this.lead == undefined) {
      this.lead = consonant;
      // Rule 4: (This only applies to Hangul-English, this doesn't happen in normal Korean)  You can never start a character with the letter ㅇ (X),  This is because it is used as both a placeholder and the letter X.  If you want to start a word with the letter X, it must be it's own character, to let the reader know it's not a placeholder.   Like so:  Xeno = 으어노.
      if (consonant == "ㅇ") {
        this.vowel = "ㅡ";
      }
    } else if (this.tail == undefined) {
      this.tail = consonant;
      if (this.lead != undefined && this.vowel == undefined) {
        this.vowel = "ㅡ";
      }
    } else {
      throw "no space to add consonant";
    }
  },

  addVowel: function(vowel) {
    if (this.vowel == undefined) {
      this.vowel = vowel;
    }
    // Rule 1: If a vowel starts a word, or has no consonant preceding it, put the placeholder character ㅇ in front of it.
    if (this.lead == undefined) {
      this.lead = "ㅇ";
    }
  },

  toHangul: function() {
    if (this.lead == undefined && this.vowel == undefined) {
      return undefined;
    }
    if (this.lead != undefined && this.vowel == undefined) {
      this.vowel = "ㅡ";
    }
    return hangul.compose(this.lead, this.vowel, this.tail);
  },

  reset: function() {
    this.lead = undefined;
    this.vowel = undefined;
    this.tail = undefined;
  },

  toHangulAndReset: function() {
    var hangul = this.toHangul();
    if (hangul != undefined) {
      this.reset()
    }
    return hangul;
  }
}

function engToHangul(engStr) {
  var retStr = "";
  var uppercaseStr = engStr.toUpperCase();
  for (var i = 0, len = uppercaseStr.length; i < len; i++) {
    var c = uppercaseStr[i];

    // Use bigram if it's valid
    if (i < len-1) {
      var c2 = uppercaseStr[i+1]; // i+1 < len
      var bigram = c + c2;
      if (bigram in engulmap) {
        c = bigram; // Bigram exists. Use bigram.
        i++; // Don't iterate over the second letter (c2)
      }
    }

    // If we have a non-alphabet, add the current hangul char if it exists, then add the non-alphabet
    if (!(c in engulmap)) {
      var hangul = hangulJamo.toHangul();
      if (hangul != undefined) {
        retStr += hangul;
      }
      hangulJamo.reset();
      retStr += c;
      continue;
    }

    var isVowel = (vowels.indexOf(c) != -1);
    var jamo = engulmap[c];

    if (!hangulJamo.canAddCharacter(c)) {
      // Rule 7: If the third letter in a character is a consonant, and the next letter (The first of the next character) is a vowel, move the consonant from the first character to the second, so you don't have to use a placeholder.  Like so:    Instead of 탗오  (TAC - Placeholder+O), make it 타초  (TA - CO)
      var tail = undefined;
      if (isVowel && hangulJamo.tail != undefined) {
        tail = hangulJamo.tail;
        hangulJamo.tail = undefined;
      }

      var hangul = hangulJamo.toHangul();
      if (hangul != undefined) {
        retStr += hangul;
      }
      hangulJamo.reset();

      // Rule 7
      hangulJamo.lead = tail;
    }

    if (isVowel) {
      hangulJamo.addVowel(jamo);
    } else {
      hangulJamo.addConsonant(jamo);
    }
  }

  // Add last character if we've reached the end
  var hangul = hangulJamo.toHangul();
  if (hangul != undefined) {
    retStr += hangul;
  }
  hangulJamo.reset();

  return retStr;
}

hangulJamo.lead = "ㅁ";
hangulJamo.vowel = "ㅏ";
console.log("hangul jamo tohangul " + hangulJamo.toHangul())
hangulJamo.reset();

// var letters = ["A",
// "B",
// "C",
// "D",
// "E",
// "F",
// "G",
// "H",
// "I",
// "J",
// "K",
// "L",
// "M",
// "N",
// "O",
// "P",
// "Q",
// "R",
// "S",
// "T",
// "U",
// "V",
// "W",
// "X",
// "Y",
// "Z"];
//
// for (var i = 0; i < letters.length; i++) {
//   console.log(letters[i] + " " + engToHangul("Ba" + letters[i]));
//   hangulJamo.reset();
// }

strtoconvert = "Two matoran walk into a bar";
console.log(strtoconvert + " " + engToHangul(strtoconvert));

console.log("startin yo");

function genhangul() {
  var englishBox = document.getElementById('englishbox');
  var hangulBox = document.getElementById('hangulbox');
  hangulBox.value = engToHangul(englishBox.value);
}
