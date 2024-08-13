// Part 1: Number Facts
const favoriteNumber = 42;
const url = `http://numbersapi.com/${favoriteNumber}?json`;
const urlMultiple = `http://numbersapi.com/[7,13,42]?json`;
const urlFact = `http://numbersapi.com/${favoriteNumber}?json`;

// 1. Get a Fact About Your Favorite Number
async function getFavoriteNumberFact() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const fact = document.createElement('p');
    fact.textContent = `Fact about number ${favoriteNumber}: ${data.text}`;
    document.getElementById('favorite-number-fact').appendChild(fact);
  } catch (err) {
    console.error(err);
  }
}

// 2. Get Data on Multiple Numbers in a Single Request
async function getMultipleNumbersFacts() {
  try {
    const response = await fetch(urlMultiple);
    const data = await response.json();
    for (const num in data) {
      const fact = document.createElement('p');
      fact.textContent = `Fact about number ${num}: ${data[num]}`;
      document.getElementById('multiple-numbers-facts').appendChild(fact);
    }
  } catch (err) {
    console.error(err);
  }
}

// 3. Get 4 Facts on Your Favorite Number
async function getMultipleFactsFavoriteNumber() {
  try {
    const factPromises = Array(4).fill(fetch(urlFact).then(response => response.json()));
    const facts = await Promise.all(factPromises);
    facts.forEach(fact => {
      const factElement = document.createElement('p');
      factElement.textContent = `Another fact about number ${favoriteNumber}: ${fact.text}`;
      document.getElementById('multiple-facts-favorite-number').appendChild(factElement);
    });
  } catch (err) {
    console.error(err);
  }
}

// Initialize Number Facts
getFavoriteNumberFact();
getMultipleNumbersFacts();
getMultipleFactsFavoriteNumber();

// Part 2: Deck of Cards
let deckId;

async function initializeDeck() {
  try {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await response.json();
    deckId = data.deck_id;
  } catch (err) {
    console.error(err);
  }
}

async function drawCard() {
  try {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await response.json();
    
    if (data.remaining === 0) {
      document.getElementById('draw-card').disabled = true;
      alert('No more cards left in the deck!');
      return;
    }

    const card = data.cards[0];
    const cardHtml = `
      <div class="card">
        <img src="${card.image}" alt="${card.value} of ${card.suit}">
      </div>`;
    document.getElementById('cards-container').innerHTML += cardHtml;
  } catch (err) {
    console.error(err);
  }
}

document.getElementById('draw-card').addEventListener('click', drawCard);

// Initialize the deck of cards on page load
initializeDeck();
