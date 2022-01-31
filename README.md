Wordle Bot
===

I created this bot to compete against me in wordle.
It doesn't handle words with repeated letters very well so I think I have a bit of an advantage there.

## Usage

Install the dependencies with `yarn install`.

Make sure you have a working selenium hub with chrome at `http://localhost:4444/wd/hub`.

```
npm start
```

Or you can run it in a docker container.

```
docker-compose up -d chrome
docker-compose run app
```

## Tests

Run the following command to run the tests.

```
npx mocha
```