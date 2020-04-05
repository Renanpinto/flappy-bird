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
  };

  pula() {
    this.flappyBird.velocidade = -this.flappyBird.pulo
  };

  atualiza() {
    if (this.colisao(this.flappyBird, chao)) {
      console.log("COLIDIU")
      som_HIT.play();
      mudaParaTela(Telas.INICIO)
    }
    this.flappyBird.velocidade += this.flappyBird.gravidade
    this.flappyBird.y += this.flappyBird.velocidade
  };

  desenha() {
    contexto.drawImage(
      sprites,
      this.flappyBird.spriteX, this.flappyBird.spriteY,
      this.flappyBird.largura, this.flappyBird.altura, // Tamanho do recorte na Sprite
      this.flappyBird.x, this.flappyBird.y,
      this.flappyBird.largura, this.flappyBird.altura
    );
  };
  
  colisao(flappyBird, chao) {
    const y = flappyBird.y;
    const altura = flappyBird.altura
    return y + altura >= chao.y;
  }
}