import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPistaMock } from "../services/mockService";

function HourButton({ time, busy, selected, onClick }) {
  return (
    <button
      onClick={() => onClick(time)}
      className={`px-3 py-2 rounded-md border ${
        busy ? "bg-red-200 text-red-800 cursor-not-allowed" : selected ? "bg-green-600 text-white" : "bg-white"
      }`}
      disabled={busy}
    >
      {time}
    </button>
  );
}

export default function Pista() {
  const { id } = useParams();
  const [pista, setPista] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);

  useEffect(() => {
    const p = getPistaMock(Number(id));
    setPista(p);
  }, [id]);

  const toggleTime = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time].slice(-3) // limita 3 bloques (1:30h)
    );
  };

  if (!pista) return <div className="container mx-auto p-6">Cargando...</div>;

  const times = pista.horario;
  return (
    <div className="container mx-auto px-4 py-8 pt-40">
      <h2 className="text-2xl font-bold mb-4">{pista.nombre_pista}</h2>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1">Fecha</label>
        <input type="date" className="border p-2 rounded" />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {times.map((t) => (
          <HourButton
            key={t}
            time={t}
            busy={pista.ocupadas.includes(t)}
            selected={selectedTimes.includes(t)}
            onClick={toggleTime}
          />
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => alert(`Reservado: ${selectedTimes.join(", ")}`)}>
          Aceptar
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setSelectedTimes([])}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
