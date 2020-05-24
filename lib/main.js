const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 600,
  physics: {
    default: 'arcade',
  },
  scene: [ Example1 ]
}

const game = new Phaser.Game(config)