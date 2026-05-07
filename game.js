class levelOne extends Phaser.Scene {
    constructor() {
        super('levelone')
    }
    preload() {
        this.load.path = 'assets/'
        this.load.image('character', 'char.png');
        this.load.image('ground', 'ground.png');


    }
    create() {
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffffff, alpha: 0.5 } });
        const line = new Phaser.Geom.Line();
        const ground = this.add.image(1920/2, 1000, 'ground').setScale(2.5);
            ground.setInteractive({useHandCursor: true});
        const char1 = this.add.sprite(300, 850, 'character').setScale(.4);
        const char1P = this.physics.add.sprite(300, 850, 'character').setScale(.4); // create character
            char1P.disableBody(true, true);

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
        });
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