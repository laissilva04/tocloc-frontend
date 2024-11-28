import "./Sports.css";
import tennis from "../../assets/images/tennis.jpg";
import futebol from "../../assets/images/futebol.jpg";
import volei from "../../assets/images/volleyball.jpg";
import { Link } from "react-router-dom";


function Sports() {
  return (
    <div className="esportes-lista">
      <h2 className="font-1-xx1 cor-12">
        escolha o <span className="cor-p2">espaço.</span>
      </h2>

      <ul>
        <li>
          <Link to="/TenisQuadras">
            <img src={tennis} alt="Tennis" />
            <h3 className="font-1-xl cor-12">Quadra de tênis</h3>
          </Link>
        </li>

        <li>
          <Link to="/FutebolQuadras">
            <img src={futebol} alt="Futebol" />
            <h3 className="font-1-xl cor-12">Campo de Futebol</h3>
          </Link>
        </li>

        <li>
          <Link to="/VoleiQuadras">
            <img src={volei} alt="Vôlei" />
            <h3 className="font-1-xl cor-12">Campo de Vôlei</h3>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sports;
