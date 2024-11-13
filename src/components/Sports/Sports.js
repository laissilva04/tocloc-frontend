import "./Sports.css";
import tennis from "../../assets/images/tennis.jpg";
import futebol from "../../assets/images/futebol.jpg";
import volei from "../../assets/images/volleyball.jpg";


function Sports() {
    return (

        <div class="esportes-lista">
        <h2 class="font-1-xx1 cor-12">escolha o <span class="cor-p2">espaço.</span></h2>

        <ul>
          <li>
            <a href="">
              <img src={tennis} alt="Tennis"/>
                <h3 class="font-1-xl cor-12">Quadra de tênis</h3>
            </a>
          </li>

          <li>
            <a href="">
              <img src={futebol} alt="Futebol"/>
                <h3 class="font-1-xl cor-12">Campo de Futebol</h3>
            </a>
          </li>

          <li>
            <a href="">
              <img src={volei} alt="Volei"/>
                <h3 class="font-1-xl cor-12">Campo de Vôlei </h3>
            </a>
          </li>

        </ul>
      </div>

    );
}

export default Sports;