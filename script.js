// Sample food data with images
const foodData = [
  { name: 'Thunder Tea with Brown Rice', mealType: ['lunch', 'dinner'], focus: ['low-gi'], restriction: ['vegetarian','dairy-free'], info: 'This high-fibre dish makes you feel full longer, and helps slow down the digestion and absorption of glucose. Brown rice, which has a lower glycemic index (GI), will also cause a smaller blood glucose spike after a meal.', type: 'hawker', image: 'Images/Leicha.png'},
  { name: 'Sliced Fish Noodle Soup', mealType: ['lunch', 'dinner'], focus: ['low-carb', 'low-calorie'], restriction: ['nut-free'], info: 'This dish is relatively lower in carbs and calories compared to its other noodly companions. Opt for brown rice, if available, for a Low-GI option!', type: 'hawker', image: 'Images/Slicefishsoup .png' },
  { name: 'Chapati with Dal', mealType: ['breakfast','lunch'], focus: ['low-gi'], restriction: ['vegetarian'], info: 'If you are a fan of prata, switch it out for chapati instead! Made with wholemeal flour, it has a lower GI, which will cause a smaller blood sugar spike. Pair with dal (lentils) or a chickpea curry for a yummy protein.', type: 'hawker', image: 'Images/Chapati.png' },
  { name: 'Popiah', mealType: ['breakfast','snack'], focus: ['low-calorie'], restriction: ['vegetarian'], info: 'Popiah typically contains plenty of vegetables (e.g., turnips, carrots, bean sprouts) which are a great source of fibre and vitamins. One serving is about 180kcals. Avoid adding sweet sauce to it, or have a little on the side!', type: 'hawker', image: 'Images/Popiah.png' },
  { name: 'Soft-Boiled Eggs with Toast', mealType: ['breakfast'], focus: ['low-sugar', 'low-gi'], restriction: ['halal'], info: 'Soft boiled eggs can be a source of low-fat protein, to help lower the blood glucose spike. Opt for wholegrain toast for a low-GI option. If you need a spread, choose peanut butter instead of kaya for a lower sugar content!', type: ['hawker','cafe'], image: 'Images/Eggntoast .png' },
  { name: 'Beancurd', mealType: ['snack','breakfast'], focus: ['low-sugar','low-calorie'], restriction: ['vegetarian','dairy-free','halal'], info: 'If you are craving a light snack, enjoy a hot or cold bowl of soy beancurd. A good source of protein, and roughly 109kcal a bowl. Swap out sugar syrup with soybean milk for more protein!', type: ['hawker','shop'], image: 'Images/Beancurd.png' },
  { name: 'Bee Hoon Soto', mealType: ['breakfast','lunch'], focus: ['low-gi', 'low-calorie'], restriction: ['halal'], info: 'Bee Hoon has a lower GI (<55), and contains lower sodium content compared to yellow noodles. With eggs and veggies, this filling dish offers protein and fibre at just 360kcal a bowl!', type: 'hawker', image: 'Images/Beehoonsoto.png' },
  { name: 'Wholemeal/Grain Sandwich', mealType: ['lunch','snack'], focus: ['low-gi'], restriction: ['none'], info: 'Wholemeal or multigrain bread has a lower GI. Add a good protein like roast chicken, tuna or egg with low-fat mayo for a filling snack or meal!', type: ['cafe','shop'], image: 'Images/Sandwich.png' },
  { name: 'Chin Chow (no syrup)', mealType: ['snack'], focus: ['low-sugar'], restriction: ['nut-free','dairy-free'], info: 'Plain grass jelly contains about 3% of carbohydrates, and can be enjoyed with low/no-sugar soymilk!', type: ['hawker','shop'], image: 'Images/Chinchow .png' },
  { name: 'Watercress Soup with Brown Rice', mealType: ['lunch','dinner'], focus: ['low-gi', 'low-calorie'], restriction: ['dairy-free'], info: 'A bowl of watercress soup is roughly 90kcal. You can also opt for chicken soup for a good source of protein. Make sure to pair with Brown Rice for lower GI, and avoid finishing the soup as some can be high in sodium!', type: ['hawker'], image: 'Images/RiceSoup.png' },
  { name: 'Cai Fan/Nasi Padang (with less rice)', mealType: ['lunch','dinner'], focus: ['low-carb'], restriction: ['halal'], info: 'This is a staple hawker food, and you can still enjoy it too! Pick at least 2 veggies and a protein (e.g., chicken or tofu). Avoid saucy dishes as these tend to have more carbs, and opt for dishes that are grilled or steamed.', type: ['hawker'], image: 'Images/Cai fan.png' },
  { name: 'Yong Tau Foo', mealType: ['lunch','dinner'], focus: ['low-carb'], restriction: ['none'], info: 'Yong Tau Foo is a great choice if you crave variety! Opt for leafy greens, ask for a smaller portion of carbs and avoid fried items. Be careful not to finish the soup or get it dry, as the soup bases can be high in sodium!', type: 'hawker', image: 'Images/Ytf.png' }
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

  let results;
  if (focus === 'none' && restriction === 'none') {
    // Case 1: Both focus and restriction are "none"
    results = foodData.filter(food => 
      food.mealType.includes(mealType)
    );

  } else if (focus === 'none') {
    // Case 2: Focus is "none," filter by restriction and meal type
    results = foodData.filter(food => 
      food.mealType.includes(mealType) && 
      food.restriction.includes(restriction)
    );

  } else if (restriction === 'none') {
    // Case 3: Restriction is "none," filter by focus and meal type
    results = foodData.filter(food => 
      food.mealType.includes(mealType) && 
      food.focus.includes(focus)
    );

  } else {
    // Case 4: Both focus and restriction are specified
    results = foodData.filter(food => 
      food.mealType.includes(mealType) && 
      food.restriction.includes(restriction) && 
      food.focus.includes(focus)
    );
  }

  // Display results
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (results.length > 0) {
    results.forEach(food => {
      const foodDiv = document.createElement('div');
      foodDiv.className = 'food-item';
      foodDiv.innerHTML = `<img src="${food.image}" alt="${food.name}"><br>
                           <strong><u>${food.name}</u></strong><br><br>
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
                         <strong><u>${randomFood.name}</u></strong><br><br>
                         <strong>Type</strong>: ${randomFood.type}<br>
                         <strong>Focus</strong>: ${randomFood.focus}<br>
                         <strong>Dietary Restriction</strong>: ${randomFood.restriction}<br><br>
                         <strong>Info</strong>: ${randomFood.info}`;
}

// Load results if on results.html page
if (window.location.pathname.includes('results.html')) {
  window.onload = loadResults;
}
function goBackToSearch() {
  window.location.href = 'index.html';
}
