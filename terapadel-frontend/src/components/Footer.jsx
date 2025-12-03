export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-6 mt-20">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg font-semibold tracking-wide">
          © {new Date().getFullYear()} Miguel Ángel Galende Verdes — Todos los
          derechos reservados.
        </p>

        <p className="text-sm text-gray-300 mt-2">
          Aplicación desarrollada para gestión de reservas de pádel.
        </p>

        <div className="mt-4 flex justify-center gap-6 text-gray-300 text-xl">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d7ff00] transition-colors"
          >
            <i className="fa-brands fa-github"></i>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d7ff00] transition-colors"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
