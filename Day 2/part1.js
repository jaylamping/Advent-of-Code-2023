const fs = require('fs');

const colorLimits = {
  red: 12,
  green: 13,
  blue: 14,
};

fs.readFile('input.txt', 'utf8', (err, data) => {
  const games = data.split('\n');
  const answer = games.reduce((acc, game) => {
    const rolls = game.split(': ')[1].split('; ');
    const isValidGame = rolls.every((roll) => {
      const colors = roll.trim().split(', ');
      return colors.every((color) => {
        const [count, colorName] = color.split(' ');
        return colorLimits[colorName] ? count <= colorLimits[colorName] : false;
      });
    });
    return isValidGame ? acc + parseInt(game.split(': ')[0].match(/\d+/)) : acc;
  }, 0);
  console.log(answer);
});
