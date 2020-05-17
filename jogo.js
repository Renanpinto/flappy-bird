console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

const som_PULO = new Audio();
som_PULO.src = './efeitos/pulo.wav'

const som_PONTO = new Audio();
som_PONTO.src = './efeitos/ponto.wav'

let frames = 0
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

function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) telaAtiva.inicializa()
}

let telaAtiva = {}
const globais = {}

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaço: 80,

    desenha() {
      const espacamentoEntreCanos = 100;

      canos.pares.forEach((par) => {
        //CANO DO CEU
        const randomY = par.y
        const canoCeuX = par.x;
        const canoCeuY = randomY;
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
        )

        //CANO DO CHAO
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + randomY;
        contexto.drawImage(
          sprites,
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        )

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        }
        
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },
    pares: [],

    colidiu(par) {
      const cabecaFlappyBird = globais.flappyBird.y;
      const peFlappyBird = globais.flappyBird.y + globais.flappyBird.altura;
      
      if(globais.flappyBird.x >= par.x) {
        if(cabecaFlappyBird <= par.canoCeu.y) {
          return true
        }
  
        if(peFlappyBird >= par.canoChao.y) {
          return true
        }
        setTimeout(() => {
          som_PONTO.play()
        }, 300);
      }

      

      return false
    },

    atualiza() {
      const passou100frames = frames % 100 === 0;
      if (passou100frames) {
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1)
        })
      }

      canos.pares.forEach(par => {
        par.x -= 2;

        if (canos.colidiu(par)) {
          console.log('colidiu')
          som_HIT.play();
          setTimeout(() => {
            mudaParaTela(Telas.INICIO);
          }, 500);
          return;
        }

        if (par.x + canos.largura < 0) {
          canos.pares.shift();
        }
      })
      return;

    }
  }
  return canos
}
const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = new FlappyBird();
      globais.canos = criaCanos();
      globais.chao = new Chao();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.flappyBird.desenha();
      globais.canos.desenha();
      globais.chao.desenha();
      telaDeInicio.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO)
    },
    atualiza() {
      globais.chao.atualiza()
    }
  },
  JOGO: {
    desenha() {
      planoDeFundo.desenha();
      globais.canos.desenha();
      globais.flappyBird.desenha();
      globais.chao.desenha();
    },
    click() {
      globais.flappyBird.pula();
    },
    atualiza() {
      globais.flappyBird.atualiza();
      globais.chao.atualiza();
      globais.canos.atualiza()
    }
  }
}


function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames += 1
  requestAnimationFrame(loop);
}

window.addEventListener('click', () => {
  telaAtiva.click();
})
mudaParaTela(Telas.INICIO)
loop();

