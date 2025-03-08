import { useState } from "react";
import { loginUser } from "../../services/authService"; // Ajusta la ruta según tu proyecto
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import loginImage from "../../assets/images/logo.png"; // Importa la imagen

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Alterna entre tema claro y oscuro
  const toggleTheme = () => setDarkMode((prev) => !prev);

  // Manejo de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const data = await loginUser({ login, password });
      localStorage.setItem("token", data.token);
      console.log(data.token);
      setSuccess("¡Inicio de sesión exitoso!");
    } catch (err) {
      const errMsg =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Credenciales incorrectas o error en el servidor.";
      console.error("Error al iniciar sesión:", errMsg);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`container-fluid vh-100 d-flex align-items-center justify-content-center ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
    >
      <div className="row w-75 shadow-lg rounded overflow-hidden">
        
        {/* 📌 Imagen para pantallas GRANDES (Desktop) */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={loginImage}
            alt="Login"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* 📌 Imagen para pantallas PEQUEÑAS (Mobile) */}
        <div className="col-12 d-block d-md-none text-center mt-3">
          <img
            src={loginImage}
            alt="Login"
            className="img-fluid"
            style={{ maxWidth: "150px" }} // Ajusta el tamaño de la imagen en móviles
          />
        </div>

        {/* Columna de formulario */}
        <div className={`col-12 col-md-6 p-4 p-md-5 ${darkMode ? "bg-dark text-white" : "bg-white"}`}>
          
          {/* Alternar Modo Oscuro */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-outline-secondary btn-sm" onClick={toggleTheme}>
              {darkMode ? "☀ Modo Claro" : "🌙 Modo Oscuro"}
            </button>
          </div>

          {/* Iconos de redes sociales interactivos */}
          <div className="d-flex justify-content-end gap-3 mt-3">
            <a
              href="https://www.facebook.com/people/Los-santos-Pizzer%C3%ADa/100087933571753/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-primary social-icon"
            >
              <i className="bi bi-facebook fs-4"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-danger social-icon"
            >
              <i className="bi bi-instagram fs-4"></i>
            </a>
          </div>

          <h2 className="text-center fw-bold mt-3 mb-3">Pizzería Los Santos</h2>

          <form onSubmit={handleSubmit}>
            {/* Usuario */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Correo/Usuario</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa tu correo o usuario"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>

            {/* Contraseña con icono alineado */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Contraseña</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>

            {/* Mensajes de éxito/error */}
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Botón de inicio de sesión */}
            <button type="submit" className="btn btn-warning w-100" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Iniciando Sesión ...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>

            {/* Opciones extra */}
            <div className="d-flex justify-content-between mt-3">
              <div>
                <input type="checkbox" id="rememberMe" className="me-2" />
                <label htmlFor="rememberMe">Recordarme</label>
              </div>
              <a href="#" className="text-decoration-none">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>

          {/* Registro */}
          <p className="mt-4 text-center">
            ¿No tienes cuenta? <a href="#" className="text-decoration-none text-primary">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
