import axios from "axios";
import { useState } from "react";
import background from "../../assets/images/fundoregister.jpeg";
import { Link } from "react-router-dom";


function Login() {
    // Estados para o formulário e status de autenticação
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Função para fazer login
    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true); // Ativa o carregamento
        setErrorMessage(''); // Limpa a mensagem de erro

        try {
            // Enviar requisição de login para a API usando axios
            const response = await axios.post('http://127.0.0.1:8080/api/login', { email, password });

            // Se login for bem-sucedido
            if (response.data.success) {
                // Salva o token de autenticação no LocalStorage
                localStorage.setItem('token', response.data.token);
                // Redireciona para  página inicial
                window.location.href = 'http://127.0.0.1:5501/home.html';
            } else {
                // Se as credenciais forem inválidas
                setErrorMessage('Credenciais inválidas. Tente novamente.');
            }
        } catch (error) {
            setErrorMessage('Ocorreu um erro ao tentar fazer login. Tente novamente.');
        } finally {
            setLoading(false); // Desativa o carregamento
        }
    };

    return (
        <div
            class="bg-gray-900 flex items-center justify-center min-h-screen"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
            }}
        >


            <div className="w-full">
                <div
                    style={{
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        backgroundColor: '#000',
                        color: '#FFFFFF',
                        maxWidth: '500px',
                        margin: '0 auto',

                    }}

                    className="rounded-lg shadow-xl overflow-hidden"
                >
                    <div className="p-8">
                        <Link to="/">
                        <div className="absolute top-4 left-4">
                        
                            <button
                                className="text-transparent bg-transparent border-2 border-transparent w-8 h-8 flex items-center justify-center rounded-full ">
                                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="#EDEDED" stroke-width="4" stroke-linejoin="round" />
                                    <path d="M32.4917 24.5H14.4917" stroke="#EDEDED" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M23.4917 15.5L14.4917 24.5L23.4917 33.5" stroke="#EDEDED" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>                            
                        </div>
                        </Link>

                        <h2 style={{ color: '#F7F7F7' }} className="text-center text-3xl font-extrabold">
                            Tocloc. Tocou, locou, jogou!
                        </h2>
                        <p style={{ color: '#b3b3b3' }} className="mt-4 text-center">Realize seu Login e Reserva sua Quadra.</p>

                        {/* Exibir mensagem de erro */}
                        {errorMessage && (
                            <div className="text-red-500 text-center mt-4">
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <form onSubmit={loginUser} className="mt-8 space-y-6">
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <label className="sr-only" htmlFor="email">
                                        Endereço de Email
                                    </label>
                                    <input
                                        placeholder="Endereço de Email"
                                        style={{
                                            backgroundColor: '#4a4a4a',
                                            borderColor: '#4a4a4a',
                                            color: '#FFFFFF',
                                        }}
                                        className="appearance-none relative block w-full px-3 py-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        required
                                        autoComplete="email"
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="sr-only" htmlFor="password">
                                        Senha
                                    </label>
                                    <input
                                        placeholder="Senha"
                                        style={{
                                            backgroundColor: '#4a4a4a',
                                            borderColor: '#4a4a4a',
                                            color: '#FFFFFF',
                                        }}
                                        className="appearance-none relative block w-full px-3 py-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        required
                                        autoComplete="current-password"
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col items-start mt-4">
                                <div className="text-sm mt-2">
                                    <a
                                        style={{ color: '#2f6f39' }}
                                        className="font-medium"
                                        href="#"
                                    >
                                        Esqueceu sua senha?
                                    </a>
                                </div>

                                <div className="text-sm mt-2">
                                    <Link to="/registerAdmin"
                                        style={{ color: '#2f6f39' }}
                                        className="font-medium"
                                        href="/registerAdmin.html"
                                    >
                                        Sou empresa e quero me cadastrar
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    style={{
                                        backgroundColor: '#2f6f39',
                                        color: '#1a1a1a',
                                    }}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Carregando...' : 'Logar'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div style={{ backgroundColor: '#4a4a4a', color: '#b3b3b3' }} className="px-8 py-4 text-center">
                        <span>Não possui uma conta? </span>
                        <Link to="/register"
                            style={{ color: '#2f6f39' }}
                            className="font-medium"
                            href="/register.html"
                        >
                            Cadastrar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;