const words = require('../lib/words');
const assert = require('assert');

describe('words', function() {
  describe('getWord', function() {
    it('should return a word', function() {
      const word = words.getWord({},[],[],{});
      assert(typeof word == 'string');
      assert(word.length > 0);
    });

    it('should return a word starting with s when we know the answer starts with s', function() {
      const word = words.getWord({0: 's'},[],[],{});
      assert(typeof word == 'string');
      assert(word.length > 0);
      assert(word.startsWith('s'));
    });

    it('should return a word containing s when we know the answer contains s', function() {
      for (let i = 0; i < 100; i++) {
        const word = words.getWord({},['s'],[],{});
        assert(typeof word == 'string');
        assert(word.length > 0);
        assert(word.indexOf('s') >= 0);
      }
    });

    it('should return a word absent of s when we know s is not in the answer', function() {
      for (let i = 0; i < 100; i++) {
        const word = words.getWord({},[],['s'],{});
        assert(typeof word == 'string');
        assert(word.length > 0);
        assert(word.indexOf('s') < 0);
      }
    });

    it('should return a word where s is present, but not first', function() {
      for (let i = 0; i < 100; i++) {
        const word = words.getWord({},['s'],[],{s: [0]});
        assert(typeof word == 'string');
        assert(word.length > 0);
        assert(word.indexOf('s') > 0);
      }
    });
  })
});

// TODO: Break down guesser into something more testable.
