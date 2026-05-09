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
        // Set background color
        this.cameras.main.setBackgroundColor('#67BED9');
        // Declaring base variables
        let angle = 0
        this.score = 0
        this.lives = 3

        // Score / Lives texts
        this.livesText = this.add.text(100, 100, 'Lives: ' + this.lives, {fontSize: '32px', color: '#000000'});
        this.scoreText = this.add.text(100, 150, 'Score: ' + this.score, {fontSize: '32px', color: '#000000'});

        // Creating assets / asset groups
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
            .setBounce(.25, .6)
            .setCollideWorldBounds(true);

        // Function to create blocks: use blocks.create(x, y)
        const blocks = this.physics.add.group({
            defaultKey: 'brick',
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            dragX: 0.5,
            dragY: 0.5,
            useDamping: true
        });

        // Function to create walls: use createWall(x, y, width, height)
        const walls = this.physics.add.staticGroup();
        const createWall = (x, y, width, height, color = 0x000000) => {
            const wall = this.add.rectangle(x, y, width, height, color)
            this.physics.add.existing(wall, true);
            walls.add(wall);
            return wall;
        };

        // Function to create coins: use createCoin(x, y)
        const coins = this.physics.add.group();
        const createCoin = (x, y) => {
            const coin = coins.create(x, y, 'coin');
            coin.setScale(4);
            coin.setDepth(0);
            coin.body.allowGravity = false;
            return coin;
        }

        let wall1 = createWall(1250, 698, 75, 400);
        let coin1 = createCoin(800, 600);
        let coin2 = createCoin(1000, 835);
        let coin3 = createCoin(1500, 835);
        let block = blocks.create(1000, 835)
            .setMass(2)
            .setScale(8);

        // Creating physics collisions
        this.physics.add.collider(char1P, ground);
        this.physics.add.collider(ground, blocks);
        this.physics.add.collider(char1P, blocks);
        this.physics.add.collider(char1P, walls);
        this.physics.add.collider(blocks, walls);
        this.physics.add.overlap(char1P, coins, (char1P, coin) => {
                coin.destroy();
                this.score += 1;
                console.log('score: ', this.score);
                this.scoreText.setText('Score: ' + this.score);
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
            this.lives -= 1;
            this.livesText.setText('Lives: ' + this.lives);
            if (this.lives < 0) {
                this.scene.restart();
            }
        });
    }

    update() {
        if(this.lives == -1) {
            this.scene.restart();
        }
        if(this.score == 3) {
            console.log("You win!");
            this.time.delayedCall(1000, () => {
                this.scene.start('levelonesum');
            })
        }
    }
}

class levelOneSummary extends Phaser.Scene{ // FINISH THIS
    constructor() {
        super('levelonesum')
    }
    preload() {

    }
    update() {

    }
}

