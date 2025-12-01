import React, { useState } from "react";

function CrearReserva({ onReservaCreada }) {
  const [idPista, setIdPista] = useState("");
  const [inicioReserva, setinicioReserva] = useState("");
  const [finReserva, setfinReserva] = useState("");
  const [error, setError] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      setError("Debes iniciar sesión para crear una reserva.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8090/api/reservas/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUsuario: usuario.idUsuario,
          idPista: idPista,
          inicioReserva: inicioReserva + ":00",
          finReserva: finReserva + ":00",
          estadoReserva: "ACTIVA",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Error creando la reserva");
        return;
      }

      const nuevaReserva = await response.json();
      onReservaCreada(nuevaReserva);
      setIdPista("");
      setinicioReserva("");
      setfinReserva("");
      setError("");
    } catch (err) {
      console.error("Error:", err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Crear nueva reserva</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pista:</label>
          <input
            type="text"
            value={idPista}
            onChange={(e) => setIdPista(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha y hora inicio:</label>
          <input
            type="datetime-local"
            value={inicioReserva}
            onChange={(e) => setinicioReserva(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha y hora fin:</label>
          <input
            type="datetime-local"
            value={finReserva}
            onChange={(e) => setfinReserva(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Reserva</button>
      </form>
    </div>
  );
}

export default CrearReserva;
