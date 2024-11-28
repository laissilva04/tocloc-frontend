import React from "react";
import Sports from "../../components/Sports/Sports";
import logout from "../../assets/icons/logout.svg";
import { Link } from "react-router-dom";

function PlayerHome() {
    return (
        <div className="bg-gray-50">

            <header className="bg-black text-white py-4 flex justify-center">
                <div className="w-[95%] flex justify-center">
                    <h1 className="text-center font-1-xl mb-3">Tocloc. <span class="cor-p1">Tocou, locou, jogou!</span> </h1>
                </div>
                <Link to="/">
                    <button className="mt-4"> <img src={logout} alt="" /></button>
                </Link>
            </header>


            <section className="p-5">
                <div className="text-center mb-2">
                    <h2 className="text-4xl font-bold text-green-700 mb-2 mt-5 font-1-xl">Bem-vindo!</h2>
                    <p className="text-gray-600 font-2-l-b">Conecte-se com os melhores espaços esportivos e faça sua reserva.</p>
                </div>
                <Sports />
            </section>
        </div>
    );
}

export default PlayerHome;
