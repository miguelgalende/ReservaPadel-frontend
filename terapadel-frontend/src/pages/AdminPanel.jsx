import React from "react";

export default function AdminPanel() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Panel de administración</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold mb-2">Gestión de Clubs / Pistas</h3>
          <p className="text-sm text-gray-500">Alta, baja y modificación de pistas.</p>
          <div className="mt-4">
            <button className="px-3 py-2 bg-blue-600 text-white rounded">Añadir pista</button>
          </div>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold mb-2">Reservas</h3>
          <p className="text-sm text-gray-500">Consultar y filtrar todas las reservas.</p>
          <div className="mt-4">
            <button className="px-3 py-2 bg-gray-200 rounded">Ver reservas</button>
          </div>
        </div>
      </div>
    </div>
  );
}