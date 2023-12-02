const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
  const answer = data.split('').reduce((acc, cur) => {
    if (cur === '(') {
      acc++;
    } else {
      acc--;
    }
    return acc;
  }, 0);
  console.log(answer);
});
