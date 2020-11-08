import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';

export function setup(app: PIXI.Application, viewport: Viewport) {

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

    // Game loop
    app.ticker.add((delta) => {
        updatePlayerPos(player, playerCurrentPos, playerTargetPos, delta);
    });

    app.renderer.plugins.interaction.on('mouseup', (event) => onClick(event, playerCurrentPos, app, playerTargetPos));
}

function updatePlayerPos(player, playerCurrentPos, playerTargetPos, delta) {
    if (playerCurrentPos.x != playerTargetPos.x || playerCurrentPos.y != playerTargetPos.y) {
        const angle = Math.atan2(playerTargetPos.y - playerCurrentPos.y, playerTargetPos.x - playerCurrentPos.x);
        const perFrameDistance = 10;

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
        player.position.x = playerCurrentPos.x;
        // console.log(playerCurrentPos.y, playerTargetPos.y)
        player.position.y = playerCurrentPos.y;
    }

    playerCurrentPos.rotation = lerp(playerCurrentPos.rotation, playerTargetPos.rotation, 0.1);
    console.log("lerp", playerCurrentPos.rotation);
    player.rotation = playerCurrentPos.rotation;
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
    container.addChild(bunny);
    
    // Move container to the center
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    
    // Center bunny sprite in local container coordinates
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
    
    return container;
}

function onClick (event, player, app, target) {
	target.x = Math.round(event.data.global.x);
    target.y = Math.round(event.data.global.y);
    // Get target angle
    const dy = target.y - player.y;
    const dx = target.x - player.x;
    const theta = Math.atan2(dy, dx);
    target.rotation = theta + 2;//(theta * 180 / Math.PI) % 360;
    console.log(player.rotation);
}

function lerp (value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    // const offset = a
    return value1 + (value2 - value1) * amount;
}