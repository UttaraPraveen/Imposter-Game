import React, { useState, useCallback } from "react";
import { GENRES, assignRoles } from "./constants";
import s from "./ImposterGame.module.css";

export default function ImposterGame() {
  const [phase, setPhase] = useState("setup");
  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState(Array(4).fill(""));
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [flipped, setFlipped] = useState([]);
  const [seen, setSeen] = useState([]);

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
    setPhase("cards");
  }, [playerNames, playerCount, selectedGenre]);

  const handleFlip = (i) => {
    if (flipped.includes(i)) {
      // Flipping back — mark as seen
      setFlipped(flipped.filter((x) => x !== i));
      if (!seen.includes(i)) setSeen([...seen, i]);
    } else {
      setFlipped([...flipped, i]);
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

            <button className={s.startBtn} disabled={!canStart} onClick={startGame}>
              Start Game
            </button>
          </div>
        ) : (
          <div className={s.gameView}>
            {allSeen && <div className={s.allSeenBanner}>✓ Start Discussing!</div>}

            <div className={s.cardsGrid}>
              {gameData.players.map((name, i) => {
                const isFlipped = flipped.includes(i);
                const isSeen = seen.includes(i);
                const isImposter = i === gameData.imposterIndex;

                return (
                  <div
                    key={i}
                    className={s.flipCard}
                    onClick={() => !isSeen && handleFlip(i)}
                  >
                    {/* The inner div is what actually rotates */}
                    <div className={`${s.flipCardInner} ${isFlipped ? s.flipped : ""}`}>

                      {/* FRONT */}
                      <div className={s.flipCardFront}>
                        {isSeen && !isFlipped && (
                          <div className={s.seenOverlay}>Seen ✓</div>
                        )}
                        <span className={s.playerName}>{name}</span>
                        <span className={s.tapHint}>Tap to reveal</span>
                      </div>

                      {/* BACK */}
                      <div
                        className={`${s.flipCardBack} ${isImposter ? s.imposterBack : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isFlipped) handleFlip(i);
                        }}
                      >
                        <div className={s.revealLabel}>
                          {isImposter ? "⚠ You Are" : "Your Word"}
                        </div>
                        <div className={s.revealWord}>
                          {isImposter ? "IMPOSTER" : gameData.word}
                        </div>
                        {!isImposter && (
                          <div className={s.revealGenre}>
                            {gameData.genre.split(" ").slice(1).join(" ")}
                          </div>
                        )}
                        <div className={s.tapToHide}>Tap to hide</div>
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