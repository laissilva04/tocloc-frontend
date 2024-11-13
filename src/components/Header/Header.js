import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div class="container-header">
            <div class="header-menu font-1-m cor-0">
               <Link to="/Login">Entrar </Link>
            </div>
        </div>
    )
}

export default Header;