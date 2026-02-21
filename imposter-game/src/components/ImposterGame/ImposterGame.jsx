import React, { useState, useCallback } from "react";
import { GENRES, assignRoles } from "./constants";
import s from "./ImposterGame.module.css";
import InstructionManual from "./InstructionManual";

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
    setGameData({ ...roles, players });
    setFlipped([]);
    setSeen([]);
    setSelectedCard(null);
    setPhase("cards");
  }, [playerNames, playerCount, selectedGenre]);

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

  return (
    <div className={s.app}>
      <div className={s.bgGrid} />
      <div className={s.bgGlow} />

      <div className={s.container}>
        <header className={s.logo}>
          <h1>IMPOS<span>TER</span></h1>
          <p>Who is among us?</p>
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

            <button className={s.startBtn} disabled={!canStart} onClick={startGame}>
              Start Game
            </button>
          </div>
        ) : (
          <div className={s.gameView}>
            {/* FULLSCREEN OVERLAY: Shows only when a card is selected */}
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

            {allSeen && <div className={s.allSeenBanner}>✓ Start Discussing!</div>}

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

            <button className={s.resetBtn} onClick={() => setPhase("setup")}>
              ← New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}