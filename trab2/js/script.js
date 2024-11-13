//Main
//variáveis importantes
let podeMover = false;
let podeAtirar = false;
let podeAtirarInimigo = false;
let escoreJogador = localStorage.getItem('escoreJogador');
let escoreInimigo = localStorage.getItem('escoreInimigo');
if (localStorage.getItem('escoreJogador') == null) {
    localStorage.setItem('escoreJogador', '0');
    escoreJogador = '0';
} else {
    escoreJogador = localStorage.getItem('escoreJogador');
}
if (localStorage.getItem('escoreInimigo') == null) {
    escoreInimigo = localStorage.setItem('escoreInimigo', '0');
    escoreInimigo = '0';
} else {
    escoreInimigo = localStorage.getItem('escoreInimigo');
}
document.getElementById('escoreJogador').innerText = escoreJogador;
document.getElementById('escoreInimigo').innerText = escoreInimigo;
let musica = new Audio('../audio/music.mp3');
let avatarJogador = document.getElementById('avatarJogador');
let avatarInimigo = document.getElementById('avatarInimigo');
let timerColisaoInimigo;
let timerColisaoJogador;
let timerMoveInimigo;
let timerAtiraInimigo;
let timerBala;
let timerBalaInimigo;
// listener para iniciar o jogo
document.querySelector("#iniciar").addEventListener("click", () => {
    iniciar()
});

//Funções
// Inicia jogo ((re)aloca elementos e (re)cria timers)
function iniciar() {
    musica.currentTime = 0;
    musica.play();
    musica.loop = true;
    musica.volume = 0.5;
    avatarInimigo.src = "./img/akuma.gif";
    avatarJogador.src = "./img/ryu.gif";
    document.querySelector("#jogador").style.left = "15vw";
    document.querySelector("#jogador").style.top = "35vh";
    document.querySelector("#inimigo").style.left = "70vw";
    document.querySelector("#inimigo").style.top = "45vh";
    vidaInimigo.style.width = "40vw";
    vidaJogador.style.width = "0vw";

    timerColisaoInimigo = setInterval("colisaoInimigo()", 5);
    timerColisaoJogador = setInterval("colisaoJogador()", 5);
    timerMoveInimigo = setInterval("moveInimigo()", 500);
    timerAtiraInimigo = setInterval("atirarInimigo()", 1000);
    podeAtirar = true;
    podeAtirarInimigo = true;
    podeMover = true;

    document.querySelector("#acima").addEventListener("click", moverAcima);
    document.querySelector("#esquerda").addEventListener("click", moverEsquerda);
    document.querySelector("#direita").addEventListener("click", moverDireita);
    document.querySelector("#baixo").addEventListener("click", moverBaixo);
    document.querySelector("#atirar").addEventListener("click", () => {
        atirar()
    });

    document.addEventListener('keyup', moveTeclado);
    document.addEventListener('touchstart', moveTouch);

    document.querySelector("#iniciar").style.visibility = "hidden";
}
// Mover jogador com touch
function moveTouch(Direcao) {
    // event.preventDefault();
    const touch = Direcao.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    let jogador = document.querySelector("#jogador");
    let jogadorLeft = parseInt(getComputedStyle(jogador).left);
    let jogadorTop = parseInt(getComputedStyle(jogador).top);
    let jogadorWidth = parseInt(getComputedStyle(jogador).width);
    let jogadorHeight = parseInt(getComputedStyle(jogador).height);
    let fundoWidth = parseInt(getComputedStyle(fundo).width);
    let fundoHeight = parseInt(getComputedStyle(fundo).height);
    if (touchY < jogadorTop) {
        move('acima');
    } else if (touchY > jogadorTop + jogadorHeight && touchY < fundoHeight) {
        move('baixo');
    } else if (touchX < jogadorLeft && touchY < fundoHeight) {
        move('esquerda');
    } else if (touchX > jogadorLeft + jogadorWidth && touchY < fundoHeight) {
        move('direita');
    }
}
// Mover jogador com teclado
function moveTeclado(Direcao) {
    switch (Direcao.key) {
        case 'w':
        case 'W':
            move('acima');
            break;
        case 'a':
        case 'A':
            move('esquerda');
            break;
        case 's':
        case 'S':
            move('baixo');
            break;
        case 'd':
        case 'D':
            move('direita');
            break;
        case ' ':
            atirar();
            break;
        case 'p':
        case 'P':
            resetarEscore();
            break;
    }
}
// Mover jogador com botões (funções nomeadas para serem removidas posteriormente e evitar movimento duplicado)
function moverAcima() {
    move('acima');
}

