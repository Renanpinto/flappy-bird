class FlappyBird {
  flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.2,
    velocidade: 0,
    pulo: 4.6,
    frameAtual: 0
  };

  movimentos = [
    { spriteX: 0, spriteY: 0 }, // asa pra cima
    { spriteX: 0, spriteY: 26 }, // asa no meio
    { spriteX: 0, spriteY: 52 } // asa pra baixo
  ]

  atualizaFrame() {
    const intervaloFrames = 10;
    
    if ((frames % intervaloFrames) === 0) {
      const baseIncremento = 1;
      const incremento = baseIncremento + this.flappyBird.frameAtual;
      const baseRepeticao = this.movimentos.length;
      this.flappyBird.frameAtual = incremento % baseRepeticao
    }
  };

  pula() {
    this.flappyBird.velocidade = -this.flappyBird.pulo
  };

  atualiza() {
    if (this.colisao(this.flappyBird, globais.chao)) {
      console.log("COLIDIU")
      som_HIT.play();
      mudaParaTela(Telas.INICIO)
    }
    this.flappyBird.velocidade += this.flappyBird.gravidade
    this.flappyBird.y += this.flappyBird.velocidade
  };

  desenha() {
    this.atualizaFrame()
    const { spriteX, spriteY } = this.movimentos[this.flappyBird.frameAtual]
    contexto.drawImage(
      sprites,
      spriteX, spriteY,
      this.flappyBird.largura, this.flappyBird.altura, // Tamanho do recorte na Sprite
      this.flappyBird.x, this.flappyBird.y,
      this.flappyBird.largura, this.flappyBird.altura
    );
  };

  colisao(flappyBird, {chao}) {
    const y = flappyBird.y;
    const altura = flappyBird.altura
    return y + altura >= chao.y;
  }
}