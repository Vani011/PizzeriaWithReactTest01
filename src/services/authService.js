import axios from "axios";

// URL base de la API, ajusta esta variable según la URL de tu backend
const API_URL = "https://localhost:7130/api/Autenticacion";

// Función para realizar la petición de login
export const loginUser = async (credentials) => {
  console.log("credentials", credentials);
  // Realiza una petición POST al endpoint /login con las credenciales
  const response = await axios.post(`${API_URL}/login`, credentials);
  // Retorna la data (por ejemplo, token, usuario, etc.)
  return response.data;
};