function moverEsquerda() {
    move('esquerda');
}

function moverDireita() {
    move('direita');
}

function moverBaixo() {
    move('baixo');
}

function move(Direcao) {

    //pega os dados do jogador
    let jogador = document.querySelector("#jogador");
    let jogadorLeft = parseInt(getComputedStyle(jogador).left);
    let jogadorTop = parseInt(getComputedStyle(jogador).top);
    let jogadorWidth = parseInt(getComputedStyle(jogador).width);
    let jogadorHeight = parseInt(getComputedStyle(jogador).height);

    let fundoWidth = parseInt(getComputedStyle(fundo).width);
    let fundoHeight = parseInt(getComputedStyle(fundo).height);

    // quanto vai se mover
    let percentualMovimento = 0.05;
    let moveX = fundoWidth * percentualMovimento;
    let moveY = fundoHeight * percentualMovimento;
    
    if (podeMover) {
        if (Direcao == "esquerda") {
            jogador.style.left = (jogadorLeft - moveX) + 'px';
            if (jogadorLeft <= (jogadorWidth)) {
                jogador.style.left = 0;
            }
        }
        if (Direcao == "acima") {
            jogador.style.top = (jogadorTop - moveY) + 'px';
            if (jogadorTop <= (jogadorHeight * 4)) {
                jogador.style.top = jogadorHeight * 3;
            }
        }
        if (Direcao == "direita") {
            jogador.style.left = (jogadorLeft + moveX) + 'px';
            if (jogadorLeft >= (fundoWidth / 2) - jogadorWidth * 3) {
                jogador.style.left = (fundoWidth / 2) - jogadorWidth * 2;
            }
        }
        if (Direcao == "baixo") {
            jogador.style.top = (jogadorTop + moveY) + 'px';
            if (jogadorTop >= (fundoHeight - jogadorHeight*2)) {
                jogador.style.top = (fundoHeight - jogadorHeight*2);
            }
        }
    }
}
// Move inimigo aleatoriamente
function moveInimigo() {

    // pega os dados do inimigo
    let inimigo = document.querySelector("#inimigo");
    let inimigoLeft = parseInt(getComputedStyle(inimigo).left);
    let inimigoTop = parseInt(getComputedStyle(inimigo).top);
    let inimigoHeight = parseInt(getComputedStyle(inimigo).height);
    let inimigoWidth = parseInt(getComputedStyle(inimigo).width);

    let fundoWidth = parseInt(getComputedStyle(fundo).width);
    let fundoHeight = parseInt(getComputedStyle(fundo).height);

    // quanto vai se mover
    let percentualMovimento = 0.05;
    let moveX = fundoWidth * percentualMovimento;
    let moveY = fundoHeight * percentualMovimento;

    function random() {
        return Math.floor(Math.random() * 400);
    }

    let valorRandom = random();

    switch (true) {
        case (valorRandom < 100):
            clearInterval(timerMoveInimigo);
            inimigo.style.left = inimigoLeft - moveX;
            if (inimigoLeft <= (fundoWidth / 2) + inimigoWidth) {
                inimigo.style.left = (fundoWidth / 2) + inimigoWidth;
            }
            break;
        case (valorRandom < 200):
            clearInterval(timerMoveInimigo);
            inimigo.style.top = (inimigoTop - moveY) + 'px';
            if (inimigoTop <= (inimigoHeight * 3)) {
                inimigo.style.top = inimigoHeight * 3;
            }
            break;
        case (valorRandom < 300):
            clearInterval(timerMoveInimigo);
            inimigo.style.left = (inimigoLeft + moveX) + 'px';
            if (inimigoLeft >= (fundoWidth - inimigoWidth*2)) {
                inimigo.style.left = (fundoWidth - inimigoWidth);
            }
            break;
        case (valorRandom < 400):
            clearInterval(timerMoveInimigo);
            inimigo.style.top = (inimigoTop + moveY) + 'px';
            if (inimigoTop >= (fundoHeight - inimigoHeight*2)) {
                inimigo.style.top = (fundoHeight - inimigoHeight*2);
            }
            break;
    }
    clearInterval(timerMoveInimigo);
    timerMoveInimigo = setInterval("moveInimigo()", 500)
}
// Balas do jogador
function atirar() {
    let jogador = document.querySelector("#jogador");

    if (podeAtirar == true) {
        bala = document.createElement("div");
        bala.classList.add("bullets");
        bala.style.left = parseInt(getComputedStyle(jogador).left);
        bala.style.top = parseInt(getComputedStyle(jogador).top) + 10;
        fundo.appendChild(bala);
        podeAtirar = false;
        timerBala = setInterval("moveBala(bala)", 10);
        new Audio('../audio/hadouken.wav').play();
        avatarJogador.src = "./img/ryuShoots.gif";
        setTimeout(() => {
            avatarJogador.src = "./img/ryu.gif";
        }, 500);
    }
}
// Mover as Balas do jogador
function moveBala(bala) {
    let fundoWidth = parseInt(getComputedStyle(fundo).width);
    let balaLeft = parseInt(getComputedStyle(bala).left);
    let percentualMovimento = 0.005;
    let moveX = fundoWidth * percentualMovimento;
    bala.style.left = (balaLeft + moveX) + 'px';
    if (balaLeft >= fundoWidth) {
        bala.parentElement.removeChild(bala);
        clearInterval(timerBala);
        podeAtirar = true;
    }
}
// colisão da bala do jogador com o inimigo
function colisaoInimigo() {

    if (!podeAtirar && podeMover) {

        //pega os dados do inimigo
        let inimigo = document.querySelector("#inimigo");
        let inimigoLeft = parseInt(getComputedStyle(inimigo).left);
        let inimigoTop = parseInt(getComputedStyle(inimigo).top);
        let inimigoHeight = parseInt(getComputedStyle(inimigo).height);
        let inimigoWidth = parseInt(getComputedStyle(inimigo).width);

        let bala = document.querySelector(".bullets");
        let vidaInimigo = document.querySelector("#vidaInimigo");
        let vidaMaximaInimigo = document.querySelector("#vidaMaximaInimigo");

        //pega os dados da bala
        let balaLeft = parseInt(getComputedStyle(bala).left);
        let balaTop = parseInt(getComputedStyle(bala).top);
        let balaHeight = parseInt(getComputedStyle(bala).height);
        let balaWidth = parseInt(getComputedStyle(bala).width);


        //se bala e inimigo colidirem reduz HP do inimigo
        if (((balaLeft + balaWidth >= inimigoLeft) && (balaLeft <= inimigoLeft + inimigoWidth)) && ((balaTop + balaHeight >= inimigoTop) && (balaTop <= inimigoTop + inimigoHeight))) {
            let hpReduzidoInimigo = parseInt(getComputedStyle(vidaInimigo).width) - (parseInt(getComputedStyle(vidaMaximaInimigo).width) / 5);
            vidaInimigo.style.width = hpReduzidoInimigo + "px";
            new Audio('../audio/hit.wav').play();
            bala.parentElement.removeChild(bala);
            clearInterval(timerBala);
            podeAtirar = true;
            if (hpReduzidoInimigo <= 0) {
                vidaInimigo.style.width = "0px";
                new Audio('../audio/KO.mp3').play();
                new Audio('../audio/akumaDies.wav').play();
                avatarInimigo.src = "./img/akumaDies.gif";
                avatarJogador.src = "./img/ryuWins.gif";
                escoreJogador = localStorage.getItem('escoreJogador');
                escoreJogador++;
                document.getElementById("escoreJogador").innerText = escoreJogador;
                zerarTimers();
                mensagemVitoria();
            }
        }
    }
}
// Balas do inimigo (timer + random)
function atirarInimigo() {

    function random() {
        return Math.floor(Math.random() * 100);
    }

    if (random() >= 50) {
        if (podeAtirarInimigo) {
            balaInimigo = document.createElement("div");
            balaInimigo.classList.add("bulletsBad");
            balaInimigo.style.left = parseInt(getComputedStyle(inimigo).left);
            balaInimigo.style.top = parseInt(getComputedStyle(inimigo).top) + 10;
            fundo.appendChild(balaInimigo);
            podeAtirarInimigo = false;
            timerBalaInimigo = setInterval("moveBalaInimigo(balaInimigo)", 10);
            new Audio('../audio/messatsu.wav').play();
            avatarInimigo.src = "./img/akumaShoots.gif";
            setTimeout(() => {
                avatarInimigo.src = "./img/akuma.gif";
            }, 500);
        }
    }
}
// Mover as Balas do inimigo
function moveBalaInimigo(balaInimigo) {
    let balaInimigoLeft = parseInt(getComputedStyle(balaInimigo).left);
    let fundoWidth = parseInt(getComputedStyle(fundo).width);
    let percentualMovimento = 0.005;
    let moveX = fundoWidth * percentualMovimento;
    balaInimigo.style.left = (balaInimigoLeft - moveX) + 'px';
    if (balaInimigoLeft <= 0) {
        balaInimigo.parentElement.removeChild(balaInimigo);
        clearInterval(timerBalaInimigo);
        podeAtirarInimigo = true;
    }
}
// colisão da bala do inimigo com o jogador
function colisaoJogador() {

    if (!podeAtirarInimigo) {

        //pega os dados do jogador
        let jogador = document.querySelector("#jogador");
        let jogadorLeft = parseInt(getComputedStyle(jogador).left);
        let jogadorTop = parseInt(getComputedStyle(jogador).top);
        let jogadorWidth = parseInt(getComputedStyle(jogador).width);
        let jogadorHeight = parseInt(getComputedStyle(jogador).height);

        // define objetos
        let bala = document.querySelector(".bulletsBad");
        let vidaJogador = document.querySelector("#vidaJogador");
        let vidaMaximaJogador = document.querySelector("#vidaMaximaJogador");

        //pega os dados da bala
        let balaLeft = parseInt(getComputedStyle(bala).left);
        let balaTop = parseInt(getComputedStyle(bala).top);
        let balaHeight = parseInt(getComputedStyle(bala).height);
        let balaWidth = parseInt(getComputedStyle(bala).width);

        //se bala e jogador colidirem reduz HP do jogador
        if (((balaLeft + balaWidth >= jogadorLeft) && (balaLeft <= jogadorLeft + jogadorWidth)) && ((balaTop + balaHeight >= jogadorTop) && (balaTop <= jogadorTop + jogadorHeight))) {
            let hpReduzidoJogador = parseInt(getComputedStyle(vidaJogador).width) + (parseInt(getComputedStyle(vidaMaximaJogador).width) / 4.9);
            balaInimigo.parentElement.removeChild(balaInimigo);
            clearInterval(timerBalaInimigo);
            podeAtirarInimigo = true;
            if (hpReduzidoJogador <= parseInt(getComputedStyle(vidaMaximaJogador).width)) {
                vidaJogador.style.width = hpReduzidoJogador + "px";
                new Audio('../audio/hit.wav').play();
            } else {
                vidaJogador.style.width = getComputedStyle(vidaMaximaJogador).width;
                new Audio('../audio/KO.mp3').play();
                new Audio('../audio/ryuDies.wav').play();
                avatarJogador.src = "./img/ryuDies.gif";
                avatarInimigo.src = "./img/akumaWins.gif";
                escoreInimigo = localStorage.getItem('escoreInimigo');
                escoreInimigo++;
                document.getElementById("escoreInimigo").innerText = escoreInimigo;
                zerarTimers();
                mensagemDerrota();
            }
        }
    }
}
// Zera todos os timers (é invocada quando o jogo acaba)
function zerarTimers() {
    document.querySelector("#iniciar").style.visibility = "visible";
    musica.pause();
    clearInterval(timerMoveInimigo);
    clearInterval(timerAtiraInimigo);
    clearInterval(timerBala);
    clearInterval(timerBalaInimigo);
    clearInterval(timerColisaoInimigo);
    clearInterval(timerColisaoJogador);
    podeAtirar = false;
    podeAtirarInimigo = false;
    podeMover = false;
    let bala = document.querySelectorAll(".bullets");
    bala.forEach(bala => {
        bala.parentElement.removeChild(bala);
    });
    let balaInimigo = document.querySelectorAll(".bulletsBad");
    balaInimigo.forEach(balaInimigo => {
        balaInimigo.parentElement.removeChild(balaInimigo);
    });
    localStorage.setItem('escoreJogador', escoreJogador);
    localStorage.setItem('escoreInimigo', escoreInimigo);
    document.removeEventListener('keyup', moveTeclado);
    document.removeEventListener('touchstart', moveTouch);
    document.querySelector("#acima").removeEventListener("click", moverAcima);
    document.querySelector("#esquerda").removeEventListener("click", moverEsquerda);
    document.querySelector("#direita").removeEventListener("click", moverDireita);
    document.querySelector("#baixo").removeEventListener("click", moverBaixo);
}
// Reseta o escore se aperta P ou p
function resetarEscore() {
    escoreJogador = 0;
    escoreInimigo = 0;
    localStorage.setItem('escoreJogador', escoreJogador);
    localStorage.setItem('escoreInimigo', escoreInimigo);
    document.getElementById('escoreJogador').innerText = escoreJogador;
    document.getElementById('escoreInimigo').innerText = escoreInimigo;
    mensagemResetarEscore();
}
//mensagens na tela
function mensagemResetarEscore() {
    let fundoWidth = parseInt(getComputedStyle(fundo).width);
    let fundoHeight = parseInt(getComputedStyle(fundo).height);
    let mensagemResetarEscore = document.createElement("div");
    mensagemResetarEscore.classList.add("mensagemResetarEscore");
    mensagemResetarEscore.style.left = (fundoWidth / 2) - ((10) * (fundoWidth / 100)) + 'px';
    mensagemResetarEscore.style.top = (fundoHeight / 2) - ((10) * (fundoHeight / 100)) + 'px';
    fundo.appendChild(mensagemResetarEscore);
    setTimeout(() => {
        fundo.removeChild(mensagemResetarEscore);
    }, 500);
}

