const fs = require('fs');

const redCnt = 12;
const blueCnt = 13;
const greenCnt = 14;

let red = 0;
let blue = 0;
let green = 0;

fs.readFile('input.txt', 'utf8', (err, data) => {
  const inputArr = data.split('\n');
  const answer = inputArr
    .filter((str) => {
      const id = str.substring(5, str.indexOf(':'));
      const firstRoll = str
        .substring(str.indexOf(':') + 1, str.indexOf(';'))
        .trim()
        .split(', ');
      const secondRoll = str
        .substring(str.indexOf(';') + 1, str.lastIndexOf(';'))
        .trim()
        .split(', ');
      const thirdRoll = str
        .substring(str.lastIndexOf(';') + 1)
        .trim()
        .split(', ');

      firstRoll.forEach((roll) => {
        if (roll.includes('red')) {
          red = parseInt(roll.substring(0, roll.indexOf(' ')));
        } else if (roll.includes('blue')) {
          blue = parseInt(roll.substring(0, roll.indexOf(' ')));
        } else if (roll.includes('green')) {
          green = parseInt(roll.substring(0, roll.indexOf(' ')));
        }
      });

      if (red > redCnt || blue > blueCnt || green > greenCnt) {
        return false;
      }

      red = 0;
      blue = 0;
      green = 0;

      secondRoll.forEach((roll) => {
        if (roll.includes('red')) {
          red = parseInt(roll.substring(0, roll.indexOf(' ')));
        } else if (roll.includes('blue')) {
          blue = parseInt(roll.substring(0, roll.indexOf(' ')));
        } else if (roll.includes('green')) {
          green = parseInt(roll.substring(0, roll.indexOf(' ')));
        }
      });

      if (red > redCnt || blue > blueCnt || green > greenCnt) {
        return false;
      }

      red = 0;
      blue = 0;
      green = 0;

      thirdRoll.forEach((roll) => {
        if (roll.includes('red')) {
          red = parseInt(roll.substring(0, roll.indexOf(' ')));
        } else if (roll.includes('blue')) {
          blue = parseInt(roll.substring(0, roll.indexOf(' ')));
        } else if (roll.includes('green')) {
          green = parseInt(roll.substring(0, roll.indexOf(' ')));
        }
      });

      if (red > redCnt || blue > blueCnt || green > greenCnt) {
        return false;
      }

      return true;
    })
    .reduce((acc, cur) => {
      return acc + parseInt(cur.substring(5, cur.indexOf(':')));
    }, 0);
  console.log(answer);
});