class levelTwo extends Phaser.Scene{ // FINISH THIS
    constructor() {
        super('leveltwo')
    }
    preload() {
        this.load.path = 'assets/'
        this.load.image('character', 'char.png');
        this.load.image('ground', 'ground.png');
        this.load.image('brick', 'brick.png');
        this.load.image('coin', 'coin.png');


    }
    create() {
        // Set background color
        this.cameras.main.setBackgroundColor('#67BED9');
        // Declaring base variables
        let angle = 0
        this.score = 0
        this.lives = 3

        // Score / Lives texts
        this.livesText = this.add.text(100, 100, 'Lives: ' + this.lives, {fontSize: '32px', color: '#000000'});
        this.scoreText = this.add.text(100, 150, 'Score: ' + this.score, {fontSize: '32px', color: '#000000'});

        // Creating assets / asset groups
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
            .setBounce(.25, .6)
            //.setCollideWorldBounds(true);

        // Function to create blocks: use blocks.create(x, y)
        const blocks = this.physics.add.group({
            defaultKey: 'brick',
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            dragX: 0.5,
            dragY: 0.5,
            useDamping: true
        });

        // Function to create walls: use createWall(x, y, width, height)
        const walls = this.physics.add.staticGroup();
        const createWall = (x, y, width, height, color = 0xffffff) => {
            const wall = this.add.rectangle(x, y, width, height, color)
            this.physics.add.existing(wall, true);
            walls.add(wall);
            return wall;
        };

        // Function to create coins: use createCoin(x, y)
        const coins = this.physics.add.group();
        const createCoin = (x, y) => {
            const coin = coins.create(x, y, 'coin');
            coin.setScale(4);
            coin.setDepth(0);
            coin.body.allowGravity = false;
            return coin;
        }

        let frame1 = createWall(15, 450, 30, 900, 0x000000);
        let frame2 = createWall(1000, 15, 2000, 30, 0x000000)
            .setDepth(1);
        let frame3 = createWall(1905, 450, 30, 900, 0x000000);
        let wall1 = createWall(1000, 500, 75, 400);
        let wall2 = createWall(700, 200, 75, 500);
        let wall3 = createWall(1263, 270, 600, 75);
        let wall4 = createWall(500, 350, 100, 75);
        let coin1 = createCoin(500, 250);
        let coin2 = createCoin(1250, 175);


        // Creating physics collisions
        //this.physics.add.collider(char1P, walls);
        this.physics.add.collider(char1P, ground);
        this.physics.add.collider(ground, blocks);
        this.physics.add.collider(char1P, blocks);
        //this.physics.add.collider(char1P, walls);
        this.physics.add.collider(blocks, walls);
        this.physics.add.collider(char1P, wall1, () => {
            char1P.setVelocityY(-Math.abs(char1P.body.velocity.y) * 1.5);
        });
        this.physics.add.collider(char1P, wall2, () => {
            char1P.setVelocityX(-Math.abs(char1P.body.velocity.x) + 300);
        })
        this.physics.add.overlap(char1P, coins, (char1P, coin) => {
                coin.destroy();
                this.score += 1;
                console.log('score: ', this.score);
                this.scoreText.setText('Score: ' + this.score);
            }
        );
        this.physics.add.collider(char1P, walls);

        // PUT THIS AT BOTTOM
        this.input.on('pointermove', (pointer) => {
            angle = Phaser.Math.Angle.BetweenPoints(char1, pointer);
            char1.rotation = angle;
            Phaser.Geom.Line.SetToAngle(line, char1.x, char1.y, angle, 128);
            graphics.clear().strokeLineShape(line);
        })

        this.input.on('pointerup', () => {
            char1P.enableBody(true, 300, 850, true, true);
            this.physics.velocityFromRotation(angle, 1000, char1P.body.velocity);
            this.lives -= 1;
            this.livesText.setText('Lives: ' + this.lives);
            if (this.lives < 0) {
                this.scene.restart();
            }
        });
    }
    update() {
        if(this.lives == -1) {
            this.scene.restart();
        }
        if(this.score == 2) {
            console.log("You win!");
            this.time.delayedCall(1000, () => {
                this.scene.start('leveltwosum');
            })
        }
    }

}

class levelTwoSummary extends Phaser.Scene{ // FINISH THIS
    constructor() {
        super('leveltwosum')
    }
    preload() {

    }
    update() {

    }
}

