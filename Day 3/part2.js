const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
  const input = data.split('\n').filter((n) => n);

  const rows = input.length;
  const cols = input[0].length;

  const gears = {};

  const findGears = (str, num, y, x) => {
    x = x === -1 ? 0 : x;
    for (let k = 0; k < str.length; k++) {
      const char = str.charAt(k);
      if (char === '*') {
        const ind = `${y}-${x + k}`;
        gears[ind] = gears[ind]
          ? [...gears[ind], parseInt(num)]
          : [parseInt(num)];
      }
    }
  };

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const n = input[y][x];
      if (isNaN(n)) continue;

      let num = n;
      while (++x < cols) {
        if (Number.isInteger(parseInt(input[y][x]))) num += input[y][x];
        else break;
      }

      const up = input[Math.max(0, y - 1)].substring(x - num.length - 1, x + 1);
      const down = input[Math.min(rows - 1, y + 1)].substring(
        x - num.length - 1,
        x + 1
      );
      const left = input[y][x - num.length - 1] || '';
      const right = input[y][x] || '';

      findGears(up, num, y - 1, x - num.length - 1);
      findGears(down, num, y + 1, x - num.length - 1);
      findGears(left, num, y, x - num.length - 1);
      findGears(right, num, y, x);
    }
  }

  const answer = Object.values(gears)
    .filter((i) => i.length === 2)
    .map((j) => j[0] * j[1])
    .reduce((a, x) => a + x, 0);

  console.log(answer);
});
