import React from "react";
import logout from "../../assets/icons/logout.svg";
import { Link } from "react-router-dom";

function HeaderLogOut() {
    return (
        <div className="border-b-2 border-gray-300 mb-6">

            <header className="bg-black text-white py-2 flex justify-center">
                <div className="w-[95%] flex justify-center">
                    <h1 className="text-center font-1-xl mb-3">Tocloc. <span class="cor-p1">Tocou, locou, jogou!</span> </h1>
                </div>
                <Link to="/">
                    <button className="mt-4"> <img src={logout} alt="" /></button>
                </Link>
            </header>
        </div>
    );
}

export default HeaderLogOut;