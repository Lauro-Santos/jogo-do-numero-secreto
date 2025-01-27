let listaNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

//função para exibir texto na tela
function exibirTextoTela(tag, text) {
  let campo = document.querySelector(tag);
  campo.innerHTML = text;
}

//função para gerar numero aleatório
function gerarNumeroAleatorio() {
  let quantidadeNumerosNaLista =listaNumeroSorteados.length;
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  
  if (quantidadeNumerosNaLista >= numeroLimite) {
    listaNumeroSorteados = [];
  }
  
  if (listaNumeroSorteados.includes(numeroEscolhido)) {
    console.log(listaNumeroSorteados);
    return gerarNumeroAleatorio();
  } else {
    console.log(listaNumeroSorteados);
    listaNumeroSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

//função para exibir mensagem inicial
function exibirMensagemInicial() {
  exibirTextoTela("h1", "Hora do Desafio");
  exibirTextoTela(".texto__paragrafo", "Escolha um numero entre 1 e 10");
  responsivevoice.speak("Escolha um numero entre 1 e 10", "Brazilian Portuguese Female", {rate: 0.9});
}

exibirMensagemInicial();

//função para exibir mensagem de erro
function errouTentativa(maiorOuMenos) {
  document.querySelector("input").value = "";
  exibirTextoTela("h1", `Errou! O número é ${maiorOuMenos}`);
  tentativas++;
}

//função para verificar o chute do usuario
function verificarChute() {
  //pegar o chute do usuario
  let chute = document.querySelector("input").value;

  //limite de tentativas
  if (tentativas >= 5) {
    exibirTextoTela("h1", "Você perdeu! O número secreto era " + numeroSecreto);
    exibirTextoTela(".texto__paragrafo", "Tente novamente");
    //desabilitar o botão de chute
    document.querySelector("#chutar").disabled = true;
    return;
  } else {
    //verificar se o chute é igual ao numero secreto
    if (chute == numeroSecreto) {
      let palavraTentativa = tentativas + 1 >= 2 ? "tentativas" : "tentativa";
      exibirTextoTela(
        "h1",
        `Parabéns, você acertou com ${tentativas + 1} ${palavraTentativa} !`
      );
      exibirTextoTela(
        ".texto__paragrafo",
        "O número secreto era " + numeroSecreto
      );
    } else if (chute > numeroSecreto) {
      errouTentativa("menor");
    } else {
      errouTentativa("maior");
    }
  }
}

function novoJogo() {
  //atulizar o numero secreto
  numeroSecreto = gerarNumeroAleatorio();
  //atualizar a tela
  exibirMensagemInicial();
  //limpar o input
  document.querySelector("input").value = "";
  //resetar as tentativas
  tentativas = 0;
  //habilitar o botão de chute
  document.querySelector("#chutar").disabled = false;
}
