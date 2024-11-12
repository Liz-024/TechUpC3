// Sample food data with images
const foodData = [
  { name: 'Thunder Tea with Brown Rice', mealType: ['lunch', 'dinner'], focus: ['low-gi'], restriction: ['vegetarian','dairy-free'], info: 'This high-fibre dish makes you feel full longer, and helps slow down the digestion and absorption of glucose. Brown rice, which has a lower glycemic index (GI) will also cause a smaller blood glucose spike after a meal.', type: 'hawker', image: 'Images/FA1C329A-8A38-4D38-88EF-FF20C88C4487.PNG'},
  { name: 'Sliced Fish Noodle Soup', mealType: ['lunch', 'dinner'], focus: ['low-carb', 'low-calorie'], restriction: ['nut-free'], info: 'This dish is relatively lower in carbs and calories compared to its other noodly companions. Opt for brown rice, if available, for a Low-GI option!', type: 'hawker', image: 'https://example.com/veggie-wrap.jpg' },
  { name: 'Chapati with Dal', mealType: ['snack','breakfast','lunch'], focus: ['low-gi'], restriction: ['vegetarian'], info: 'If you are a fan of prata, switch it out for chapati instead! Made with wholemeal flour, it has a lower GI, which will cause a smaller blood sugar spike. Pair with dal (lentils) or a chickpea curry for a yummy protein.', type: 'hawker', image: 'https://example.com/smoothie-bowl.jpg' },
  { name: 'Popiah', mealType: ['breakfast','snack'], focus: ['low-calorie'], restriction: ['vegetarian'], info: 'Popiah typically contains plenty of vegetables (e.g., turnips, carrots, bean sprouts) which are a great source of fibre and vitamins. One serving is about 180kcals. Avoid adding sweet sauce to it, or have a little on the side!', type: 'hawker', image: 'https://example.com/tofu-stirfry.jpg' },
  { name: 'Soft-Boiled Eggs with Toast', mealType: ['breakfast'], focus: ['low-sugar', 'low-gi'], restriction: ['halal'], info: 'Soft boiled eggs can be a source of low-fat protein, to help lower the blood glucose spike. Opt for wholegrain toast for a low-GI option. If you need a spread, choose peanut butter instead of kaya for a lower sugar content!', type: ['hawker','cafe'], image: 'https://example.com/grilled-fish.jpg' },
  { name: 'Beancurd', mealType: ['snack','breakfast'], focus: ['low-sugar','low-calorie'], restriction: ['vegetarian','dairy-free'], info: 'If you are craving a light snack, enjoy a hot or cold bowl of soy beancurd. A good source of protein, and roughly 109kcal a bowl. Swap out sugar syrup with soybean milk for more protein!', type: ['hawker','shop'], image: 'https://example.com/grilled-fish.jpg' },
  { name: 'Grilled Fish', mealType: 'dinner', focus: ['low-gi'], restriction: ['none'], info: '14', type: 'restaurant', image: 'https://example.com/grilled-fish.jpg' },
  { name: 'Grilled Fish', mealType: 'dinner', focus: ['low-gi'], restriction: ['none'], info: '14', type: 'restaurant', image: 'https://example.com/grilled-fish.jpg' }
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
      food.focus.includes(focus) &&
      (restriction === 'none' || food.restriction.includes(restriction)) &&
      food.mealType.includes(mealType)
    );
  });

  // Display results
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (results.length > 0) {
    results.forEach(food => {
      const foodDiv = document.createElement('div');
      foodDiv.className = 'food-item';
      foodDiv.innerHTML = `<img src="${food.image}" alt="${food.name}"><br>
                           <strong>${food.name}</strong><br><br>
                           <strong>Type</strong>: ${food.type}<br><br>
                           <strong>Info</strong>: ${food.info}`;
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
  randomDiv.innerHTML = `<img src="${randomFood.image}" alt="${randomFood.name}"><br>
                         <strong>${randomFood.name}</strong><br>
                         Type: ${randomFood.type}<br>
                         Focus: ${randomFood.focus}<br>
                         Restriction: ${randomFood.restriction}<br>
                         Info: ${randomFood.info}`;
}

// Load results if on results.html page
if (window.location.pathname.includes('results.html')) {
  window.onload = loadResults;
}
function goBackToSearch() {
  window.location.href = 'index.html';
}
