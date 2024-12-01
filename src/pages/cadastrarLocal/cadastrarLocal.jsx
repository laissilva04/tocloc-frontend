import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderLogOut from '../../components/Header/HeaderLogOut';


const LocalRegistration = () => {
    const navigate = useNavigate();
    const [place, setPlace] = useState({
      nome: '',
      localizacao: '',
      descricao: '',
      categoria: '',
      quant_jogadores: '',
      imagem: ''
    });
    const [availabilities, setAvailabilities] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // Estado para feedback de sucesso
  
    const handlePlaceChange = (e) => {
      setPlace({ ...place, [e.target.name]: e.target.value });
    };
  
    const handleAddAvailability = () => {
      setAvailabilities([...availabilities, { data: '', hora_inicio: '', hora_fim: '' }]);
    };
  
    const handleAvailabilityChange = (index, e) => {
      const newAvailabilities = availabilities.map((availability, i) => {
        if (i === index) {
          return { ...availability, [e.target.name]: e.target.value };
        }
        return availability;
      });
      setAvailabilities(newAvailabilities);
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(''); // Se você implementar mensagens de sucesso
      
        try {
          const placeReponse = await axios.post('http://localhost:3001/api/sports-places', place);
          console.log(placeReponse.data); // Veja o que exatamente está sendo retornado
        const newVenueId = placeReponse.data.place?.id;
           // Use os dados retornados pelo back-end
      
          await Promise.all(availabilities.map(async (availability) => {
            const response = await axios.post('http://localhost:3001/api/availabilities', {
              ...availability,
              id_local_esportivo: newVenueId,
            });
            console.log(response.data.message); // Exibe a mensagem de sucesso no console (ou utilize conforme necessário)
          }));
          
      
          // Exibe mensagem de sucesso
          setSuccess(placeReponse.data.message || 'Local cadastrado com sucesso!');
          setTimeout(() => navigate('/gerenciamento'), 3000);
        } catch (error) {
          // Mostra mensagem de erro, se fornecida pelo back-end
          setError(error.response?.data?.error || 'Erro ao cadastrar o local.');
          console.error('Erro ao cadastrar:', error);
        }
      };
  
    return (
        <>
        <HeaderLogOut/>
        <div className="min-h-screen bg-gradient-to-br from-green-500 to-black-600 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-gray-50 py-6 px-4 sm:px-6">
                    <h1 className="text-3xl font-extrabold text-gray-900 text-center">Cadastrar Novo Local Esportivo</h1>
                </div>
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4" role="alert">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4" role="alert">
                        <p className="text-green-700">{success}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="py-8 px-4 sm:px-6 space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={place.nome}
                                onChange={handlePlaceChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">Localização</label>
                            <input
                                type="text"
                                id="localizacao"
                                name="localizacao"
                                value={place.localizacao}
                                onChange={handlePlaceChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={place.descricao}
                                onChange={handlePlaceChange}
                                rows="3"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
                            <input
                                type="text"
                                id="categoria"
                                name="categoria"
                                value={place.categoria}
                                onChange={handlePlaceChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="quant_jogadores" className="block text-sm font-medium text-gray-700">Quantidade de Jogadores</label>
                            <input
                                type="number"
                                id="quant_jogadores"
                                name="quant_jogadores"
                                value={place.quant_jogadores}
                                onChange={handlePlaceChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                            <input
                                type="url"
                                id="imagem"
                                name="imagem"
                                value={place.imagem}
                                onChange={handlePlaceChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Disponibilidades</h2>
                        {availabilities.map((availability, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-md mb-4 shadow">
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                                    <div>
                                        <label htmlFor={`data-${index}`} className="block text-sm font-medium text-gray-700">Data</label>
                                        <input
                                            type="date"
                                            id={`data-${index}`}
                                            name="data"
                                            value={availability.data}
                                            onChange={(e) => handleAvailabilityChange(index, e)}
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div>
                                        <label htmlFor={`hora_inicio-${index}`} className="block text-sm font-medium text-gray-700">Hora Início</label>
                                        <input
                                            type="time"
                                            id={`hora_inicio-${index}`}
                                            name="hora_inicio"
                                            value={availability.hora_inicio}
                                            onChange={(e) => handleAvailabilityChange(index, e)}
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div>
                                        <label htmlFor={`hora_fim-${index}`} className="block text-sm font-medium text-gray-700">Hora Fim</label>
                                        <input
                                            type="time"
                                            id={`hora_fim-${index}`}
                                            name="hora_fim"
                                            value={availability.hora_fim}
                                            onChange={(e) => handleAvailabilityChange(index, e)}
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddAvailability}
                            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Adicionar Disponibilidade
                        </button>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => navigate('/gerenciamento')}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cadastrar Local
                        </button>
                    </div>
                </form>
            </div>
        </div></>
  );
};

export default LocalRegistration;

