import "./Introduction.css";

import imgJogador from "../../assets/images/jogador1.jpg"

function Introduction() {
    return (
        
        <div class="introducao-bg">
        <div class="introducao-container">
            
        <div class="introducao-conteudo">
            <h1 class="font-1-xx1 cor-0">Tocloc. <span class="cor-p1">Tocou, locou, jogou!</span></h1>
            <p class="font-2-l cor-5">
                A Tocloc é uma plataforma para facilitar a reserva de locais esportivos. O objetivo da plataforma é conectar jogadores e donos de espaços, permitindo que os usuários reservem e joguem com agilidade e eficiência.
            </p>
        </div>

        <div class="introducao-imagem">
            <img src={imgJogador} alt="Jogador1"/>
        </div>

        </div>
    </div>

    )
}

export default Introduction;