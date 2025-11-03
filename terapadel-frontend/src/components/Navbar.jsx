import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logopadel.png";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const isInitPage = location.pathname === "/";

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const [loginData, setLoginData] = useState({ emailUsuario: "", contraseñaUsuario: "" });
    const [registerData, setRegisterData] = useState({
        nombreUsuario: "",
        apellidosUsuario: "",
        telefonoUsuario: "",
        emailUsuario: "",
        contraseñaUsuario: "",
    });

    const [mensaje, setMensaje] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setMensaje("");

        try {
            const response = await fetch("http://localhost:8090/api/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            console.log("📤 Enviando login:", loginData);
            console.log("📥 Respuesta:", response.status);

            if (response.ok) {
                const usuario = await response.json();
                console.log("✅ Usuario logeado:", usuario);
                setShowLogin(false);
                navigate("/home");
            } else if (response.status === 401) {
                setMensaje("Contraseña incorrecta");
            } else if (response.status === 404) {
                setMensaje("Usuario no encontrado");
            } else {
                setMensaje("Error desconocido al iniciar sesión.");
            }
        } catch (error) {
            setMensaje("Error de conexión con el servidor.");
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        setMensaje("");
        try {
            const response = await fetch(
                "http://localhost:8090/api/usuarios/registro",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registerData),
                }
            );

            if (response.ok) {
                setShowRegister(false);
                setMensaje("Usuario registrado correctamente ✅");
            } else {
                setMensaje("No se pudo registrar el usuario ❌");
            }
        } catch (error) {
            setMensaje("Error de conexión con el servidor.");
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-blue-950 text-white flex items-center justify-between px-12 py-6 shadow-lg z-50 backdrop-blur-sm">

                <div
                    className="flex items-center gap-5 cursor-pointer"
                    onClick={() => navigate("/")}
                >

                    <img src={logo} alt="TeraPadel" className="w-16 h-16" />


                </div>


                {isInitPage ? (
                    <div className="flex gap-6">
                        <button
                            onClick={() => setShowLogin(true)}
                            className="bg-[#d7ff00] text-[#172554] font-semibold py-3 px-6 rounded-lg text-lg hover:bg-[#c0e000] transition-colors"
                        >
                            Iniciar sesión
                        </button>
                        <button
                            onClick={() => setShowRegister(true)}
                            className="border border-[#d7ff00] text-[#d7ff00] font-semibold py-3 px-6 rounded-lg text-lg hover:bg-[#d7ff00] hover:text-black transition-colors"
                        >
                            Registrarse
                        </button>

                    </div>
                ) : (
                    <div className="flex gap-8 text-xl font-semibold">
                        <Link to="/home" className="hover:text-blue-200 transition-colors">
                            Inicio
                        </Link>
                        <Link to="/reservas" className="hover:text-blue-200 transition-colors">
                            Reservas
                        </Link>
                        <Link to="/admin" className="hover:text-blue-200 transition-colors">
                            Admin
                        </Link>
                        <button
                            onClick={() => navigate("/")}
                            className="ml-4 bg-white text-blue-950 px-5 py-2 rounded-md hover:bg-blue-100 transition-colors text-lg"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </nav>


            {showLogin && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 w-96 relative">
                        <button
                            onClick={() => setShowLogin(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                        >
                            ×
                        </button>

                        <h2 className="text-2xl font-bold text-blue-950 mb-6 text-center">
                            Iniciar sesión
                        </h2>

                        <form
                            onSubmit={handleLogin}
                            className="flex flex-col gap-4"
                        >
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={loginData.emailUsuario}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, emailUsuario: e.target.value })
                                }
                                className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                                required
                            />

                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={loginData.contraseñaUsuario}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, contraseñaUsuario: e.target.value })
                                }
                                className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                                required
                            />

                            <button
                                type="submit"
                                className="bg-blue-950 text-white py-2 rounded-md hover:bg-blue-800 transition-colors font-semibold"
                            >
                                Entrar
                            </button>
                        </form>

                        {mensaje && (
                            <p className="text-center text-sm text-red-600 mt-4">{mensaje}</p>
                        )}
                    </div>
                </div>
            )}


            {showRegister && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-8 w-[420px] relative">
                        <button
                            onClick={() => setShowRegister(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold text-blue-950 mb-6 text-center">
                            Crear cuenta
                        </h2>
                        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={registerData.nombreUsuario}
                                onChange={(e) =>
                                    setRegisterData({ ...registerData, nombreUsuario: e.target.value })
                                }
                                className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Apellidos"
                                value={registerData.apellidosUsuario}
                                onChange={(e) =>
                                    setRegisterData({
                                        ...registerData,
                                        apellidosUsuario: e.target.value,
                                    })
                                }
                                className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <input
                                type="tel"
                                placeholder="Teléfono"
                                value={registerData.telefonoUsuario}
                                onChange={(e) =>
                                    setRegisterData({ ...registerData, telefonoUsuario: e.target.value })
                                }
                                className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={registerData.emailUsuario}
                                onChange={(e) =>
                                    setRegisterData({ ...registerData, emailUsuario: e.target.value })
                                }
                                className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={registerData.contraseñaUsuario}
                                onChange={(e) =>
                                    setRegisterData({
                                        ...registerData,
                                        contraseñaUsuario: e.target.value,
                                    })
                                }
                                className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-blue-950 text-white py-2 rounded-md hover:bg-blue-800 transition-colors mt-2"
                            >
                                Registrarse
                            </button>
                            {mensaje && (
                                <p className="text-center text-sm text-red-500 mt-2">
                                    {mensaje}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}