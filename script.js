// Sample food data with images
const foodData = [
  { name: 'Chicken Salad', mealType: 'lunch', focus: 'low-gi', restriction: 'halal', price: '10', type: 'hawker', image: 'https://example.com/chicken-salad.jpg' },
  { name: 'Veggie Wrap', mealType: 'lunch', focus: 'low-sugar', restriction: 'nut-free', price: '8', type: 'fast-food', image: 'https://example.com/veggie-wrap.jpg' },
  { name: 'Smoothie Bowl', mealType: 'snack', focus: 'low-carb', restriction: 'dairy-free', price: '12', type: 'cafe', image: 'https://example.com/smoothie-bowl.jpg' },
  { name: 'Tofu Stir-fry', mealType: 'breakfast', focus: 'low-fat', restriction: 'halal', price: '9', type: 'hawker', image: 'https://example.com/tofu-stirfry.jpg' },
  { name: 'Grilled Fish', mealType: 'dinner', focus: 'low-gi', restriction: 'none', price: '14', type: 'restaurant', image: 'https://example.com/grilled-fish.jpg' }
];

// Function to handle form submission
function submitForm(event) {
  event.preventDefault();
  const focus = document.getElementById('focus').value;
  const restriction = document.getElementById('restriction').value;
  const mealType = document.getElementById('mealType').value;
  localStorage.setItem('focus', focus);
  localStorage.setItem('restriction', restriction);
  localStorage.setItem('mealType', mealType);
  window.location.href = 'results.html';
}

// Function to load results on results page
function loadResults() {
  const focus = localStorage.getItem('focus');
  const restriction = localStorage.getItem('restriction');
  const mealType = localStorage.getItem('mealType');
  // Filter food data
  const results = foodData.filter(food => {
    return (
      food.focus === focus &&
      (restriction === 'none' || food.restriction === restriction) &&
      food.mealType === mealType
    );
  });

  // Display results
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (results.length > 0) {
    results.forEach(food => {
      const foodDiv = document.createElement('div');
      foodDiv.className = 'food-item';
      foodDiv.innerHTML = `<img src="${food.image}" alt="${food.name}">
                           <strong>${food.name}</strong><br>
                           Type: ${food.type}<br>
                           Price: $${food.price}`;
      resultsDiv.appendChild(foodDiv);
    });
  } else {
    resultsDiv.innerHTML = '<p>No matching results found.</p>';
  }
}

// Function to show a random healthy food recommendation
function showRandomRecommendation() {
  const mealType = document.getElementById('mealType').value;
  const randomFood = foodData[Math.floor(Math.random() * foodData.length)];
  const randomDiv = document.getElementById('randomRecommendation');
  randomDiv.innerHTML = `<img src="${randomFood.image}" alt="${randomFood.name}">
                         <strong>${randomFood.name}</strong><br>
                         Type: ${randomFood.type}<br>
                         Price: $${randomFood.price}`;
}

// Load results if on results.html page
if (window.location.pathname.includes('results.html')) {
  window.onload = loadResults;
}
function goBackToSearch() {
  window.location.href = 'index.html';
}
