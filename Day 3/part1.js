const fs = require('fs');

let currNumPos = 0;

fs.readFile('input.txt', 'utf8', (err, data) => {
  const lines = data.split('\n').map((line) => line.trim());
  const answer = lines
    .map((line, index) => {
      currNumPos = 0;
      const partNumbers = line.match(/\d+/g).map((number) => {
        const numPos = line.indexOf(number, currNumPos);
        currNumPos = numPos + number.length;

        const prevLine = lines[Math.max(0, index - 1)]
          .substring(numPos - 1, numPos + number.length + 1)
          .match(/[^0-9.]/g);

        const currLine = line
          .substring(numPos - 1, numPos + number.length + 1)
          .match(/[^.0-9]/g);

        const nextLine = lines[Math.min(index + 1, lines.length - 1)]
          .substring(numPos - 1, numPos + number.length + 1)
          .match(/[^0-9.]/g);

        if (!prevLine && !currLine && !nextLine) {
          return [number, false];
        } else {
          return [number, true];
        }
      });
      return partNumbers;
    })
    .flat()
    .filter((number) => number[1] === true)
    .map((number) => number[0])
    .reduce((acc, number) => acc + parseInt(number), 0);

  console.log(answer);
});
