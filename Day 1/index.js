const fs = require('fs');

const validStrings = [
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
  ['1', 1],
  ['2', 2],
  ['3', 3],
  ['4', 4],
  ['5', 5],
  ['6', 6],
  ['7', 7],
  ['8', 8],
  ['9', 9],
];

fs.readFile('Day_1_input.txt', 'utf-8', (err, data) => {
  const answer = data.split('\n').reduce((acc, curr) => {
    const tempArray = [];
    validStrings.map((v) => {
      let index = curr.indexOf(v[0]);
      while (index !== -1) {
        tempArray.push([v[1], curr.indexOf(v[0], index)]);
        index = curr.indexOf(v[0], index + 1);
      }
    });
    const digitArray = tempArray.sort((a, b) => a[1] - b[1]).map((v) => v[0]);
    return (
      acc +
      parseInt(
        digitArray[0].toString() + digitArray[digitArray.length - 1].toString()
      )
    );
  }, 0);
  console.log(answer);
});
