var Game, GameConfig;
window.addEventListener("load", init);

function init(){
  startPhaserGame();
}

function startPhaserGame(){
  GameConfig = {
    type: Phaser.AUTO,
    width: 360,
    height: 360,
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
      }
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [ Scene1 ]
  }
  Game = new Phaser.Game( GameConfig );
}

class Scene1 extends Phaser.Scene{
  constructor(){
    super( "Scene1" );
  }

  preload(){
    this.load.image( "background", "background.jpg" );
    this.load.image( "player", "player.png" );
  }

  create(){
    // background image that is statically placed to help show the movement within the world
    this.background = this.add.image( 0, 0, "background" ).setOrigin(0,0);

    // create keys to use while navigating the world
    this.CONTROLS = this.createControls();

    // add a character to control
    this.player = this.physics.add.image( 10, 10, "player").setOrigin( 0 );
    // set player collision area
    this.physics.world.setBounds( 0, 0, 1280, 1024 );
    this.player.body.setCollideWorldBounds( true );

    // set world clipping for the camera
    // create a boudary that is 20px larger than the background image
    this.cameras.main.setBounds( -10, -10, 1300, 1044);
    this.cameras.main.startFollow( this.player );

    // speed to move the camera at
    this.cameraSpeed = 10;
    this.playerSpeed = 200;
  }

  update(){
    // this.cameraController( this.CONTROLS, this.cameras.main );

    // player controller
    this.playerController( this.CONTROLS, this.player );
  }

  createControls(){
    let controls = this.input.keyboard.addKeys("W,A,S,D");
    return controls;
  }

  cameraController( controls, camera ){
    if( controls["W"].isDown ){
      camera.scrollY -= this.cameraSpeed;
    }
    else if( controls["D"].isDown ){
      camera.scrollX += this.cameraSpeed;
    }
    else if( controls["S"].isDown ){
      camera.scrollY += this.cameraSpeed;
    }
    else if( controls["A"].isDown ){
      camera.scrollX -= this.cameraSpeed;
    }
    return;
  }

  playerController( controls, player){
    if( controls["W"].isDown ){
      player.body.setVelocity( 0, -this.playerSpeed );
    }
    else if( controls["D"].isDown ){
      player.body.setVelocity( this.playerSpeed, 0 );
    }
    else if( controls["S"].isDown ){
      player.body.setVelocity( 0, this.playerSpeed );
    }
    else if( controls["A"].isDown ){
      player.body.setVelocity( -this.playerSpeed, 0 );
    }
    else{
      player.body.setVelocity( 0, 0 );
    }
    return;
  }
}