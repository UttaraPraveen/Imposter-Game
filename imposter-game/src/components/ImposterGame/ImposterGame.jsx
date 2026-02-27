import React, { useState, useCallback, useEffect, useRef } from "react";
import { GENRES, assignRoles } from "./constants";
import s from "./ImposterGame.module.css";
import InstructionManual from "./InstructionManual";
import bgMusic from "../../assets/imposter.mp3";


const generateHint = (word) => {
  const hints = [
    `Starts with "${word[0]}"`,
    `Word length: ${word.length}`
  ];

  return hints[Math.floor(Math.random() * hints.length)];
};

export default function ImposterGame() {
  const [phase, setPhase] = useState("setup");
  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState(Array(4).fill(""));
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [flipped, setFlipped] = useState([]);
  const [seen, setSeen] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showManual, setShowManual] = useState(false);
  const [suspect, setSuspect] = useState(null);
  const [showHint,setShowHint]=useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(bgMusic);
    audio.loop = true;
    audio.volume = 0.5;

    audioRef.current = audio;

    // Try autoplay immediately
    audio.play().catch(() => {
      // If autoplay blocked, start on first user interaction
      const startMusic = () => {
        audio.play();
        document.removeEventListener("click", startMusic);
        document.removeEventListener("touchstart", startMusic);
      };

      document.addEventListener("click", startMusic);
      document.addEventListener("touchstart", startMusic);
    });

    return () => {
      audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    setMusicOn((prev) => !prev);
  };

  const updateCount = (delta) => {
    const newCount = Math.min(10, Math.max(3, playerCount + delta));
    setPlayerCount(newCount);
    setPlayerNames((prev) => {
      const next = [...prev];
      while (next.length < newCount) next.push("");
      return next.slice(0, newCount);
    });
  };

  const updateName = (i, val) => {
    const next = [...playerNames];
    next[i] = val;
    setPlayerNames(next);
  };

  const startGame = useCallback(() => {
  const players = playerNames.slice(0, playerCount).map((n) => n.trim());
  const roles = assignRoles(players, selectedGenre);

  let hint = null;

  if (showHint) {
    hint = generateHint(roles.word, roles.genre);
  }

  setGameData({ ...roles, players, hint });
  setFlipped([]);
  setSeen([]);
  setSelectedCard(null);
  setPhase("cards");
  setStartingPlayerIndex(null);
  setShowStarter(false);
}, [playerNames, playerCount, selectedGenre, showHint]);

  const handleFlip = (i) => {
    if (flipped.includes(i)) {
      // Closing the card
      setFlipped(flipped.filter((x) => x !== i));
      setSelectedCard(null);
      if (!seen.includes(i)) setSeen((prev) => [...prev, i]);
    } else {
      // Opening the card
      setFlipped([...flipped, i]);
      setSelectedCard(i);
    }
  };

  const canStart = playerNames.slice(0, playerCount).every((n) => n.trim()) && selectedGenre;
  const allSeen = gameData && seen.length === gameData.players.length;

  const [startingPlayerIndex, setStartingPlayerIndex] = useState(null);
  const [showStarter, setShowStarter] = useState(false);

  useEffect(() => {
    if (allSeen && startingPlayerIndex === null) {
      const randomIndex = Math.floor(Math.random() * gameData.players.length);
      setStartingPlayerIndex(randomIndex);
      setShowStarter(true);
    }
  }, [allSeen, gameData, startingPlayerIndex]);
  return (
    <div className={s.app}>
      <div className={s.bgGrid} />
      <div className={s.bgGlow} />

      <div className={s.container}>
        <header className={s.logo}>
          <h1>IMPOS<span>TER</span></h1>
          <p>Who is among us?</p>
          <button
            className={s.musicBtn}
            onClick={toggleMusic}
          >
            {musicOn ? "🔊 Music On" : "🔇 Music Off"}
          </button>
        </header>

        {phase === "setup" ? (
          <div className={s.setupView}>
            <div className={s.card}>
              <div className={s.sectionLabel}>Number of Players</div>
              <div className={s.playerCountRow}>
                <button className={s.countBtn} onClick={() => updateCount(-1)}>−</button>
                <div className={s.countDisplay}>{playerCount}</div>
                <button className={s.countBtn} onClick={() => updateCount(1)}>+</button>
              </div>
            </div>

            <div className={s.card}>
              <div className={s.sectionLabel}>Player Names</div>
              <div className={s.playerInputs}>
                {playerNames.slice(0, playerCount).map((name, i) => (
                  <div key={i} className={s.playerInputWrap}>
                    <span className={s.playerNum}>P{i + 1}</span>
                    <input
                      className={s.textInput}
                      type="text"
                      placeholder={`Player ${i + 1}`}
                      value={name}
                      onChange={(e) => updateName(i, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={s.card}>
              <div className={s.sectionLabel}>Choose Genre</div>
              <div className={s.genreGrid}>
                {Object.keys(GENRES).map((genre) => (
                  <button
                    key={genre}
                    className={`${s.genreBtn} ${selectedGenre === genre ? s.genreBtnSelected : ""}`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            <button className={s.manualBtn} onClick={() => setShowManual(true)}>
              Show Instructions
            </button>
            {showManual && <InstructionManual onClose={() => setShowManual(false)} />}

            <div style={{ marginBottom: "10px" }}>
  <label>
    <input
      type="checkbox"
      checked={showHint}
      onChange={() => setShowHint(!showHint)}
    />
    {" "}Show hint to imposter
  </label>
</div>

<button className={s.startBtn} disabled={!canStart} onClick={startGame}>
  Start Game
</button>
          </div>
        ) : phase === "cards" ? (
          <div className={s.gameView}>
            <div className={s.phaseBadge}>🃏 Reveal Phase</div>
            <div className={s.phaseHint}>Each player, tap your card privately to see your role.</div>

            
            {selectedCard !== null && (
              <div className={s.fullscreenOverlay} onClick={() => handleFlip(selectedCard)}>
                <div className={s.focusedCardWrapper}>
                  <div className={`${s.flipCard} ${s.largeCard}`}>
                    <div className={`${s.flipCardInner} ${s.flipped}`}>
                      <div className={`${s.flipCardBack} ${selectedCard === gameData.imposterIndex ? s.imposterBack : ""}`}>
                        <div className={s.revealLabel}>
                          {selectedCard === gameData.imposterIndex ? "⚠ You Are" : "Your Word"}
                        </div>
                        <div className={s.revealWord}>
  {selectedCard === gameData.imposterIndex ? "IMPOSTER" : gameData.word}
</div>
{selectedCard === gameData.imposterIndex && showHint && gameData.hint && (
  <div style={{ marginTop: "10px", fontSize: "14px", opacity: 0.8 }}>
    Hint: {gameData.hint}
  </div>
)}
                        {selectedCard !== gameData.imposterIndex && (
                          <div className={s.revealGenre}>
                            {gameData.genre.split(" ").slice(1).join(" ")}
                          </div>
                        )}
                        <div className={s.tapToHide}>Tap to close and hide</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {allSeen && (
              <>
                <div className={s.allSeenBanner}>✓ Everyone has seen their roles!</div>

                {showStarter && startingPlayerIndex !== null && (
                  <div className={s.starterBanner}>
                    ✨ {gameData.players[startingPlayerIndex]} starts the round!
                    <button
                      className={s.rerollBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        const newIndex = Math.floor(Math.random() * gameData.players.length);
                        setStartingPlayerIndex(newIndex);
                      }}
                    >
                      🔁 Re-roll
                    </button>
                  </div>
                )}
                <button
                  className={s.actionBtn}
                  onClick={() => setPhase("discussion")}
                >
                  Start Discussion →
                </button>
              </>
            )}

            <div className={s.cardsGrid}>
              {gameData.players.map((name, i) => {
                const isFlipped = flipped.includes(i);
                const isSeen = seen.includes(i);

                return (
                  <div
                    key={i}
                    className={s.flipCard}
                    onClick={() => !isSeen && handleFlip(i)}
                  >
                    <div className={`${s.flipCardInner} ${isFlipped ? s.flipped : ""}`}>
                      <div className={s.flipCardFront}>
                        {isSeen && !isFlipped && (
                          <div className={s.seenOverlay}>Seen ✓</div>
                        )}
                        <span className={s.playerName}>{name}</span>
                        <span className={s.tapHint}>Tap to reveal</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className={s.resetBtn}
              onClick={() => {
                setPhase("setup");
                setStartingPlayerIndex(null);
                setShowStarter(false);
              }}
            >
              ← New Game
            </button>
          </div>
        ) : (
          <div className={s.gameView}>
            <div className={s.phaseBadge}>💬 Discussion Phase</div>

            {showStarter && startingPlayerIndex !== null && (
              <div className={s.starterBanner}>
                ✨ {gameData.players[startingPlayerIndex]} starts the round!
              </div>
            )}

            <div className={s.phaseHint}>Talk to find the imposter!</div>

            <button
              className={s.resetBtn}
              onClick={() => {
                setPhase("setup");
                setStartingPlayerIndex(null);
                setShowStarter(false);
              }}
            >
              ← Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}