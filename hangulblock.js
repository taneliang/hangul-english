function HangulBlock(Object) {
    this.lead = undefined;
    this.vowel = undefined;
    this.tail = undefined;
};

HangulBlock.prototype.canAddConsonant = function() {
    return (this.lead == undefined || this.tail == undefined);
};

HangulBlock.prototype.canAddVowel = function() {
    return (this.vowel == undefined);
};

HangulBlock.prototype.canAddCharacter = function(engChar) {
    var isVowel = (vowels.indexOf(engChar) != -1);
    if (isVowel) {
        return this.canAddVowel();
    } else {
        if (nonTailConsonants.indexOf(engChar) != -1) {
            return (this.lead == undefined);
        }
        return this.canAddConsonant();
    }
};

HangulBlock.prototype.addConsonant = function(consonant) {
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
};

HangulBlock.prototype.addVowel = function(vowel) {
    if (this.vowel == undefined) {
        this.vowel = vowel;
    }
    // Rule 1: If a vowel starts a word, or has no consonant preceding it, put the placeholder character ㅇ in front of it.
    if (this.lead == undefined) {
        this.lead = "ㅇ";
    }
};

HangulBlock.prototype.toHangul = function() {
    if (this.lead == undefined && this.vowel == undefined) {
        return undefined;
    }
    if (this.lead != undefined && this.vowel == undefined) {
        this.vowel = "ㅡ";
    }
    return hangul.compose(this.lead, this.vowel, this.tail);
};

HangulBlock.prototype.reset = function() {
    this.lead = undefined;
    this.vowel = undefined;
    this.tail = undefined;
};

HangulBlock.prototype.toHangulAndReset = function() {
    var hangul = this.toHangul();
    if (hangul != undefined) {
        this.reset()
    }
    return hangul;
};
