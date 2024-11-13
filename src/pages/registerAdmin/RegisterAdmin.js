import { useState } from "react";
import axios from "axios";
import background from "../../assets/images/fundoregister.jpeg";
import { Link } from "react-router-dom";

function RegisterAdmin() {

    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const registerUser = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        // Verificação de campos vazios
        if (!cnpj || !telefone || !email || !password || !passwordConfirmation) {
            setErrorMessage('Por favor, preencha todos os campos.');
            setLoading(false);
            return;
        }

        // Verificação se as senhas coincidem
        if (password !== passwordConfirmation) {
            setErrorMessage('As senhas não coincidem.');
            setLoading(false);
            return;
        }

        try {
            // Enviar dados para a API (simulação)
            const response = await axios.post('http://127.0.0.1:8080/api/register', {
                cnpj,
                telefone,
                email,
                password,
            });

            if (response.data.success) {
                // Redireciona para a página de login após o cadastro bem-sucedido
                window.location.href = '/login.html';
            } else {
                setErrorMessage('Erro no cadastro. Tente novamente.');
            }
        } catch (error) {
            setErrorMessage('Ocorreu um erro ao tentar cadastrar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="bg-gray-900 flex items-center justify-center min-h-screen"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
            }}
        >
            <div
                style={{
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    backgroundColor: '#000',
                    color: '#FFFFFF',
                    minWidth: '500px',
                    maxWidth: '500px',
                    margin: '0 auto',
                }}
                className="rounded-lg shadow-xl overflow-hidden"
            >
                <div className="p-8">
                        <Link to="/Login">
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
                        Tocloc.
                        Tocou, locou, jogou!
                    </h2>
                    <p style={{ color: '#b3b3b3' }} className="mt-4 text-center">Realize seu Cadastro e Reserva sua Quadra.</p>

                    {errorMessage && (
                        <div className="text-red-500 text-center mt-4">
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    <form onSubmit={registerUser} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm">
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <input
                                    placeholder="CNPJ"
                                    style={{
                                        backgroundColor: '#4a4a4a',
                                        borderColor: '#4a4a4a',
                                        color: '#FFFFFF',
                                    }}
                                    className="appearance-none relative block w-full px-3 py-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    required
                                    type="text"
                                    name="cnpj"
                                    id="cnpj"
                                    value={cnpj}
                                    onChange={(e) => setCnpj(e.target.value)}
                                />
                                <input
                                    placeholder="Telefone"
                                    style={{
                                        backgroundColor: '#4a4a4a',
                                        borderColor: '#4a4a4a',
                                        color: '#FFFFFF',
                                    }}
                                    className="appearance-none relative block w-full px-3 py-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    required
                                    type="tel"
                                    name="telefone"
                                    id="telefone"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <input
                                    placeholder="Email"
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

                            <div className="mt-5">
                                <input
                                    placeholder="Confirme sua Senha"
                                    style={{ backgroundColor: '#4a4a4a', borderColor: '#4a4a4a', color: '#FFFFFF' }}
                                    className="appearance-none relative block w-full px-3 py-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    required
                                    autoComplete="current-password"
                                    type="password"
                                    name="passwordconfirmation"
                                    id="passwordconfirmation"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                />
                            </div>

                            {password !== passwordConfirmation && passwordConfirmation && (
                                <div className="text-red-500 text-sm mt-2">
                                    Senhas não coincidem
                                </div>
                            )}
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 ring-offset-gray-800"
                                    type="checkbox"
                                    aria-describedby="terms"
                                    id="terms"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-500">
                                    Eu aceito os{' '}
                                    <a href="#" className="font-medium text-primary-600 hover:underline">
                                        Termos e condições
                                    </a>
                                </label>
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
                                {loading ? 'Cadastrando...' : 'Cadastrar Empresa'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterAdmin;