class levelThree extends Phaser.Scene {
    constructor() {
        super('levelthree')
    }
    preload() {
        this.load.path = 'assets/'
        this.load.image('character', 'char.png');
        this.load.image('ground', 'ground.png');
        this.load.image('brick', 'brick.png');
        this.load.image('coin', 'coin.png');


    }
    create() {
        // Set background color
        this.cameras.main.setBackgroundColor('#67BED9');
        // Declaring base variables
        let angle = 0
        this.score = 0
        this.lives = 3

        // Score / Lives texts
        this.livesText = this.add.text(100, 100, 'Lives: ' + this.lives, {fontSize: '32px', color: '#000000'});
        this.scoreText = this.add.text(100, 150, 'Score: ' + this.score, {fontSize: '32px', color: '#000000'});

        // Creating assets / asset groups
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
            .setBounce(.25, .6)
            //.setCollideWorldBounds(true);

        // Function to create blocks: use blocks.create(x, y)
        const blocks = this.physics.add.group({
            defaultKey: 'brick',
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            dragX: 0.5,
            dragY: 0.5,
            useDamping: true
        });

        // Function to create walls: use createWall(x, y, width, height)
        const walls = this.physics.add.staticGroup();
        const createWall = (x, y, width, height, color = 0xffffff) => {
            const wall = this.add.rectangle(x, y, width, height, color)
            this.physics.add.existing(wall, true);
            walls.add(wall);
            return wall;
        };

        // Function to create coins: use createCoin(x, y)
        const coins = this.physics.add.group();
        const createCoin = (x, y) => {
            const coin = coins.create(x, y, 'coin');
            coin.setScale(4);
            coin.setDepth(0);
            coin.body.allowGravity = false;
            return coin;
        }

        let wall1 = createWall(1000, 400, 75, 150);
        let wall2 = createWall(350, 450, 300, 75)
        let coin1 = createCoin(350, 350)
        let block1 = blocks.create(350, 350)
            .setScale(8)
            .setMass(2);
        //let wall3 = createWall(1800, 400, 100, 300, 0x000000)
        let coin2 = createCoin(1035, 835);
        let block2 = blocks.create(1035, 835)
            .setScale(8)
            .setMass(2);
        let block3 = blocks.create(1035, 707)
            .setScale(8)
            .setMass(2);    
        let block4 = blocks.create(1035, 579)
            .setScale(8)
            .setMass(2);
        let wall3 = createWall(1400, 500, 75, 400);
        let coin3 = createCoin(1100, 400)

        // Collision between character and objects
        this.physics.add.collider(char1P, ground);
        this.physics.add.collider(ground, blocks);
        this.physics.add.collider(char1P, blocks);
        this.physics.add.collider(blocks);
        this.physics.add.collider(char1P, wall1, () => {
            char1P.setVelocityX(char1P.body.velocity.x * 1.5);
        });
        this.physics.add.collider(char1P, wall3, () => {
            char1P.setVelocityY(-Math.abs(char1P.body.velocity.y) * 2);
        });
        this.physics.add.collider(char1P, walls);
        this.physics.add.collider(blocks, walls);
        this.physics.add.overlap(char1P, coins, (char1P, coin) => {
                coin.destroy();
                this.score += 1;
                console.log('score: ', this.score);
                this.scoreText.setText('Score: ' + this.score);
            }
        );

        // PUT THIS AT BOTTOM
        this.input.on('pointermove', (pointer) => {
            angle = Phaser.Math.Angle.BetweenPoints(char1, pointer);
            char1.rotation = angle;
            Phaser.Geom.Line.SetToAngle(line, char1.x, char1.y, angle, 128);
            graphics.clear().strokeLineShape(line);
        })

        this.input.on('pointerup', () => {
            char1P.enableBody(true, 300, 850, true, true);
            this.physics.velocityFromRotation(angle, 1000, char1P.body.velocity);
            this.lives -= 1;
            this.livesText.setText('Lives: ' + this.lives);
            if (this.lives < 0) {
                this.scene.restart();
            }
        });
    }
    update() {
        if(this.lives == -1) {
            this.scene.restart();
        }
        if(this.score == 3) {
            console.log("You win!");
            this.time.delayedCall(1000, () => {
                this.scene.start('levelthreesum');
            })
        }
    }
}

class levelThreeSummary extends Phaser.Scene { // FINISH THIS TOO
    constructor() {
        super('levelthreesum')
    }
    preload() {

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
            gravity: { y: 300 },
            debug: true
        },
    },
    //scene: [levelOne, levelOneSummary, levelTwo, levelTwoSummary, levelThree, levelThreeSummary],
    scene: [levelOne, levelTwo, levelThree],
    title: "Angry Viscous",
});