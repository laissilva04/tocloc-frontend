'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../home/Loader";


function FutebolQuadras() {

    const [esportes, setEsportes] = useState([]);
    const [busca, setBusca] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const esportesFiltrados = esportes.filter(esporte =>
        esporte.nome.toLowerCase().includes(busca.toLowerCase())
    );

    // Buscar dados da API
    useEffect(() => {
        const fetchEsportes = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/sports-places/esportes");
                setEsportes(response.data);
                const esportesData = response.data;

                const quadrasDeFutebol = esportesData.filter(esporte => esporte.categoria === "quadra de volei");
                setEsportes(quadrasDeFutebol);

            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEsportes();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if(esportesFiltrados.length === 0)  {
        return <div className="text-center">Nenhuma quadra encontrada.</div>
    }  

    // Função ListagemQuadras
    const ListagemQuadras = (esportesFiltrados) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                
                {esportesFiltrados.map(esporte => (
                    <div key={esporte.id} className="bg-white shadow rounded p-4">
                        <div className="mb-4">
                            <img
                                src={esporte.imagemUrl}
                                alt={esporte.nome}
                                className="w-full h-48 object-cover rounded"
                            />
                        </div>
                        <h2 className="text-lg font-bold">{esporte.nome}</h2>
                        <p className="text-sm text-gray-600">{esporte.descricao}</p>
                        <div className="mt-4">
                            <span className="text-sm">Localização: {esporte.localizacao}</span> <br />
                            <span className="text-sm">Jogadores: {esporte.quant_jogadores}</span>
                        </div>
                        <div className="mt-4 text-center">
                            <button
                                className="bg-[#2f6f39] font-1-s text-white text-sm py-2 px-4 rounded hover:bg-[#26562d] transition-colors"
                            >
                                Reservar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
            <h1 className="text-4xl font-1-xl cor-p1 mb-8 text-center">Quadras disponiveis para Locação.</h1>

            {/* Busca */}
            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    placeholder="Buscar Quadra  "
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full max-w-md px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {
                esportesFiltrados.length === 0 ?
                    <div className="text-center font-1-m-b cor-p1 py-20">Nenhuma quadra encontrada.</div>
                    : ListagemQuadras(esportesFiltrados)
            }

        </div>
    );
}

export default FutebolQuadras;
