class FlappyBird {

  spriteX = 0;
  spriteY = 0;
  largura = 33;
  altura = 24;
  x = 10;
  y = 50;
  gravidade = 0.2;
  velocidade = 0;
  pulo = 4.6;
  frameAtual = 0


  movimentos = [
    { spriteX: 0, spriteY: 0 }, // asa pra cima
    { spriteX: 0, spriteY: 26 }, // asa no meio
    { spriteX: 0, spriteY: 52 } // asa pra baixo
  ]

  atualizaFrame() {
    const intervaloFrames = 10;
    const passouIntervalo = frames % intervaloFrames === 0

    if (passouIntervalo) {
      const baseIncremento = 1;
      const incremento = baseIncremento + this.frameAtual;
      const baseRepeticao = this.movimentos.length;
      this.frameAtual = incremento % baseRepeticao
    }
  };

  pula() {
    som_PULO.play()
    this.velocidade = -this.pulo
  };

  atualiza() {
    if (this.colisao(this, globais.chao)) {
      som_HIT.play();
      setTimeout(() => {
        mudaParaTela(Telas.GAME_OVER);
      }, 500);
      return;
    }
    this.velocidade += this.gravidade
    this.y += this.velocidade
  };

  desenha() {
    this.atualizaFrame()
    const { spriteX, spriteY } = this.movimentos[this.frameAtual]
    contexto.drawImage(
      sprites,
      spriteX, spriteY,
      this.largura, this.altura, // Tamanho do recorte na Sprite
      this.x, this.y,
      this.largura, this.altura
    );
  };

  colisao(flappyBird, { chao }) {
    const y = flappyBird.y;
    const altura = flappyBird.altura
    return y + altura >= chao.y;
  }
}