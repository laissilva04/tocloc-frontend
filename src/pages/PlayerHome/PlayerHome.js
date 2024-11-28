import React from "react";
import Sports from "../../components/Sports/Sports";  // Certifique-se de que Sports está sendo importado corretamente

function PlayerHome() {
    return (
        <div className="bg-gray-50">
            {/* Header Simples e Preto */}
            <header className="bg-black text-white py-4">
                <h1 className="text-center text-3xl font-bold">Tocloc</h1>
            </header>

            {/* Section com conteúdo do "Bem-vindo ao Tocloc!" */}
            <section className="p-5">
                <div className="text-center mb-2">
                    <h2 className="text-4xl font-bold text-green-700 mb-2">Bem-vindo ao Tocloc!</h2>
                    <p className="text-gray-600">Conecte-se com os melhores espaços esportivos e faça sua reserva.</p>
                </div>
                <Sports />
            </section>
        </div>
    );
}

export default PlayerHome;
