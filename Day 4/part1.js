const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const cards = data.split('\n').map((card) => card.trim());

  const answer = cards.reduce((acc, curr) => {
    let matchCnt = 0;
    let tempCnt = 0;

    const winners = curr
      .substring(curr.indexOf(':') + 1, curr.indexOf('|'))
      .split(' ')
      .map(Number)
      .filter((num) => num > 0);
    const numbers = curr
      .substring(curr.indexOf('|') + 1)
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
