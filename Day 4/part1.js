const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const cards = data.split('\n').map((card) => card.trim());

  const answer = cards.reduce((acc, card) => {
    let matchCnt = 0;
    let tempCnt = 0;

    const [winnersRaw, numbersRaw] = card.split('|').map((part) => part.trim());
    const winners = winnersRaw
      .split(' ')
      .map(Number)
      .filter((num) => num > 0);
    const numbers = numbersRaw
      .split(' ')
      .map(Number)
      .filter((num) => num > 0);

    numbers.forEach((num) => {
      if (winners.includes(num)) {
        matchCnt++;
      }
    });

    for (let i = 0; i < matchCnt; i++) {
      tempCnt = tempCnt === 0 ? 1 : (tempCnt *= 2);
    }

    return acc + tempCnt;
  }, 0);
  console.log(answer);
});
