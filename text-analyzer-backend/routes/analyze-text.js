const _ = require("lodash");

function analyzeText(text) {
  // Split the text into words
  const words = text.split(/\s+/);

  // Calculate word frequency
  const wordFrequency = _.countBy(words);

  // Find the top 5 most frequent words
  const topWords = _.chain(wordFrequency)
    .toPairs()
    .orderBy([1], ["desc"])
    .take(5)
    .fromPairs()
    .value();

  // Create pairs of adjacent words
  const wordPairs = [];
  for (let i = 0; i < words.length - 1; i++) {
    wordPairs.push(`${words[i]} ${words[i + 1]}`);
  }

  // Calculate co-occurred word frequency
  const coOccurredFrequency = _.countBy(wordPairs);

  // Find the top 5 most frequent co-occurred word pairs
  const topCoOccurredWords = _.chain(coOccurredFrequency)
    .toPairs()
    .orderBy([1], ["desc"])
    .take(5)
    .fromPairs()
    .value();

  return {
    topWords,
    topCoOccurredWords,
    wordFrequency,
  };
}

module.exports = {
  analyzeText,
};
