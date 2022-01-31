const { Builder, By, Key, until } = require('selenium-webdriver');

const GAME_APP_CSS = 'game-app';
const GAME_HELP_CSS = 'game-help';
const GAME_TILE_CSS = 'game-tile';
const WORDLE_TITLE = 'Wordle - A daily word game';
const ENV_HUB_URL = process.env.SELENIUM_HUB_URL;

class Driver {
  constructor(wdUrl = ENV_HUB_URL || 'http://localhost:4444/wd/hub',
    wordleUrl = 'https://www.powerlanguage.co.uk/wordle/')
  {
    this.wdUrl = wdUrl;
    this.wordleUrl = wordleUrl;
    this.ready = false;
  }

  async init() {
    this.driver = await new Builder().forBrowser('chrome')
    .usingServer(this.wdUrl).build();

    await this.driver.get(this.wordleUrl);
    await this.driver.wait(until.titleIs(WORDLE_TITLE), 1000);

    const gameAppHost = await this.driver.findElement(By.css(GAME_APP_CSS));
    this.appRoot = await gameAppHost.getShadowRoot();
    const help = await this.appRoot.findElement(By.css(GAME_HELP_CSS));
    await help.click();
    await new Promise(res => setTimeout(res, 1000));
    this.ready = true;
  }

  /**
   *
   * @param {String} word The word to enter into Wordle
   * @returns {Array} Array of strings representing the results of the guess. String values are 'correct', 'present' or 'absent'.
   */
  async guessWord(word) {
    await this.driver.findElement(By.css('body')).sendKeys(word, Key.RETURN);
    await new Promise(res => setTimeout(res, 5000));

    const rowHost = await this.appRoot
      .findElement(By.css(`game-row[letters="${word}"]`));
    const rowRoot = await rowHost.getShadowRoot();
    const tiles = await rowRoot.findElements(By.css(GAME_TILE_CSS));

    return await Promise.all(tiles.map(el => el.getAttribute('evaluation')));
  }

  async quit() {
    if (this.driver) await this.driver.quit();
  }
}



module.exports = Driver;