function mensagemDerrota() {
    let fundoWidth = parseInt(getComputedStyle(fundo).width);
    let fundoHeight = parseInt(getComputedStyle(fundo).height);
    let mensagemDerrota = document.createElement("div");
    mensagemDerrota.classList.add("mensagemDerrota");
    mensagemDerrota.style.left = (fundoWidth / 2) - ((10) * (fundoWidth / 100)) + 'px';
    mensagemDerrota.style.top = (fundoHeight / 2) - ((10) * (fundoHeight / 100)) + 'px';
    fundo.appendChild(mensagemDerrota);
    setTimeout(() => {
        fundo.removeChild(mensagemDerrota);
    }, 2000);
};

function mensagemVitoria() {
    let fundoWidth = parseInt(getComputedStyle(fundo).width);
    let fundoHeight = parseInt(getComputedStyle(fundo).height);
    let mensagemVitoria = document.createElement("div");
    mensagemVitoria.classList.add("mensagemVitoria");
    mensagemVitoria.style.left = (fundoWidth / 2) - ((10) * (fundoWidth / 100)) + 'px';
    mensagemVitoria.style.top = (fundoHeight / 2) - ((10) * (fundoHeight / 100)) + 'px';
    fundo.appendChild(mensagemVitoria);
    setTimeout(() => {
        fundo.removeChild(mensagemVitoria);
    }, 2000);
};