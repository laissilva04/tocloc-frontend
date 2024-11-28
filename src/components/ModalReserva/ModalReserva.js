'use client'

import { useState } from 'react'

const dadosBanco = {
    nome: "DB TESTE",
    datasDisponiveis: ["2023-07-01", "2023-07-02", "2023-07-03"],
    horariosDisponiveis: ["12:00", "13:00", "14:00", "19:00", "20:00", "21:00"]
}

export function ModalReserva() {
    const [open, setOpen] = useState(false)
    const [dataSelecionada, setDataSelecionada] = useState("")
    const [horarioSelecionado, setHorarioSelecionado] = useState("")

    return (
        <>

            <button
                onClick={() => setOpen(true)}
                className="bg-[#2f6f39] font-1-s text-white text-sm py-2 px-4 rounded hover:bg-[#26562d] transition-colors"
            >
                Fazer Reserva
            </button>

            {open && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-lg">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-bold">{dadosBanco.nome}</h2>
                        </div>

                        <div className="space-y-4">

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Selecione uma data:</label>
                                <select
                                    onChange={(e) => setDataSelecionada(e.target.value)}
                                    value={dataSelecionada}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-green-300"
                                >
                                    <option value="">Selecione uma data</option>
                                    {dadosBanco.datasDisponiveis.map((data) => (
                                        <option key={data} value={data}>{data}</option>
                                    ))}
                                </select>
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Selecione um horário:</label>
                                <select
                                    onChange={(e) => setHorarioSelecionado(e.target.value)}
                                    value={horarioSelecionado}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-green-300"
                                >
                                    <option value="">Selecione um horário</option>
                                    {dadosBanco.horariosDisponiveis.map((horario) => (
                                        <option key={horario} value={horario}>{horario}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-6">

                            <button
                                onClick={() => {
                                    console.log(`Reserva finalizada para ${dataSelecionada} às ${horarioSelecionado}`)
                                    setOpen(false)
                                }}
                                className="w-full px-4 py-2 text-white bg-green-700 rounded-md hover:bg-green-800"
                            >
                                Finalizar Reserva
                            </button>

                            <button
                                onClick={() => setOpen(false)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default ModalReserva