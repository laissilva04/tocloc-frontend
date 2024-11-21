import { useState } from "react";
import axios from "axios";
import background from "../../assets/images/fundoregister.jpeg";
import { Link } from "react-router-dom";

function RegisterUser() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [tipo, setTipo] = useState(""); // Novo estado para o tipo de usuário
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para realizar o cadastro
  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true); // Ativa o carregamento
    setErrorMessage(""); // Limpa a mensagem de erro

    if (senha !== senhaConfirmacao) {
      setErrorMessage("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (!tipo) {
      setErrorMessage("Selecione um tipo de usuário.");
      setLoading(false);
      return;
    }

    try {
      // Envia a requisição para a API de cadastro
      const response = await axios.post("http://127.0.0.1:3001/api/users", {
        nome,
        email,
        senha,
        tipo, // Inclui o tipo de usuário
      });

      // Verifica a resposta da API
      if (response.status === 201) {
        window.location.href = "/login"; // Redireciona para a página de login
      } else {
        setErrorMessage("Erro no cadastro. Tente novamente.");
      }
    } catch (error) {
      setErrorMessage("Ocorreu um erro ao tentar cadastrar. Tente novamente.");
    } finally {
      setLoading(false); // Desativa o carregamento
    }
  };

  return (
    <div
      className="bg-gray-900 flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          backgroundColor: "#000",
          color: "#FFFFFF",
          minWidth: "500px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
        className="rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <Link to="/Login">
            <div className="absolute top-4 left-4">
              <button className="text-transparent bg-transparent border-2 border-transparent w-8 h-8 flex items-center justify-center rounded-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                    fill="none"
                    stroke="#EDEDED"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32.4917 24.5H14.4917"
                    stroke="#EDEDED"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23.4917 15.5L14.4917 24.5L23.4917 33.5"
                    stroke="#EDEDED"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </Link>

          <h2 style={{ color: "#F7F7F7" }} className="text-center text-3xl font-extrabold">
            Tocloc. Tocou, locou, jogou!
          </h2>
          <p style={{ color: "#b3b3b3" }} className="mt-4 text-center">
            Realize seu Cadastro e Reserve sua Quadra.
          </p>

          {/* Exibir mensagem de erro */}
          {errorMessage && (
            <div className="text-red-500 text-center mt-4">
              <p>{errorMessage}</p>
            </div>
          )}

          <form onSubmit={registerUser} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div className="mt-4">
                <input
                  placeholder="Nome"
                  style={{
                    backgroundColor: "#4a4a4a",
                    borderColor: "#4a4a4a",
                    color: "#FFFFFF",
                  }}
                  className="appearance-none relative block w-full px-3 py-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <input
                  placeholder="Email"
                  style={{
                    backgroundColor: "#4a4a4a",
                    borderColor: "#4a4a4a",
                    color: "#FFFFFF",
                  }}
                  className="appearance-none relative block w-full px-3 py-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <input
                  placeholder="Senha"
                  style={{
                    backgroundColor: "#4a4a4a",
                    borderColor: "#4a4a4a",
                    color: "#FFFFFF",
                  }}
                  className="appearance-none relative block w-full px-3 py-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <input
                  placeholder="Confirme sua Senha"
                  style={{
                    backgroundColor: "#4a4a4a",
                    borderColor: "#4a4a4a",
                    color: "#FFFFFF",
                  }}
                  className="appearance-none relative block w-full px-3 py-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="senha"
                  type="password"
                  value={senhaConfirmacao}
                  onChange={(e) => setSenhaConfirmacao(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <select
                  style={{
                    backgroundColor: "#4a4a4a",
                    borderColor: "#4a4a4a",
                    color: "#FFFFFF",
                  }}
                  className="appearance-none relative block w-full px-3 py-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
                >
                  <option value="">Selecione o tipo de usuário</option>
                  <option value="jogador">Jogador</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>

            <div>
              <button
                style={{ backgroundColor: "#2f6f39", color: "#1a1a1a" }}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
