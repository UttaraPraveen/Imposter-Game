# Imposter Game

# 🕵️‍♂️ Imposter Game

A sleek, modern, and mobile-friendly **social deduction game** built with **React + Vite**. Designed for parties, game nights, and chaotic friend-group energy — all on a single device.

---

## 🎮 How to Play

### 1️⃣ Setup

* Choose the number of players (**3–10**).
* Enter each player’s name.
* Pass the phone around when prompted.

### 2️⃣ Select a Genre

Pick a category such as:

* 🍕 Food
* 🎬 Movies
* 🎮 Video Games
* And more…

### 3️⃣ Secret Roles

Each player taps their card privately to reveal their role:

* Most players see the **same secret word**
* One player becomes the **IMPOSTER** and sees `"IMPOSTER"` instead

Keep your role secret 👀.

### 4️⃣ Discuss

The game randomly picks who starts the discussion round. Players describe the word carefully — not too obvious, not too vague.

The Imposter must:

* Blend in
* Analyze clues
* Try to figure out the hidden word

### 5️⃣ Vote

After discussion, everyone votes for who they think the Imposter is by selecting their name from the list.

### 6️⃣ Result

The final verdict! The game reveals if the suspect was the imposter (Caught!) or an innocent player (Wrong Guess!). The secret word is also revealed to everyone.

---

## 🕹️ Game Phases

The game flows through three distinct phases, ensuring a smooth and engaging experience for all players.

### 1️⃣ Setup Phase
* **Player Configuration**: Add 3–10 players and customize their names.
* **Genre Selection**: Choose from 8+ curated categories including Food, Movies, Animals, and more.
* **Game Options**: Toggle advanced features like **Imposter Hints** or browse the built-in **Instruction Manual**.

### 2️⃣ Reveal Phase
* **Secret Roles**: Players pass the device and tap their cards one by one to reveal their role.
* **The Word**: Commoners see the secret word; the Imposter sees "IMPOSTER" (and a strategic hint if enabled).
* **Privacy First**: High-contrast, fullscreen overlays prevent accidental peeking.

### 3️⃣ Discussion Phase
* **Starting Player**: The game automatically selects a random player to "start the round" to break the ice (with a **Re-roll** option if needed).
* **The Hunt**: Players describe their word without being too obvious. The Imposter tries to blend in by interpreting clues.
* **Cleanup**: Once the round starts, cards are hidden to keep the UI clean and the focus on the debate.

### 4️⃣ Voting Phase
* **Suspect List**: A clear grid of all players' names is displayed.
* **The Vote**: Once the group consensus is reached, select the most suspicious player.
* **Commit**: Confirm your choice to proceed to the final reveal.

### 5️⃣ Result Phase
* **The Verdict**: Find out if the group captured the Imposter or if the Imposter won the round.
* **The Reveal**: The secret word is displayed for both the Imposter and the common players.

---

## ✨ Features

### 🎧 Ambient Soundscape
Features dynamic background music with a convenient toggle control directly on the home screen to set the perfect mood for intrigue.

### 💡 Imposter Strategy (Hints)
Enable **Imposter Hints** in the setup to give the Imposter a fighting chance. Hints include:
* **Starting Letter**: "Starts with P..."
* **Word Length**: "The word has 5 letters..."

### 🎲 Automated Starter
No more awkward silences! The game randomly picks who starts the discussion round, ensuring every game begins with a spark.

### 📖 In-Game Manual
Accessible instruction manual available anytime during setup, making it easy for new players to jump right in.

### 🔒 Privacy-First Gameplay
Fullscreen overlays ensure no one else sees your role while revealing your card.

### 🌌 Modern Cyberpunk UI
* **Design**: Sleek dark theme with neon glow accents.
* **Interactions**: Smooth 3D card-flip animations and responsive tactile feedback.

### 📱 Mobile-Optimized
Built for a single phone passed around the room — no accounts, downloads, or internet required during play.

### 🎲 Diverse Word Banks
Includes extensive lists across multiple genres, curated for maximum replayability and fun.

---

## 🛠️ Tech Stack

* **React 18** — UI and state management
* **Vite** — Fast development server and build tool
* **CSS Modules** — Scoped styling for maintainable components
* **Vercel** — Deployment and hosting

---

## 🚀 Getting Started

### ✅ Prerequisites

* Node.js (v16 or higher)
* npm

### 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/imposter-game.git
```

Navigate to the project folder:

```bash
cd imposter-game
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in your terminal to play 🎮.

---

## 📂 Project Structure

```
src/
┣━ components/
┃  ┗━ ImposterGame/      # Main game component & logic
┣━ styles/               # Global styles and resets
┣━ constants.js          # Game data and word lists
┗━ App.jsx               # Root component
```


---

## 🤝 Code of Conduct

Be respectful, kind, and collaborative.
This project is meant to be a safe and fun learning environment for everyone.

---

## 📜 License

This project is for **personal use and learning purposes**.
Feel free to fork, remix, and customize it for your own game nights!

---

