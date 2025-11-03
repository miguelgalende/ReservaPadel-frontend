import React, { useEffect, useState } from "react";
import { listarClubsMock } from "../services/mockService";
import { useNavigate } from "react-router-dom";

function ClubCard({ club, onClick }) {
  return (
    <div onClick={() => onClick(club)} className="bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-lg">
      <h3 className="text-lg font-semibold">{club.nombre}</h3>
      <p className="text-gray-500 text-sm">{club.direccion}</p>
      <p className="text-gray-400 text-xs mt-2">{club.telefono}</p>
    </div>
  );
}

export default function Home() {
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setClubs(listarClubsMock());
  }, []);

  const handleClick = (club) => {

    const pistaId = club.pistas[0]?.id || 1;
    navigate(`/pista/${pistaId}`, { state: { club } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Clubs disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clubs.map((c) => (
          <ClubCard key={c.id} club={c} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}