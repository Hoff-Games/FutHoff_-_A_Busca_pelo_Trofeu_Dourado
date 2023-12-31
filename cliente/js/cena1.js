/* eslint-disable no-undef */
export default class cena1 extends Phaser.Scene {
  constructor () {
    super('cena1')
  }

  preload () {
    /* fundo */
    this.load.image('cenasala', '../assets/cenas/cenasala.png')

    /* musica de fundo */
    this.load.audio('musicadefundo', '../assets/audio/musicadefundo.mp3')

    /* botoes de salas */
    this.load.spritesheet('sala1', '../assets/botoes/sala1.png', {
      frameWidth: 120,
      frameHeight: 60
    })
    this.load.spritesheet('sala2', '../assets/botoes/sala2.png', {
      frameWidth: 120,
      frameHeight: 60
    })
    this.load.spritesheet('sala3', '../assets/botoes/sala3.png', {
      frameWidth: 120,
      frameHeight: 60
    })
    this.load.spritesheet('sala4', '../assets/botoes/sala4.png', {
      frameWidth: 120,
      frameHeight: 60
    })
    this.load.spritesheet('sala5', '../assets/botoes/sala5.png', {
      frameWidth: 120,
      frameHeight: 60
    })
    this.load.spritesheet('sala6', '../assets/botoes/sala6.png', {
      frameWidth: 120,
      frameHeight: 60
    })
    this.load.spritesheet('sala7', '../assets/botoes/sala7.png', {
      frameWidth: 120,
      frameHeight: 60
    })
    this.load.spritesheet('sala8', '../assets/botoes/sala8.png', {
      frameWidth: 120,
      frameHeight: 60
    })
    this.load.spritesheet('sala9', '../assets/botoes/sala9.png', {
      frameWidth: 120,
      frameHeight: 60
    })

    /* tela cheia */
    this.load.spritesheet('tela-cheia', './assets/botoes/tela-cheia.png', {
      frameWidth: 84,
      frameHeight: 84
    })
  }

  create () {
    this.add.image(400, 225, 'cenasala')

    this.mensagem = this.add.text(120, 25, 'Escolha uma sala para entrar:', {
      fontFamily: 'monospace',
      font: '32px Courier',
      fill: '#cccccc'
    })
    this.game.scene.getScene('cena-tutorial').trilha.stop()
    this.fundo = this.sound.add('musicadefundo')
    this.fundo.loop = true
    this.fundo.play()

    this.salas = [
      {
        numero: 1,
        x: 150,
        y: 100
      },
      {
        numero: 2,
        x: 150,
        y: 225
      },
      {
        numero: 3,
        x: 150,
        y: 350
      },
      {
        numero: 4,
        x: 400,
        y: 100
      },
      {
        numero: 5,
        x: 400,
        y: 225
      },
      {
        numero: 6,
        x: 400,
        y: 350
      },
      {
        numero: 7,
        x: 650,
        y: 100
      },
      {
        numero: 8,
        x: 650,
        y: 225
      },
      {
        numero: 9,
        x: 650,
        y: 350
      }
    ]

    this.salas.forEach((sala) => {
      sala.botao = this.add.sprite(sala.x, sala.y, 'sala' + sala.numero)
        .setInteractive()
        .on('pointerdown', () => {
          this.salas.forEach((item) => {
            item.botao.destroy()
          })
          this.game.sala = sala.numero
          this.game.socket.emit('entrar-na-sala', this.game.sala)
        })

      this.game.socket.on('jogadores', (jogadores) => {
        console.log(jogadores)
        if (jogadores.segundo) {
          this.mensagem.setText('Conectando...')
          this.game.jogadores = jogadores
          this.game.scene.stop('cena1')
          this.game.scene.start('cena2')
        } else if (jogadores.primeiro) {
          this.mensagem.setText('Aguardando segundo jogador...')
          navigator.mediaDevices
            .getUserMedia({ video: false, audio: true })
            .then((stream) => {
              this.game.midias = stream
            })
            .catch((error) => console.error(error))
        }
      })
    })

    /* tela cheia */
    this.tela_cheia = this.add
      .sprite(730, 50, 'tela-cheia', 0)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scale.isFullscreen) {
          this.tela_cheia.setFrame(0)
          this.scale.stopFullscreen()
        } else {
          this.tela_cheia.setFrame(1)
          this.scale.startFullscreen()
        }
      })
      .setScrollFactor(0, 0)
  }

  update () { }
}
