const Driver = require('./driver');
const { getWord } = require('./words');

class Guesser {
  constructor(driver = new Driver) {
    this.correct = {0: null, 1: null, 2: null, 3: null, 4: null};
    this.incorrect = {};
    this.present = [];
    this.absent = [];
    this.driver = driver;
  }

  async guess() {
    const word = getWord(
      this.correct, this.present, this.absent, this.incorrect
    );

    if (!this.driver.ready) {
      try {
        await this.driver.init();
      } catch(e) {
        console.error('Could not initialize driver');
        console.error(e);
        await this.driver.quit();
        throw e;
      }
    }

    console.log('Guessing word', word);

    try {
      const guessResult = await this.driver.guessWord(word);
      this.present = [];

      guessResult.forEach((result, j) => {
        switch (result) {
          case 'absent':
            return this.absent.push(word[j]);
          case 'present':
            this.incorrect[word[j]] = this.incorrect[word[j]] || [];
            this.incorrect[word[j]].push(j);
            return this.present.push(word[j]);
          case 'correct':
            return this.correct[j] = word[j];
        }
      });

      if (Object.values(this.correct).filter(v => v).length == 5) {
        return word;
      }
    } catch(e) {
      console.error('Could not guess');
      console.error(e);
      await this.driver.quit();
      throw e;
    }

  }
}

module.exports = Guesser;