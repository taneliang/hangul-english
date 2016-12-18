var vowels = ["A","E","I","O","U", "W","Y", "IO", "EI", "IE", "IA", "OU", "AN", "Z"];
var nonFinalConsonants = ["J","V","X"];

function HangulBlock(Object) {
    this.initial = undefined;
    this.vowel = undefined;
    this.final = undefined;
};

HangulBlock.prototype.canAddConsonant = function() {
    return (this.initial == undefined || this.final == undefined);
};

HangulBlock.prototype.canAddVowel = function() {
    return (this.vowel == undefined);
};

HangulBlock.prototype.canAddCharacter = function(engChar) {
    var isVowel = (vowels.indexOf(engChar) != -1);
    if (isVowel) {
        return this.canAddVowel();
    } else {
        // Rule 6. you can not end a character with letters 'ㅉ', 'ㄸ' or 'ㅃ'.
        if (nonFinalConsonants.indexOf(engChar) != -1) {
            return (this.initial == undefined);
        }
        return this.canAddConsonant();
    }
};

HangulBlock.prototype.addConsonant = function(consonant) {
    if (this.initial == undefined) {
        this.initial = consonant;
        // Rule 7. You can never start a block with "ng" ('ㅇ'), as it is used as both a placeholder and the bigram "ng".
        if (consonant == "ㅇ") {
            // Rule 7. If you want to start a block with the bigram "ng", it must be followed with a "ㅡ".
            this.vowel = "ㅡ";
        }
    } else if (this.final == undefined) {
        this.final = consonant;
        if (this.initial != undefined && this.vowel == undefined) {
            // Rule 9. When there are 3 consonants in a row, there are some cases where you can stack consonants on top of each other separated by the placeholder vowel "ㅡ".
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
    // Rule 1. If a vowel starts a block, put the placeholder character 'ㅇ' in front of it.
    if (this.initial == undefined) {
        this.initial = "ㅇ";
    }
};

HangulBlock.prototype.toHangul = function() {
    if (this.initial == undefined && this.vowel == undefined) {
        return undefined;
    }
    if (this.initial != undefined && this.vowel == undefined) {
        // Rule 2. If a block is only formed by a initial consonant, the placeholder vowel "ㅡ" must be appended to it.
        this.vowel = "ㅡ";
    }
    return hangul.compose(this.initial, this.vowel, this.final);
};

HangulBlock.prototype.reset = function() {
    this.initial = undefined;
    this.vowel = undefined;
    this.final = undefined;
};

HangulBlock.prototype.toHangulAndReset = function() {
    var hangul = this.toHangul();
    if (hangul != undefined) {
        this.reset()
    }
    return hangul;
};
