
// Variavel que vai receber as cartas que entrarão em jogo
let cartas = [];

// Variavel que recebe o nuemero de cartas que vão ser usadadas no jogo
let numeroDeCartas;

let numeroCartasSelecionadas = 0;

let cartasRestantes;

let numeroJogadas = 0;

const elementoMain = document.querySelector("main");

// Funcao que solicita numero de cartas e define o tamanho da area util
// para o jogo ser executado
function solicitaCartas(){

    // Pergunta ao usuario, com quantas cartas ele quer jogar
    numeroDeCartas = prompt("Digite com quantas cartas você quer jogar:");

    // Entquanto o numero digitado não for par, for menor que 4 ou maior que 14
    while(numeroDeCartas % 2 != 0 || numeroDeCartas < 4 || numeroDeCartas > 14){
        // Pergunta novamente o numero de cartas
        numeroDeCartas = prompt("Digite com quantas cartas você quer jogar:");
    }

    cartasRestantes  = numeroDeCartas;

    // Variavel que vai definir o tamanho da main para disposição de cartas
    const tamanhoJogo = (numeroDeCartas/2) * 151;

    // Define o tamanho certo para o elemento main
    elementoMain.style.width = tamanhoJogo + "px";
}

function posicionarCartas(){
    // Laço de repetição que prenche o vetor com duplas de cartãs
    for(let i = 0; i < numeroDeCartas/2; i++){
        cartas.push("var"+i);
        cartas.push("var"+i);
        console.log(cartas);
    }

    // Embaralha as cartas no vetor
    cartas.sort(comparador);

    // Laço de repetição que aciciona as cartas seguindo a ordem do vetor dentro do espaço desejado
    for(let  i = 0; i < cartas.length; i++){
        elementoMain.innerHTML +=  `
        <div class="carta" onclick="virarCarta(this)">
            <div class="carta-fechada face">
                <img src="./imagens/costas-carta.png" alt="">
            </div>
            <div class="carta-aberta face">
                <img class="${cartas[i]}" src="./imagens/gifs/${cartas[i]}.gif" alt="">
            </div>
        </div>`;
    }
}

function virarCarta(cartaSelecionada){

    numeroJogadas++;

    if(numeroCartasSelecionadas < 2){

        numeroCartasSelecionadas++
        cartaSelecionada.classList.add("carta-selecionada");

        cartaSelecionada.querySelector(".carta-aberta").classList.add("carta-aberta-selecionada");
        cartaSelecionada.querySelector(".carta-fechada").classList.add("carta-fechada-selecionada");

        verificaCartas();
    }
}

function verificaCartas(){

    if (numeroCartasSelecionadas == 2){
        let cartasSelecionadasTemp = document.querySelectorAll(".carta-selecionada");

        let classeCartaSelecionada = [];

        for(let i = 0; i < 2; i++){
            classeCartaSelecionada[i]=cartasSelecionadasTemp[i].querySelector(".carta-aberta-selecionada img").classList;
        }

        if(classeCartaSelecionada[0][0] == classeCartaSelecionada[1][0]){
            let cartasCorretas = document.querySelectorAll(".carta-selecionada")
            for(let i =0; i < 2; i++){
                cartasCorretas[i].classList.add("acerto");
                cartasCorretas[i].classList.remove("carta-selecionada");
            }
            
            numeroCartasSelecionadas  = 0;
            cartasRestantes  = cartasRestantes  - 2;
        }

        else{
            setTimeout(fecharCartasErradas, 1000);
        }

    }
    console.log(cartasRestantes);

}

function fecharCartasErradas(){
    let cartasErradas = document.querySelectorAll(".carta-selecionada");
    for(let i =0; i < 2; i++){
        cartasErradas[i].querySelector(".carta-aberta-selecionada").classList.remove("carta-aberta-selecionada");
        cartasErradas[i].querySelector(".carta-fechada-selecionada").classList.remove("carta-fechada-selecionada");
        cartasErradas[i].classList.remove("carta-selecionada");
        numeroCartasSelecionadas  = 0;
    }
}

function verificaCartasRestantes(){
    if(cartasRestantes == 1){
        alert(`Você ganhou em ${numeroJogadas} jogadas!`);
    }
}

solicitaCartas();
posicionarCartas();

function comparador() { 
    return Math.random() - 0.5;
}
