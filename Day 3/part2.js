const fs = require('fs');

let currNumPos = 0;
let currGearPos = 0;
let partCnt = 0;

fs.readFile('input.txt', 'utf8', (err, data) => {
  const lines = data.split('\n').map((line) => line.trim());
  const answer = lines
    .map((line, index) => {
      currNumPos = 0;
      currGearPos = 0;

      const gears = line.match(/\*/g)?.map((gear) => {
        partCnt = 0;
        const gearPos = line.indexOf(gear, currGearPos);
        currGearPos = gearPos + gear.length;

        const prevLine = lines[Math.max(0, index - 1)]
          .substring(gearPos - 3, gearPos + 4)
          .split('.')
          .map(Number);

        const currLine = line
          .substring(gearPos - 3, gearPos + gear.length + 3)
          .match(/[0-9]/g);

        const nextLine = lines[Math.min(index + 1, lines.length - 1)]
          .substring(gearPos - 3, gearPos + 3)
          .match(/[0-9]/g);

        console.log(prevLine, currLine, nextLine);
        if (!prevLine && !currLine && !nextLine) {
          return [gear, false];
        } else {
          return [gear, true];
        }
      });

      //console.log(gears);

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
