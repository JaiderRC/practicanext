"use client";
import { useState } from "react";

function Casilla({ valor, alHacerClick }) {
  return (
    <button
      onClick={alHacerClick}
      className="w-32 h-32 border text-amber-400 bg-gray-100 border-yellow-700 flex items-center justify-center text-9xl font-bold hover:bg-gray-300 transition"
    >
      {valor}
    </button>
  );
}

function Tablero({ turnoX, casillas, alJugar }) {
  function manejarClick(i) {
    if (calcularGanador(casillas) || casillas[i]) {
      return;
    }
    const siguientesCasillas = casillas.slice();
    if (turnoX) {
      siguientesCasillas[i] = "X";
    } else {
      siguientesCasillas[i] = "O";
    }
    alJugar(siguientesCasillas);
  }

  const ganador = calcularGanador(casillas);
  const tableroLleno = casillas.every((casilla) => casilla !== null);

  let estado;
  if (ganador) {
    estado = "Ganador: " + ganador;
  } else if (tableroLleno) {
    estado = "Empate 🤝";
  } else {
    estado = "Turno de: " + (turnoX ? "X" : "O");
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-xl font-semibold">{estado}</div>
      <div className="grid grid-cols-3 gap-2">
        {casillas.map((valor, i) => (
          <Casilla key={i} valor={valor} alHacerClick={() => manejarClick(i)} />
        ))}
      </div>
    </div>
  );
}

export default function Juego() {
  const [historial, setHistorial] = useState([Array(9).fill(null)]);
  const [movimientoActual, setMovimientoActual] = useState(0);
  const turnoX = movimientoActual % 2 === 0;
  const casillasActuales = historial[movimientoActual];

  function manejarJugada(siguientesCasillas) {
    const siguienteHistorial = [
      ...historial.slice(0, movimientoActual + 1),
      siguientesCasillas,
    ];
    setHistorial(siguienteHistorial);
    setMovimientoActual(siguienteHistorial.length - 1);
  }

  function saltarA(movimiento) {
    setMovimientoActual(movimiento);
  }

  const movimientos = historial.map((_, movimiento) => {
    let descripcion =
      movimiento > 0 ? "Ir al movimiento #" + movimiento : "Volver al inicio";
    return (
      <li key={movimiento}>
        <button
          onClick={() => saltarA(movimiento)}
          className="text-white hover:bg-amber-500 rounded-lg bg-amber-400 font-bold px-4 py-2"
        >
          {descripcion}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Título */}
      <h1 className="text-4xl font-bold mb-10 text-amber-400 text-center">
        Triqui de Jaider
      </h1>

      {/* Tablero + Historial */}
      <div className="flex gap-12">
        <div className="game-board">
          <Tablero
            turnoX={turnoX}
            casillas={casillasActuales}
            alJugar={manejarJugada}
          />
        </div>
        <div className="game-info flex flex-col justify-center">
          <h2 className="text-2xl mb-4 text-amber-300">Historial</h2>
          <ol className="space-y-3">{movimientos}</ol>
        </div>
      </div>
    </div>
  );
}

function calcularGanador(casillas) {
  const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < combinacionesGanadoras.length; i++) {
    const [a, b, c] = combinacionesGanadoras[i];
    if (
      casillas[a] &&
      casillas[a] === casillas[b] &&
      casillas[a] === casillas[c]
    ) {
      return casillas[a];
    }
  }
  return null;
}