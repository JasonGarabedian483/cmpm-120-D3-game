class levelOne extends Phaser.Scene {
    constructor() {
        super('levelone')
    }
    preload() {
        this.load.path = 'assets/'
        this.load.image('character', 'char.png');
        this.load.image('ground', 'ground.png');
        this.load.image('brick', 'brick.png');


    }
    create() {
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffffff, alpha: 0.5 } });
        let line = new Phaser.Geom.Line();
        let ground = this.physics.add.staticImage(1920/2, 1000, 'ground')
            .setScale(2.5)
            .setInteractive({useHandCursor: true})
            .refreshBody();
        const char1 = this.add.sprite(300, 850, 'character')
            .setScale(.4);
        const char1P = this.physics.add.sprite(300, 850, 'character')
            .setScale(.4)
            .disableBody(true, true)
            .setDrag(.9, 0)
            .setDamping(true);
        const blocks = this.physics.add.group({
            defaultKey: 'brick',
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            dragX: 0.5,
            dragY: 0.5,
            useDamping: true
        });

        const block = blocks.create(1000, 835)
            .setMass(2)
            .setScale(8);
        
        char1P.setCollideWorldBounds(true) // eventually set to false so player can miss
        this.physics.add.collider(char1P, ground);
        this.physics.add.collider(ground, block);
        this.physics.add.collider(char1P, block);
        let angle = 0

        this.input.on('pointermove', (pointer) => {
            angle = Phaser.Math.Angle.BetweenPoints(char1, pointer);
            char1.rotation = angle;
            Phaser.Geom.Line.SetToAngle(line, char1.x, char1.y, angle, 128);
            graphics.clear().strokeLineShape(line);
        })

        this.input.on('pointerup', () => {
            char1P.enableBody(true, 300, 850, true, true);
            this.physics.velocityFromRotation(angle, 600, char1P.body.velocity);
             /*this.tweens.add({
                targets: [char1], 
                alpha: 0,
                duration: 0
            }); */
        });

        this.input.keyboard.on('keydown-R', () => {
            this.scene.restart();
        });

    }

    update() {
    }
}

const game = new Phaser.Game({
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
    scene: [levelOne],
    title: "Angry Viscous",
});