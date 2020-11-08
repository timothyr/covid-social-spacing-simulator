import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';

export function setup(app: PIXI.Application, viewport: Viewport) {

    const varus_container = new PIXI.Container();
    app.stage.addChild(varus_container);


    const enemies = [];

    const playerCurrentPos = {
        rotation: 0,
        x: app.screen.width / 2,
        y: app.screen.height / 2
    }

    const playerTargetPos = {
        rotation: 0,
        x: app.screen.width / 2,
        y: app.screen.height / 2
    }

    const player = createPlayer(app);

    let gameRunning = true;

    const maxGameOverLoops = 50;
    let gameOverLoops = 0;

    // Game loop
    app.ticker.add((delta) => {
        if (gameRunning) {
            updatePlayerPos(player, playerCurrentPos, playerTargetPos, delta);

            enemies.forEach((enemy, i) => {
                // console.log("updte", i);
                updateEnemyPos(enemy, playerCurrentPos, delta, i);
                if (collisiontest(enemy, player.bunny)) {
                    gameRunning = false
                }
            });
        }
        else {
            gameOverLoops += 1;
            if (gameOverLoops <= maxGameOverLoops) {
                gameOver(app);

            }

        }
    });

    setInterval(() => {
        if (gameRunning) {
            addEnemy(enemies, app, varus_container)
        }
    }, 1000);


    app.renderer.plugins.interaction.on('mouseup', (event) => onClick(event, playerCurrentPos, player, playerTargetPos, app));
}

function addEnemy(enemies, app, varus_container) {
    const newEnemy = createEnemy(app, varus_container);
    enemies.push(newEnemy);
    console.log("we spawn", enemies.length)
}

function updateEnemyPos(enemy, playerCurrentPos, delta, i) {
    const angle = Math.atan2(playerCurrentPos.y - enemy.y, playerCurrentPos.x - enemy.x);
    const perFrameDistance = 1;

    const sin = Math.sin(angle) * perFrameDistance * delta;
    const cos = Math.cos(angle) * perFrameDistance * delta;

    // enemy.x = (Math.random() * 100) + (i * 100);

    enemy.x += cos;
    enemy.y += sin;
}

function updatePlayerPos(player, playerCurrentPos, playerTargetPos, delta) {
    if (playerCurrentPos.x != playerTargetPos.x || playerCurrentPos.y != playerTargetPos.y) {
        const angle = Math.atan2(playerTargetPos.y - playerCurrentPos.y, playerTargetPos.x - playerCurrentPos.x);
        const perFrameDistance = 5;

        const sin = Math.sin(angle) * perFrameDistance * delta;
        const cos = Math.cos(angle) * perFrameDistance * delta;

        if (Math.abs(playerCurrentPos.x - playerTargetPos.x) > perFrameDistance) {
            playerCurrentPos.x += cos;
            playerCurrentPos.x = Math.round(playerCurrentPos.x);
        }

        if (Math.abs(playerCurrentPos.y - playerTargetPos.y) > perFrameDistance) {
            playerCurrentPos.y += sin;
            playerCurrentPos.y = Math.round(playerCurrentPos.y);
        }
        player.container.position.x = playerCurrentPos.x;
        // console.log(playerCurrentPos.y, playerTargetPos.y)
        player.container.position.y = playerCurrentPos.y;
    }

    playerCurrentPos.rotation = lerp(playerCurrentPos.rotation, playerTargetPos.rotation, 0.1);
    player.bunny.rotation = playerCurrentPos.rotation;
}

function createPlayer(app) {
    const container = new PIXI.Container();

    app.stage.addChild(container);

    // Create a new texture
    const texture = PIXI.Texture.from('/assets/mink.png');

    // Create mink
    const bunny = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5);
    //width
    bunny.x = container.width / 2;
    //height
    bunny.y = container.height / 2;

    bunny.width = bunny.width * 50;
    bunny.height = bunny.height * 130;



    container.addChild(bunny);

    // Move container to the center
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;

    // Center bunny sprite in local container coordinates
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;

    return { container, bunny };
}

function createEnemy(app, varus_container) {


    // Create a new texture
    const textur = PIXI.Texture.from('/assets/Covid.png');

    // Create mink
    const enemyx = new PIXI.Sprite(textur);
    enemyx.anchor.set(0.5);

    enemyx.width = 60;
    enemyx.height = 40;;

    enemyx.x = (Math.random() * 2000) - 1000;
    enemyx.y = (Math.random() * 2000) - 1000;

    //width
    // enemy.x = varus_container.width / 2;
    // //height
    // enemy.y = varus_container.height / 2;

    const good = varus_container.addChild(enemyx);

    // // Move container to the center
    // varus_container.x = app.screen.width / 2 + (Math.random() * 50);
    // varus_container.y = app.screen.height / 2 + (Math.random() * 50);

    // // Center bunny sprite in local container coordinates
    // varus_container.pivot.x = varus_container.width / 2;
    // varus_container.pivot.y = varus_container.height / 2;

    return good;
}

function onClick(event, playerCurrentPos, player, playerTargetPos, app) {
    console.log(app.screen);
    playerTargetPos.x = Math.round(event.data.global.x) - (app.screen.width / 8);
    playerTargetPos.y = Math.round(event.data.global.y) - (app.screen.height / 8);
    // Get target angle
    const dy = playerTargetPos.y - playerCurrentPos.y;
    const dx = playerTargetPos.x - playerCurrentPos.x;
    const theta = Math.atan2(dy, dx);
    playerTargetPos.rotation = theta + 2;//(theta * 180 / Math.PI) % 360;
    console.log(playerCurrentPos.rotation);
}

function lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    // const offset = a
    return value1 + (value2 - value1) * amount;
}

function collisiontest(enemy, player) {
    const bounds1 = enemy.getBounds();
    const bounds2 = player.getBounds();

    return bounds1.x < bounds2.x + 50 // + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + 50// + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}

function gameOver(app) {
    const end = new PIXI.Graphics();

    end.beginFill(0x000000, 0.03);
    end.drawRect(0, 0, 1200, 800);
    end.endFill();
    app.stage.addChild(end);



    var style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 700
    });

    var gameoverstyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 72,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#ffff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 700
    });
    var diestyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 72,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ff0000', '#ff0000'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 700
    });

    var retrystyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 52,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#00ffff', '#00ff00'], // gradient
        stroke: '#4a1850',
        strokeThickness: 10,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 700
    });


    const gameovertext = new PIXI.Text(`Game Over.`, gameoverstyle);
    gameovertext.x = 50;
    gameovertext.y = 50;
    app.stage.addChild(gameovertext);

    var richText = new PIXI.Text('17 million Minks in Denmark will be killed due to the virus outbreak.', style);
    richText.x = 50;
    richText.y = 200;

    var nicetxt = new PIXI.Text('You let one die.', diestyle);
    nicetxt.x = 50;
    nicetxt.y = 350;

    app.stage.addChild(nicetxt);

    var retrytext = new PIXI.Text('Refresh your browser to save the next one.', retrystyle);
    retrytext.x = 50;
    retrytext.y = 500;
    app.stage.addChild(retrytext);


    app.stage.addChild(richText);

    return end;
}