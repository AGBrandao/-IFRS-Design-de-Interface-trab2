
// Cor de fundo
let opcoesBorda = document.querySelectorAll(".opcoesBorda");

botaoCor.addEventListener('input', function() {
    for (let i = 0; i < opcoesBorda.length; i++) {                
        opcoesBorda[i].style.backgroundColor = botaoCor.value;
            }
});
botaoCorZero.addEventListener('click', function() {
    for (let i = 0; i < opcoesBorda.length; i++) {                
        opcoesBorda[i].style.backgroundColor =  "#c1d8a1";
            }
        });
// Bordas

    botaoBordaVerde.addEventListener('click', function() {
        opcoesBorda.forEach(function(div) {
            div.style.borderColor = "green";
        });
    });
    botaoBordaAzul.addEventListener('click', function() {
        opcoesBorda.forEach(function(div) {
            div.style.borderColor = "blue";
        });
    });
    botaoBordaPreta.addEventListener('click', function() {
        opcoesBorda.forEach(function(div) {
            div.style.borderColor = "black";
        });
    });
    // Tamanho da imagem
  
    document.getElementById('tamanhador').addEventListener('input', function() {
    let tamanho = ((tamanhador.value / 100) * 300 )+10;
    frutaImagem.style.width = `${tamanho}px`;
    frutaImagem.style.height = 'auto';
});

// Radio
    let frutaImagem = document.getElementById('frutaImagem');
    
    document.querySelectorAll('input[name="seletor"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (document.getElementById('imgMaca').checked) {
                frutaImagem.src = 'img/maca.png';
                frutaImagem.alt = 'Imagem de Maçã';
            } else if (document.getElementById('imgMelancia').checked) {
                frutaImagem.src = 'img/melancia.png';
                frutaImagem.alt = 'Imagem de Melancia';
            } else if (document.getElementById('imgMorango').checked) {
                frutaImagem.src = 'img/morango.png';
                frutaImagem.alt = 'Imagem de morangos';
            }
        });
    });
            
// Texto Mutável 

let textoMutavel = document.getElementById('textoMutavel').querySelector('p');

document.getElementById('textoMutavelAlinhamento').addEventListener('change', function() {
    textoMutavel.style.textAlign = document.getElementById('textoMutavelAlinhamento').value;
});

document.getElementById('textoMutavelAlterador').addEventListener('change', function() {
    switch (document.getElementById('textoMutavelAlterador').value) {
        case 'bacterias':
            textoMutavel.textContent = "Você sabia que, para cada célula que contém o seu DNA, existem dez bactérias habitando seu corpo?";
            break;
        case 'exercicio':
            textoMutavel.textContent = "Ao realizar exercícios simples como uma caminhada, você aumenta a taxa de oxigenação do corpo todo e remove coágulos locais que se forma espontaneamente com o passar do tempo.";
            break;
        case 'cerebro':
            textoMutavel.textContent = "O cérebro humano desafia lei da entropia: quanto mais é utilizado, melhor se torna o seu desempenho! Quanto menos recebe estímulos, menos capaz vai se tornando. Isso se chama 'neuroplasticidade'.";
            break;
        default:
            textoMutavel.textContent = "Você sabia que, para cada célula que contém o seu DNA, existem dez bactérias habitando seu corpo?";
            break;
    }
});

// Pop up
document.getElementById('enviar').addEventListener('click', function() {

alert("Você respondeu: " + document.getElementById('nomeFruta').value);
});