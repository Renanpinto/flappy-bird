class Chao {
  chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
  }

  atualiza() {
    const movimentoDoChao = 1
    const repeteEm = this.chao.largura / 2
    const movimentacao = this.chao.x - movimentoDoChao

    this.chao.x = movimentacao % repeteEm
  }

  desenha() {
    contexto.drawImage(
      sprites,
      this.chao.spriteX, this.chao.spriteY,
      this.chao.largura, this.chao.altura, // Tamanho do recorte na Sprite
      this.chao.x, this.chao.y,
      this.chao.largura, this.chao.altura
    );

    contexto.drawImage(
      sprites,
      this.chao.spriteX, this.chao.spriteY,
      this.chao.largura, this.chao.altura, // Tamanho do recorte na Sprite
      (this.chao.x + this.chao.largura), this.chao.y,
      this.chao.largura, this.chao.altura
    );
  };
}