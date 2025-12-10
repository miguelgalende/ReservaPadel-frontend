const API_URL = "http://localhost:8090/api";

/*CLUBES*/

export async function crearClub(data) {
  const res = await fetch(`${API_URL}/clubs/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function listarClubs() {
  const res = await fetch(`${API_URL}/clubs/listar`);
  return await res.json();
}

export async function eliminarClub(id) {
  const res = await fetch(`${API_URL}/clubs/eliminar/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar club");

  try {
    return await res.json();
  } catch {
    return { message: "Eliminado sin respuesta JSON" };
  }
}

/*PISTAS*/

export async function crearPista(data) {
  const res = await fetch(`${API_URL}/pistas/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function listarPistasDeClub(idClub) {
  const res = await fetch(`${API_URL}/pistas/club/${idClub}`);
  return await res.json();
}

export async function eliminarPista(id) {
  const res = await fetch(`${API_URL}/pistas/eliminar/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage || "Error al eliminar la pista");
  }

  try {
    return await res.json();
  } catch {
    return { message: "Eliminado sin respuesta JSON" };
  }
}

export async function getPista(id) {
  const res = await fetch(`${API_URL}/pistas/${id}`);
  return await res.json();
}

/*RESERVAS*/

export async function crearReserva(data) {
  const res = await fetch(`${API_URL}/reservas/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export const listarReservasUsuario = async (idUsuario) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:8090/api/reservas/usuario/${idUsuario}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener reservas");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};
