const fs = require('fs');

let copies = [];

const getMatchCnt = (card) => {
  let matchCnt = 0;

  const [winnersRaw, numbersRaw] = card.split('|').map((part) => part.trim());
  const winners = winnersRaw
    .split(' ')
    .map(Number)
    .filter((num) => num > 0);
  const numbers = numbersRaw
    .split(' ')
    .map(Number)
    .filter((num) => num > 0);

  numbers.forEach((num) => {
    if (winners.includes(num)) {
      matchCnt++;
    }
  });

  return matchCnt;
};

const processCards = (originalCards, cardsToProcess) => {
  let processedCards = [];
  cardsToProcess.forEach((card) => {
    const matchCnt = getMatchCnt(card);
    for (let i = 1; i < matchCnt + 1; i++) {
      const copyCardNum = card.substring(0, card.indexOf(':')).match(/\d+/g);
      const cardString = 'Card' + copyCardNum;
      processedCards.push(
        originalCards.find((card) => card.startsWith(cardString))
      );
    }
  });
  if (processedCards) {
    copies = [...copies, ...processedCards];
    return true;
  }
  return false;
};

fs.readFile('input.txt', 'utf8', (err, data) => {
  const cards = data.split('\n').map((card) => {
    const [cardId, rest] = card.split(':');
    return (
      cardId.replace(' ', '').replace(' ', '').replace(' ', '') +
      ': ' +
      rest.trim()
    );
  });
  // removing whitespace from card ids

  //console.log(cards);
  //

  cards.forEach((card, index) => {
    const matchCnt = getMatchCnt(card);
    for (let i = 1; i < matchCnt + 1; i++) {
      copies.push(cards[index + i]);
    }
    if (index == 3) {
      console.log(matchCnt);
      console.log(copies);
    }
  });

  while (processCards(cards, copies)) {
    processCards(cards, copies);
  }

  const combinedCards = [...cards, ...copies];
  console.log(combinedCards.length);
});
