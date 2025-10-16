"use client";

import { useState } from "react";
import Character from "./Character";

const API_BASE_URL = "https://thesimpsonsapi.com/api";

export default function SimpsonsPage() {
  const [index, setIndex] = useState(1);

  const handleNext = () => {
    setIndex((prev) => (prev < 10 ? prev + 1 : 1));
  };

  const handlePrev = () => {
    setIndex((prev) => (prev > 1 ? prev - 1 : 10));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-6">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">Personajes de Los Simpson</h1>

      <div className="flex items-center gap-6">
        <button
          onClick={handlePrev}
          className="text-4xl hover:text-yellow-400 transition-transform hover:scale-110"
        >
          ⬅️
        </button>

        <Character url={`${API_BASE_URL}/characters/${index}`} />

        <button
          onClick={handleNext}
          className="text-4xl hover:text-yellow-400 transition-transform hover:scale-110"
        >
          ➡️
        </button>
      </div>

      {/* INPUT CONTROLADO — siempre tiene un número válido */}
      <input
        type="number"
        min="1"
        max="10"
        value={index || 1}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val >= 1 && val <= 10) setIndex(val);
        }}
        className="border-2 border-yellow-400 text-white text-xl rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center w-20"
      />
    </div>
  );
}
