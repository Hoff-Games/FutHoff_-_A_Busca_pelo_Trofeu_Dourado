export default class cena4 extends Phaser.Scene {
  constructor () {
    super('gameover')
  }

  preload () {
    this.load.image('fundopreto', '../assets/cenas/fundopreto.png')
    this.load.spritesheet('cenaperdeu', '../assets/cenas/cenaperdeu.png', {
      frameWidth: 800,
      frameHeight: 450
    })
  }

  create () {
    this.imagem = this.add.sprite(400, 225, 'cenaperdeu')
    this.timer = 4
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.countdown,
      callbackScope: this,
      loop: true
    })

    this.anims.create({
      key: 'cena-trocando',
      frames: this.anims.generateFrameNumbers('cenaperdeu', {
        start: 0,
        end: 18
      }),
      frameRate: 8,
      repeat: 0
    })

    this.imagem.anims.play('cena-trocando')
  }

  update () {
  }

  countdown () {
    this.timer -= 1
    if (this.timer <= 0) {
      this.imagem.destroy()
      this.timedEvent.destroy()
      this.game.scene.stop('gameover')
      this.game.scene.start('tentarnovamente')
    }
  }
}
