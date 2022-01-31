const { words } = require('../lib/words');

function allInstancesOfLetterAreInCorrectLocations(word, guess, letter) {
  [...word].filter((l, i) => l == letter && guess[i] != word[i]).length == 0
}

class TestDriver {
  constructor(word) {
    this.ready = false;
    this.guesses = [];
    this.word = word || words[Math.floor(Math.random() * words.length)];
    console.log('The word is', this.word)
  }

  async init() {
    this.ready = true;
  }

  async guessWord(word) {
    this.guesses.push(word);

    return [...word].map((letter, i) => {
      if (this.word[i] == letter) return 'correct';
      if (!this.word.includes(letter)) return 'absent';
      return allInstancesOfLetterAreInCorrectLocations(this.word, word, letter) ? 'absent' : 'present';
    });
  }
}

module.exports = TestDriver;