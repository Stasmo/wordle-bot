const Guesser = require('./lib/guesser');

async function init() {
  const guesser = new Guesser();

  for (let i = 0; i < 6; i++) {
    const result = await guesser.guess();
    if (result) {
      console.log(`I won! The word was ${result}!`);
      break;
    }
  }
}

init();
