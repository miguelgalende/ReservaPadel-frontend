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
  return await res.json();
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
  return await res.json();
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

export async function listarReservasUsuario(idUsuario) {
  const res = await fetch(`${API_URL}/reservas/usuario/${idUsuario}`);
  return await res.json();
}
