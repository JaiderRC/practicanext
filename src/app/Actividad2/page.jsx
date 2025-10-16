"use client";

import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Tarea 1", done: false },
    { id: 2, text: "Tarea 2", done: false },
  ]);

  const [currentTask, setCurrentTask] = useState("");
  const [error, setError] = useState("");
  const [sortMode, setSortMode] = useState(null);

  const addButtonHandler = () => {
    const text = currentTask.trim();
    if (text === "") {
      setError("No puedes agregar una tarea vacía.");
      return;
    }

    const existe = tasks.some((t) => t.text.toLowerCase() === text.toLowerCase());
    if (existe) {
      setError("Esa tarea ya existe.");
      return;
    }

    const newTask = { id: Date.now() + Math.random(), text, done: false };
    setTasks((prev) => [...prev, newTask]);
    setCurrentTask("");
    setError("");
    setSortMode(null);
  };

  const taskClickHandler = (id) => {
    setTasks((prev) => {
      const t = prev.find((x) => x.id === id);
      if (!t) return prev;

      if (!t.done) {
        return prev.map((x) => (x.id === id ? { ...x, done: true } : x));
      } else {
        return prev.filter((x) => x.id !== id);
      }
    });
  };

  const toggleSortHandler = () => {
    setTasks((prev) => {
      const copy = [...prev];
      if (sortMode === null || sortMode === "desc") {
        copy.sort((a, b) => a.text.localeCompare(b.text, undefined, { sensitivity: "base" }));
        setSortMode("asc");
      } else {
        copy.sort((a, b) => b.text.localeCompare(a.text, undefined, { sensitivity: "base" }));
        setSortMode("desc");
      }
      return copy;
    });
  };

  const clearAllHandler = () => {
    setTasks([]);
    setSortMode(null);
    setError("");
  };

  return (
    <section className="bg-red-100 p-4 max-w-2xl mx-auto my-10 text-gray-900">
      <h2 className="text-2xl font-bold mb-3 text-red-700">Lista de tareas</h2>

      <div className="my-2 flex flex-wrap gap-2">
        <input
          className="bg-white border border-red-400 rounded-lg p-2 flex-1 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
          type="text"
          placeholder="Escribe una tarea..."
          value={currentTask}
          onChange={(e) => {
            setCurrentTask(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") addButtonHandler();
          }}
        />

        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-4 py-2 transition disabled:opacity-50"
          onClick={addButtonHandler}
          disabled={currentTask.trim() === ""}
        >
          Agregar
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-4 py-2 transition"
          onClick={toggleSortHandler}
        >
          {sortMode === "asc" ? "Ordenar Z→A" : "Ordenar A→Z"}
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-4 py-2 transition"
          onClick={clearAllHandler}
        >
          Eliminar todo
        </button>
      </div>

      {error && <p className="text-sm text-red-700 mb-2 font-medium">{error}</p>}

      <div className="flex flex-col gap-2">
        {tasks.length === 0 && <div className="text-gray-600 italic">No hay tareas — agrega una :)</div>}

        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => taskClickHandler(task.id)}
            className={`bg-white border border-red-200 rounded-lg px-3 py-2 cursor-pointer select-none shadow-sm hover:bg-red-50 transition-all duration-150 flex justify-between items-center`}
          >
            <span className={`${task.done ? "line-through text-gray-500" : "text-gray-900"}`}>{task.text}</span>
            <small className="text-xs text-gray-500">
              {task.done ? "(tachada — clic para eliminar)" : "(clic para tachar)"}
            </small>
          </div>
        ))}
      </div>

      <footer className="mt-4 text-sm text-gray-700 font-medium">
        <div>Total: {tasks.length}</div>
        <div>Modo orden: {sortMode ?? "ninguno"}</div>
      </footer>
    </section>
  );
}
