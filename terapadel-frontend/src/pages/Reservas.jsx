import React, { useEffect, useState } from "react";
import CrearReserva from "../components/CrearReserva";

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    const cargarReservas = async () => {
      const token = localStorage.getItem("token");
      if (!usuario) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8090/api/reservas/usuario/${usuario._id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (!response.ok) {
          console.error("Error al cargar reservas");
          return;
        }

        const data = await response.json();
        setReservas(data);
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarReservas();
  }, [usuario]);

  const eliminarReserva = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("¿Seguro que quieres eliminar esta reserva?")) return;

    try {
      const response = await fetch(
        `http://localhost:8090/api/reservas/eliminar/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok) {
        setReservas(reservas.filter((r) => r.idReserva !== id));
      }
    } catch (error) {
      console.error("Error eliminando reserva:", error);
    }
  };

  const agregarReserva = (reserva) => {
    setReservas([...reservas, reserva]);
  };

  if (!usuario) {
    return <h2 style={{ textAlign: "center" }}>Debes iniciar sesión</h2>;
  }

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Cargando reservas...</h2>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-60">
      <h1 className="text-2xl font-bold mb-6">Mis Reservas</h1>

      <CrearReserva onReservaCreada={agregarReserva} />

      {reservas.length === 0 ? (
        <p>No tienes reservas registradas.</p>
      ) : (
        reservas.map((reserva) => (
          <div
            key={reserva.idReserva}
            style={{
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <p>
              <strong>Pista:</strong> {reserva.idPista}
            </p>
            <p>
              <strong>Inicio:</strong>{" "}
              {new Date(reserva.inicioReserva).toLocaleString()}
            </p>
            <p>
              <strong>Fin:</strong>{" "}
              {new Date(reserva.finReserva).toLocaleString()}
            </p>
            <p>
              <strong>Estado:</strong> {reserva.estadoReserva}
            </p>

            <button
              onClick={() => eliminarReserva(reserva.idReserva)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Eliminar reserva
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Reservas;
