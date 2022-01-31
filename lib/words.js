const path = require('path');
const fs = require('fs');
const file = fs.readFileSync(path.join(__dirname, '5-letter-words.txt'));
const words = file.toString().split('\n').sort()
  .filter(word => word.trim().length == 5);

/**
 * Lots of iterating here for the filtering functions.
 * TODO: We know which letters are more likely to appear in words. We should use that knowledge when filtering out words to make better guesses.
 *
 * @param {Object} correct A mapping of index to letter for correct letters.
 * @param {Array} present An array of letters that must be present in the word.
 * @param {Array} absent An array of letters that must be absent in the word.
 * @param {Object} incorrect A mapping of letter to incorrect index.
 * @returns {String} A random word that has the right letters
 */
function getWord(correct, present, absent, incorrect) {
  let availableWords = words;

  // Filter out words where we know the correct letter, and the letter in
  // that index is wrong.
  availableWords = availableWords.filter(word => {
    const badLetter = [...word].find(
      (letter, i) => correct[i] && correct[i] != letter
    );

    return !badLetter;
  });

  // Filter out words that contain letters we know are absent.
  availableWords = availableWords.filter(word => {
    const absentLetter = [...word].find(
      (letter) => absent.includes(letter)
    );

    return !absentLetter;
  });

  availableWords = availableWords.filter(word => {

    // Filter out words that are missing our present letters.
    // TODO: Handle the case where the letter is present in addition
    //       to a duplicate letter in the correct spot.
    for(const letter of present) {
      if (word.indexOf(letter) < 0) {
        return false;
      }
    }

    // Filter out words that have the right letters, but in the wrong spot.
    const badLetter = [...word]
      .find((letter,i) => incorrect[letter] && incorrect[letter].includes(i));

    return !badLetter;
  });

  // Choose a random word from the available words.
  // Robots can get lucky too.
  // TODO: Weight words with more likely letters heavier in this choice.
  const word = availableWords[
    Math.floor(Math.random() * availableWords.length)
  ];

  return word;
}

module.exports = {
  getWord,
  words,
};