
// Variavel que vai receber as cartas que entrarão em jogo
let cartas = [];
// Variavel que recebe o nuemero de cartas que vão ser usadadas no jogo
let numeroDeCartas;

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
                <img src="./imagens/gifs/${cartas[i]}.gif" alt="">
            </div>
        </div>`;
    }
}

function virarCarta(cartaSelecionada){

    cartaSelecionada.querySelector(".carta-aberta").classList.add("carta-aberta-selecionada");
    cartaSelecionada.querySelector(".carta-fechada").classList.add("carta-fechada-selecionada");


}

solicitaCartas();
posicionarCartas();

function comparador() { 
    return Math.random() - 0.5;
}
