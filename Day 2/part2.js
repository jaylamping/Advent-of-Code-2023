const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const games = data.split('\n');
  const answer = games.reduce((acc, game) => {
    const rolls = game.split(': ')[1].split('; ');
    let colorCnt = {
      red: 0,
      green: 0,
      blue: 0,
    };
    rolls.forEach((roll) => {
      const colors = roll.trim().split(', ');
      colors.forEach((color) => {
        const [count, colorName] = color.split(' ');
        if (count > colorCnt[colorName]) {
          colorCnt[colorName] = parseInt(count);
        }
      });
    });
    return acc + colorCnt.red * colorCnt.green * colorCnt.blue;
  }, 0);
  console.log(answer);
});
