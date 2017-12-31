if (gremlins) {
  const horde = gremlins.createHorde();
  horde.seed(Date.now()).unleash({ nb: 100000 });
} else {
  console.error('Gremlins.js is not loaded');
}
