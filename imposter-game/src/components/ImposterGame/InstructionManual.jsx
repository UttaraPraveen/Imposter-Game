import React from "react";
import s from "./ImposterGame.module.css";

export default function InstructionManual({ onClose }) {
  return (
    <div className={s.manualOverlay}>
      <div className={s.manualContent}>
        <h2>Imposter Game Instructions</h2>
        <ol>
          <li>
            <strong>Setup</strong>
            <ul>
              <li>Choose the number of players (3–10).</li>
              <li>Enter each player’s name.</li>
              <li>Pass the phone around when prompted.</li>
            </ul>
          </li>
          <li>
            <strong>2️⃣ Select a Genre</strong>
            <ul>
              <li>Pick a category such as:</li>
              <li>🍕 Food</li>
              <li>🎬 Movies</li>
              <li>🎮 Video Games</li>
              <li>And more…</li>
            </ul>
          </li>
          <li>
            <strong>3️⃣ Secret Roles</strong>
            <ul>
              <li>Each player taps their card privately to reveal their role.</li>
              <li>Most players see the same secret word.</li>
              <li>One player becomes the <strong>IMPOSTER</strong> and sees "IMPOSTER" instead.</li>
              <li>Keep your role secret 👀.</li>
            </ul>
          </li>
          <li>
            <strong>4️⃣ Discuss</strong>
            <ul>
              <li>Players describe the word carefully — not too obvious, not too vague.</li>
              <li>The Imposter must:</li>
              <li>Blend in</li>
              <li>Analyze clues</li>
              <li>Try to figure out the hidden word</li>
            </ul>
          </li>
          <li>
            <strong>5️⃣ Vote</strong>
            <ul>
              <li>After discussion, everyone votes for who they think the Imposter is!</li>
            </ul>
          </li>
        </ol>

        <button className={s.closeManualBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}