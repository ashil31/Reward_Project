function getRandomReward() {
  return Math.floor(Math.random() * (500 - 5 + 1)) + 5;
}

module.exports = getRandomReward;