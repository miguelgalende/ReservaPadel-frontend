import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function HourButton({ time, busy, selected, onClick }) {
  return (
    <button
      onClick={() => onClick(time)}
      className={`px-3 py-2 rounded-md border ${
        busy
          ? "bg-red-200 text-red-800 cursor-not-allowed"
          : selected
          ? "bg-green-600 text-white"
          : "bg-white"
      }`}
      disabled={busy}
    >
      {time}
    </button>
  );
}

export default function Pista() {
  const { state } = useLocation();
  const pista = state?.pista;

  const [selectedTimes, setSelectedTimes] = useState([]);
  const [fecha, setFecha] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");

  if (!pista) {
    return (
      <div className="container mx-auto pt-60 text-center text-xl">
        ❌ No se ha recibido información de la pista
      </div>
    );
  }

  const toggleTime = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time)
        ? prev.filter((t) => t !== time)
        : [...prev, time].slice(-3)
    );
  };

  const crearReserva = async () => {
    if (!usuario) {
      alert("Debes iniciar sesión para reservar");
      return;
    }

    if (!fecha) {
      alert("Selecciona una fecha");
      return;
    }

    if (selectedTimes.length === 0) {
      alert("Selecciona al menos una hora");
      return;
    }

    const inicio = selectedTimes[0];
    const ultima = selectedTimes[selectedTimes.length - 1];

    const [h, m] = ultima.split(":").map(Number);
    const fechaFin = new Date(0, 0, 0, h, m + 30);

    const inicioReserva = `${fecha}T${inicio}:00`;
    const finReserva = `${fecha}T${String(fechaFin.getHours()).padStart(
      2,
      "0"
    )}:${String(fechaFin.getMinutes()).padStart(2, "0")}:00`;

    const reservaData = {
      idPista: pista.idPista,
      idUsuario: usuario._id,
      inicioReserva,
      finReserva,
      estadoReserva: "ACTIVA",
    };

    try {
      const response = await fetch("http://localhost:8090/api/reservas/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(reservaData),
      });

      if (response.ok) {
        alert("Reserva creada correctamente ✔");
        setSelectedTimes([]);
      } else {
        alert("Error creando la reserva ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor ❌");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-60">
      <h2 className="text-2xl font-bold mb-4">{pista.nombrePista}</h2>

      <img
        src={pista.imagenPista}
        alt={pista.nombrePista}
        className="w-full h-60 object-cover rounded mb-6 shadow"
      />

      {/* FECHA */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1">Fecha</label>
        <input
          type="date"
          className="border p-2 rounded"
          min={new Date().toISOString().split("T")[0]}
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      {/* HORARIO */}
      <h3 className="text-lg font-semibold mb-2">Selecciona hora</h3>

      <div className="grid grid-cols-4 gap-2">
        {pista.horario?.map((t) => (
          <HourButton
            key={t}
            time={t}
            busy={pista.ocupadas?.includes(t)}
            selected={selectedTimes.includes(t)}
            onClick={toggleTime}
          />
        ))}
      </div>

      {/* BOTONES */}
      <div className="mt-6 flex gap-3">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={crearReserva}
        >
          Confirmar reserva
        </button>

        <button
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          onClick={() => setSelectedTimes([])}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
