console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

const telaDeInicio = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,

  desenha() {
    contexto.drawImage(
      sprites,
      telaDeInicio.spriteX, telaDeInicio.spriteY,
      telaDeInicio.largura, telaDeInicio.altura, // Tamanho do recorte na Sprite
      telaDeInicio.x, telaDeInicio.y,
      telaDeInicio.largura, telaDeInicio.altura
    );
  }
}

const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,

  desenha() {
    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0, 0, canvas.height, canvas.width)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na Sprite
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na Sprite
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura
    );
  }
}

const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,

  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura, // Tamanho do recorte na Sprite
      chao.x, chao.y,
      chao.largura, chao.altura
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura, // Tamanho do recorte na Sprite
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura
    );
  }
}

function novoFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.2,
    velocidade: 0,
    pulo: 4.6,
    
    pula() {
      this.velocidade = -this.pulo
    },
  
    atualiza() {
      if(colisao(flappyBird, chao)){
        console.log("COLIDIU")
        som_HIT.play();
        mudaParaTela(Telas.INICIO)
      }
      flappyBird.velocidade += this.gravidade
      flappyBird.y += flappyBird.velocidade
    },
  
    desenha() {
      contexto.drawImage(
        sprites,
        flappyBird.spriteX, flappyBird.spriteY,
        flappyBird.largura, flappyBird.altura, // Tamanho do recorte na Sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura
      );
    }
  }
  return flappyBird;
}

function colisao(flappyBird, chao){
  const y = flappyBird.y;
  const altura = flappyBird.altura
  return y+altura >= chao.y;
}

function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) telaAtiva.inicializa()
}

let telaAtiva = {}
const globais = {}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = novoFlappyBird();
    },
    desenha() {
      planoDeFundo.desenha();
      chao.desenha();
      globais.flappyBird.desenha();
      telaDeInicio.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO)
    },
    atualiza() { }
  },
  JOGO: {
    desenha() {
      planoDeFundo.desenha();
      chao.desenha();
      globais.flappyBird.desenha();
    },
    click() {
      globais.flappyBird.pula();
    },
    atualiza() {
      globais.flappyBird.atualiza();
    }
  }
}


function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  requestAnimationFrame(loop);
}

window.addEventListener('click', () => {
  telaAtiva.click();
})
mudaParaTela(Telas.INICIO)
loop();