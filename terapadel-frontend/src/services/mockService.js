export function listarClubsMock() {
  return [
    {
      id: 1,
      nombre: "Club Pádel Centro",
      direccion: "C/ Falsa 123",
      telefono: "600 000 000",
      pistas: [{ id: 10, nombre_pista: "Pista 1" }, { id: 11, nombre_pista: "Pista 2" }],
    },
    {
      id: 2,
      nombre: "Padel Garden",
      direccion: "Av. Jardín 5",
      telefono: "600 111 222",
      pistas: [{ id: 20, nombre_pista: "Pista A" }],
    },
  ];
}

export function getPistaMock(id) {
  const horario = [];
  for (let h = 9; h <= 21; h++) {
    horario.push(`${String(h).padStart(2, "0")}:00`);
    horario.push(`${String(h).padStart(2, "0")}:30`);
  }
  return {
    id,
    nombre_pista: `Pista ${id}`,
    horario,
    ocupadas: ["10:00", "11:30", "18:00"],
  };
}