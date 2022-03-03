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
  }

  create(){
    // background image that is statically placed to help show the movement within the world
    this.background = this.add.image( 0, 0, "background" ).setOrigin(0,0);

    // create keys to use while navigating the world
    this.CONTROLS = this.createControls();

    // set world clipping for the camera
    // create a boudary that is 20px larger than the background image
    this.cameras.main.setBounds( -10, -10, 1300, 1044);

    // speed to move the camera at
    this.cameraSpeed = 10;
  }

  update(){
    this.cameraController( this.CONTROLS, this.cameras.main );
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
}