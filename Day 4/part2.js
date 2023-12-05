const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const cards = data
    .split('\n')
    .map((card) => card.trim())
    .map((card) => {
      const [winnersRaw, numbersRaw] = card
        .split('|')
        .map((part) => part.trim());
      const winners = winnersRaw
        .split(' ')
        .map(Number)
        .filter((num) => num > 0);
      const numbers = numbersRaw
        .split(' ')
        .map(Number)
        .filter((num) => num > 0);
      return [winners, numbers];
    });

  function countMatches(card, winningNumbers) {
    return card.filter((number) => winningNumbers.includes(number)).length;
  }

  let cardCounts = new Array(cards.length).fill(0);
  cardCounts[0] = 1;

  let matchesForEachCard = cards.map(([cardNumbers, winningNumbers]) =>
    countMatches(cardNumbers, winningNumbers)
  );

  for (let i = 0; i < cards.length; i++) {
    let copies = cardCounts[i];
    let matches = matchesForEachCard[i];

    for (let j = 1; j <= matches && i + j < cards.length; j++) {
      cardCounts[i + j] += copies;
    }
  }

  console.log(
    cardCounts.reduce((total, count) => total + count, 0) + cards.length
  );
});
