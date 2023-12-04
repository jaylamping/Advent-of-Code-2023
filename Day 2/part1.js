const fs = require('fs');

const redCnt = 12;
const greenCnt = 13;
const blueCnt = 14;

fs.readFile('input.txt', 'utf8', (err, data) => {
  const inputArr = data.split('\n');
  const answer = inputArr.reduce((acc, cur) => {
    const rollArray = cur.split(': ')[1].split('; ');
    // .map((roll) => roll.trim().split(', '));
    console.log(rollArray);
    rollArray.forEach((roll) => {
      const colorArray = roll.split(', ');
      colorArray.forEach((color) => {
        console.log(color);
        if (color.includes('red')) {
          if (parseInt(color.substring(0, color.indexOf(' '))) <= redCnt) {
            console.log('hi');
            return acc;
          }
        }
        if (color.includes('blue')) {
          if (parseInt(color.substring(0, color.indexOf(' '))) <= blueCnt) {
            return acc;
          }
        }
        if (color.includes('green')) {
          if (parseInt(color.substring(0, color.indexOf(' '))) <= greenCnt) {
            return acc;
          }
        }
      });
      console.log(parseInt(cur.substring(5, cur.indexOf(':'))));
      return acc + parseInt(cur.substring(5, cur.indexOf(':')));
    });
  }, 0);
  console.log(answer);
});
