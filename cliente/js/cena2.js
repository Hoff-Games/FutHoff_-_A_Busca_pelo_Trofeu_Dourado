export default class cena2 extends Phaser.Scene {
  constructor () {
    super('cena2')
  }

  preload() {

    /*imagem de fundo*/
    this.load.image('mapa1', '../assets/mapa1.png')

    /*personagens*/
    this.load.spritesheet('skiler', '../assets/skiler.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    /*botoes*/
    this.load.spritesheet('direita', '../assets/direita.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('esquerda', '../assets/esquerda.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create() {

    /*personagens*/
    this.add.image(400, 225, 'mapa1')
    this.personagem = this.physics.add.sprite(400, 225, 'skiler')
      .setInteractive()
      .on('pointerdown', () => {
        this.personagem.anims.play('skiler-direita')
        this.personagem.setVelocityX(100)
      })
    
    /*animacoes*/
    /*animacoes dos personagens*/
    this.anims.create({
      key: 'skiler-direita',
      frames: this.anims.generateFrameNumbers('skiler', {
        start: 4,
        end: 7
      }),
      frameRate: 8,
      repeat: -1
    })
    this.anims.create({
      key: 'skiler-esquerda',
      frames: this.anims.generateFrameNumbers('skiler', {
        start: 0,
        end: 3
      }),
      frameRate: 8,
      repeat: -1
    })
    /*animacoes para botoes*/
    this.anims.create({
      key: 'skiler-direita',
      frames: this.anims.generateFrameNumbers('skiler', {
        start: 0,
        end: 0
      }),
      frameRate: 1
    })
    this.anims.create({
      key: 'skiler-esquerda',
      frames: this.anims.generateFrameNumbers('skiler', {
        start: 0,
        end: 0
      }),
      frameRate: 1
    })


    /*botoes*/
    this.direita = this.add.sprite(175, 350, 'direita', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('skiler-direita', true)
        this.personagem.setVelocityX(100)
       })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.setVelocityX(0)
       })

    this.esquerda = this.add.sprite(50, 350, 'esquerda', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('skiler-esquerda', true)
        this.personagem.setVelocityX(-100)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.setVelocityX(0)
      })
  }

  update() {

      }
    }