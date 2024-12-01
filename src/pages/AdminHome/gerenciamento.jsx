import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderLogOut from '../../components/Header/HeaderLogOut';


const AdminDashboard = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const fetchPlaces = async () => {
    setLoading(true);
    setError(null);
    try {
      /*console.log('Fetching reservations...');*/
      const reservationsResponse = await axios.get('http://localhost:3001/api/reservations/details');
      /*console.log('Reservations response:', reservationsResponse.data);*/
      
      const placesMap = new Map();
      
      reservationsResponse.data.forEach(reservation => {
        const place = reservation.id_local_esportivo;
        if (!place) {
          console.warn('Reservation without place:', reservation);
          return;
        }
        if (!placesMap.has(place.id)) {
          placesMap.set(place.id, {
            id: place.id,
            nome: place.nome,
            localizacao: place.localizacao,
            reservations: []
          });
        }
       // Adiciona a reserva com a estrutura correta dos dados
       placesMap.get(place.id).reservations.push({
        id: reservation.id,
        data: reservation.id_disponibilidade.data,
        hora_inicio: reservation.id_disponibilidade.hora_inicio,
        hora_fim: reservation.id_disponibilidade.hora_fim,
        data_reserva: reservation.data_reserva,
        status: reservation.status
      });
    });
      
      const placesArray = Array.from(placesMap.values());
      console.log('Processed places:', placesArray);
      setPlaces(placesArray);
    } catch (error) {
      console.error('Erro ao buscar reservas e locais:', error);
      setError('Falha ao carregar os dados. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const navigateToCadastrar = () => {
    navigate('/RegistrarLocal'); // Caminho para a tela de cadastro
  };
  

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatTime = (timeString) => {
    return timeString.substring(0, 5); // Pega apenas as horas e minutos
  };

  /*if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }*/

  return (
    <><HeaderLogOut/>
    <div className="container mx-auto p-4 font-sans bg-gray-500 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-500">Dashboard do Administrador</h1>
        <button
          onClick={navigateToCadastrar}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md"
        >
          Cadastrar Novo Local
        </button>
      </div>
      {places.length === 0 ? (
        <div className="text-center text-gray-600 mt-10">
          <p>Nenhum local encontrado.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {places.map(place => (
            <div key={place.id} className="bg-white rounded-lg shadow-xl overflow-hidden border border-black">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{place.nome}</h2>
                <p className="text-gray-600 mb-4">{place.localizacao}</p>
                <div className="mb-4">
                  <h3 className="font-semibold text-lg text-gray-700 mb-2">Reservas:</h3>
                  <div className="space-y-2">
                    {place.reservations?.map(reservation => (
                      <div key={reservation.id} className="bg-gray-50 p-3 rounded-md shadow">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-500">
                            Data: {reservation.data}
                          </span>
                          <span
                            className={`text-sm font-bold px-2 py-1 rounded ${reservation.status === 'confirmada'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'}`}
                          >
                            {reservation.status}
                          </span>
                        </div>
                        <div className="text-gray-700">
                          Horário: {formatTime(reservation.hora_inicio)} - {formatTime(reservation.hora_fim)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Reserva realizada em: {formatDate(reservation.data_reserva)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div></>
  );
};

export default AdminDashboard;


