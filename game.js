class levelOne extends Phaser.Scene {
    constructor() {
        super('levelone')
    }
    preload() {
        this.load.path = 'assets/'
        this.load.image('character', 'char.png');
        this.load.image('ground', 'ground.png');
        this.load.image('brick', 'brick.png');
        this.load.image('coin', 'coin.png');


    }
    create() {
        let angle = 0
        this.score = 0
        const graphics = this.add.graphics({
            lineStyle: {
                width: 10,
                color: 0xffffff,
                alpha: 0.5
            }});
        let line = new Phaser.Geom.Line();
        let ground = this.physics.add.staticImage(1920/2, 1000, 'ground')
            .setScale(2.5)
            .setInteractive({useHandCursor: true})
            .refreshBody();
        const char1 = this.add.sprite(300, 850, 'character')
            .setScale(.4);
        const char1P = this.physics.add.sprite(300, 850, 'character')
            .setScale(.4)
            .setDepth(1)
            .disableBody(true, true)
            .setDrag(.9, 0)
            .setDamping(true)
            .setBounce(.25, .6);
        const blocks = this.physics.add.group({
            defaultKey: 'brick',
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            dragX: 0.5,
            dragY: 0.5,
            useDamping: true
        });
        const walls = this.physics.add.staticGroup();
        const wall1 = this.add.rectangle(1250, 698, 75, 400, 0xffffff);
        this.physics.add.existing(wall1, true);

        /*
        const coin1 = this.physics.add.sprite(800, 600, 'coin')
            .setScale(4)
            .setDepth(0);
        coin1.body.allowGravity = false; */

        const coins = this.physics.add.group();
        function createCoin(x, y) {
            const coin = coins.create(x, y, 'coin');
            coin.setScale(4);
            coin.setDepth(0);
            coin.body.allowGravity = false;
            return coin;
        }
        let coin1 = createCoin(800, 600);
        const block = blocks.create(1000, 835)
            .setMass(2)
            .setScale(8);
        
        char1P.setCollideWorldBounds(true) // eventually set to false so player can miss
        this.physics.add.collider(char1P, ground);
        this.physics.add.collider(ground, block);
        this.physics.add.collider(char1P, block);
        this.physics.add.collider(char1P, wall1);
        this.physics.add.overlap(char1P, coin1, (char1P, coin) => {
                coin.destroy();
                this.score += 1;
                console.log('Score: ', this.score);
            }
        );


        this.input.on('pointermove', (pointer) => {
            angle = Phaser.Math.Angle.BetweenPoints(char1, pointer);
            char1.rotation = angle;
            Phaser.Geom.Line.SetToAngle(line, char1.x, char1.y, angle, 128);
            graphics.clear().strokeLineShape(line);
        })

        this.input.on('pointerup', () => {
            char1P.enableBody(true, 300, 850, true, true);
            this.physics.velocityFromRotation(angle, 1000, char1P.body.velocity);
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