class Example1 extends Phaser.Scene {
  constructor() {
    super('Example1')
  }

  preload() {
    this.load.image('ball', '/assets/ball.png')
    this.load.image('paddle', '/assets/paddle.png')
    this.load.image('brick', '/assets/brick.png')
  }

  create() {
    
    // physics ball bouncing
    this.ball = this.physics.add.sprite(200, 550, 'ball')
    this.ball.setVelocity(-75, -350)
    this.ball.setBounce(1,1)
    this.ball.setCollideWorldBounds(true)
    this.ball.body.onWorldBounds = true
    this.physics.world.on('worldbounds', (body, up, down) => {
      console.log('down', down)
      if(down) {
        this.ball.destroy()
      }
    })
    
    // paddle section
    this.paddle = this.physics.add.sprite(200, 580, 'paddle')
    this.paddle.body.setImmovable(true)
    this.paddle.body.allowGravity = false
    this.paddle.setCollideWorldBounds(true)

    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    this.physics.add.collider(this.paddle, this.ball, this.hitPaddle, null, this)


    // brick section
    let brickInfo = {
      width: 50,
      height: 20,
      count: {
        row: 5,
        col: 3
      },
      offset: {
        top: 50,
        left: 80
      },
      padding: 10
    }

    this.bricks = this.physics.add.staticGroup({
      immovable: false,
      allowGravity: false
    })

    for(let y=0; y < brickInfo.count.col; y++) {
      for(let x=0; x < brickInfo.count.row; x++) {
        let brickX = (x * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left
        let brickY = (y * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.top

        this.bricks.create(brickX, brickY, 'brick')
      }
    }

    this.physics.add.collider(this.ball, this.bricks, this.hitBricks, null, this)
  }

  update() {
    this.movePaddle()
  }

  movePaddle() {
    if(this.key_A.isDown)
      this.paddle.x -= 5

    if(this.key_D.isDown)
      this.paddle.x += 5
  }

  hitBricks(ball, brick) {
    brick.disableBody(true, true)
  }

  hitPaddle(paddle, ball) {
    let diff = 0;

    if (ball.x < paddle.x) {
      diff = paddle.x - ball.x;
      ball.setVelocityX(-10 * diff);
    } else if (ball.x > paddle.x){
      diff = ball.x -paddle.x;
      ball.setVelocityX(10 * diff);
    } else {
      ball.setVelocityX(2 + Math.random() * 8)
    }
  }

}