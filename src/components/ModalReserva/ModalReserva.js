import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../pages/home/Loader';

export function ModalReserva() {
    const [open, setOpen] = useState(false);
    const [dados, setDados] = useState([]);
    const [dataSelecionada, setDataSelecionada] = useState('');
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
    const [horarioSelecionado, setHorarioSelecionado] = useState('');
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3001/api/availabilities");
                setDados(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados do backend:", error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (dataSelecionada) {
            const horarios = dados.filter(reserva => {
                const dataReserva = parseISO(reserva.data);
                const dataSelecionadaObj = parseISO(dataSelecionada);
                dataReserva.setHours(dataReserva.getHours() + dataReserva.getTimezoneOffset() / 60);

                return dataReserva.getDate() === dataSelecionadaObj.getDate() &&
                    dataReserva.getMonth() === dataSelecionadaObj.getMonth() &&
                    dataReserva.getFullYear() === dataSelecionadaObj.getFullYear() &&
                    reserva.status === 'disponivel';
            });

            const horariosOrdenados = horarios.sort((a, b) => {
                const horaA = new Date(`1970-01-01T${a.hora_inicio}Z`);
                const horaB = new Date(`1970-01-01T${b.hora_inicio}Z`);
                return horaA - horaB;
            });

            setHorariosDisponiveis(horariosOrdenados);
        }
    }, [dataSelecionada, dados]);

    async function enviarReserva(data, horario) {
        try {
            const horarioSelecionadoObj = horariosDisponiveis.find(
                (reserva) => `${reserva.hora_inicio} - ${reserva.hora_fim}` === horario
            );

            if (!horarioSelecionadoObj) {
                toast.error("Erro ao encontrar a disponibilidade selecionada.");
                return;
            }

            const dataReservaCompleta = `${data}T${horario.split(' - ')[0]}`;

            const response = await axios.post("http://localhost:3001/api/reservations", {
                data_reserva: dataReservaCompleta,
                id_disponibilidade: horarioSelecionadoObj.id,
                status: "pendente",
            });

            setHorariosDisponiveis((prevHorarios) =>
                prevHorarios.filter((reserva) => reserva.id !== horarioSelecionadoObj.id)
            );

            toast.success("Reserva criada com sucesso!");

            limparCampos();

            setOpen(false);

            setTimeout(() => {
                setCarregando(false);
                navigate(-1);
            }, 3000);

        } catch (error) {
            console.error("Erro ao criar reserva:", error.response || error.message);
            toast.error("Erro ao criar a reserva. Tente novamente.");
        }
    }

    const getDatasUnicas = () => {
        const datasUnicas = [];
        dados.forEach((reserva) => {
            const dataFormatada = format(parseISO(reserva.data), 'yyyy-MM-dd');
            if (!datasUnicas.includes(dataFormatada)) {
                datasUnicas.push(dataFormatada);
            }
        });
        return datasUnicas;
    };

    const formatarData = (data) => {
        return format(parseISO(data), 'dd/MM/yyyy');
    };

    const limparCampos = () => {
        setDataSelecionada('');
        setHorarioSelecionado('');
        setHorariosDisponiveis([]);
    };

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
                            <h2 className="text-2xl font-bold">Selecione sua Reserva</h2>
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
                                    {getDatasUnicas().map((data) => (
                                        <option key={data} value={data}>
                                            {formatarData(data)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {dataSelecionada && (
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Selecione um horário:</label>
                                    <select
                                        onChange={(e) => setHorarioSelecionado(e.target.value)}
                                        value={horarioSelecionado}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-green-300"
                                    >
                                        <option value="">Selecione um horário</option>
                                        {horariosDisponiveis.map((reserva) => (
                                            <option key={reserva.id} value={`${reserva.hora_inicio} - ${reserva.hora_fim}`}>
                                                {reserva.hora_inicio} - {reserva.hora_fim}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={() => {
                                    if (!dataSelecionada || !horarioSelecionado) {
                                        toast.warn("Por favor, selecione a data e o horário.");
                                        return;
                                    }

                                    enviarReserva(dataSelecionada, horarioSelecionado);
                                }}
                                className="w-full px-4 py-2 text-white bg-green-700 rounded-md hover:bg-green-800"
                            >
                                Finalizar Reserva
                            </button>

                            <button
                                onClick={() => {
                                    setOpen(false);
                                    limparCampos();
                                }}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {carregando && <Loader />}

            <ToastContainer />
        </>
    );
}

export default ModalReserva;
