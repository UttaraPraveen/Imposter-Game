// constants.js
export const GENRES = {
  "🌍 Nature": ["Mountain", "Ocean", "Desert", "Forest", "Volcano", "River", "Cave", "Glacier", "Waterfall", "Rainforest", "Coral Reef", "Snow", "Wind", "Bird", "Ice", "Lava"],
  "🍕 Food": ["Pizza", "Sushi", "Burger", "Tacos", "Ramen", "Croissant", "Dosa", "Kebab", "Brownie", "Ice Cream", "Dumplings", "Biriyani", "Cake", "Soup", "Mutton Curry", "Payasam", "Pappadam", "Sadhya", "Steak", "Idle", "Coffee"],
  "🎬 Movies": ["Inception", "Drishyam", "Conjuring", "Titanic", "Avatar", "Interstellar", "Matrix", "Gladiator", "Joker", "Parasite", "Dune", "Oppenheimer", "Alien", "Barbie", "Thudarum", "Premalu", "Premam", "Lucifer", "Dandal", "Baahubali", "KGF", "Vikram", "Sarkar", "Ponniyin Selvan"],
  "🏅 Sports": ["Football", "Tennis", "Swimming", "Boxing", "Gymnastics", "Cycling", "Surfing", "Archery", "Wrestling", "Polo", "Fencing", "Diving", "Ice Skating", "Figure Skating", "Skiing", "Snowboarding", "Cricket", "Badminton", "Volleyball", "Basketball", "Baseball"],
  "🌆 Places": ["Tokyo", "Paris", "Dubai", "Sydney", "Cairo", "New York", "Rome", "Bangkok", "Istanbul", "Rio", "London", "Mumbai", "Trivandrum", "Kochi", "Kozhikode", "Allapuzha", "Kollam", "Varkala", "Munnar", "Wayanad", "Athirapally", "Ponmudi", "Nelliyampathy", "Agasthyakoodam", "Chennai", "Hyderabad", "Bangalore", "Pune", "Goa", "Kerala"],
  "🐾 Animals": ["Elephant", "Platypus", "Axolotl", "Peacock", "Capybara", "Wolverine", "Firefly", "Panda", "Kangaroo", "Giraffe", "Zebra", "Lion", "Tiger", "Bear", "Dinosaur", "Shark", "Octopus", "Sloth", "Koala", "Penguin", "Owl", "Eagle", "Cheetah", "Wolf", "Fox"],
  "🎮 Celebrity": ["Taylor Swift", "Dwayne Johnson", "Ariana Grande", "Brad Pitt", "Beyoncé", "Leonardo DiCaprio", "Oprah Winfrey", "Cristiano Ronaldo", "Kim Kardashian", "Elon Musk", "Shah Rukh Khan", "Priyanka Chopra", "Virat Kohli", "Deepika Padukone", "Ranveer Singh", "Alia Bhatt", "Salman Khan", "Katrina Kaif", "Anushka Sharma", "Mohanlal", "Mammootty", "Dulquer Salmaan", "Fahadh Faasil", "Nivin Pauly", "Prithviraj Sukumaran"],
  "🎵 Songs": ["Ribs - Lorde", "Shape of You - Ed Sheeran", "Blinding Lights - The Weeknd", "Bohemian Rhapsody - Queen", "Rolling in the Deep - Adele", "Uptown Funk - Mark Ronson ft. Bruno Mars", "Happy - Pharrell Williams", "Bad Guy - Billie Eilish", "Old Town Road - Lil Nas X", "Despacito - Luis Fonsi ft. Daddy Yankee", "Someone Like You - Adele", "Thinking Out Loud - Ed Sheeran", "Hallelujah - Leonard Cohen", "You belong with Me - Taylor Swift", "All of Me - John Legend", "Shallow - Lady Gaga & Bradley Cooper"],
};

export const cryptoRandom = (max) => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
};

export const assignRoles = (players, selectedGenre) => {
  const imposterIndex = cryptoRandom(players.length);
  const words = GENRES[selectedGenre];
  const word = words[cryptoRandom(words.length)];
  return { imposterIndex, word, genre: selectedGenre };
};