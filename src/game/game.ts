import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';

export function setup(app: PIXI.Application, viewport: Viewport) {

	const pos = {
		x: app.screen.width / 2,
		y: app.screen.height / 2
	}

	const target = {
		x: app.screen.width / 2,
		y: app.screen.height / 2
	}


    const container = new PIXI.Container();
    
    app.stage.addChild(container);
    
    // Create a new texture
    const texture = PIXI.Texture.from('/assets/mink.jpg');
    
    // Create a 5x5 grid of bunnies
    for (let i = 0; i < 1; i++) {
        const bunny = new PIXI.Sprite(texture);
        bunny.anchor.set(1);
        //width
        bunny.x = container.width / 2;
        //height
        bunny.y = container.height / 2;
        container.addChild(bunny);
    }
    
    // Move container to the center
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    
    // Center bunny sprite in local container coordinates
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
    
    // Listen for animate update
    app.ticker.add((delta) => {
    	pos.x = lerp(pos.x, target.x, delta * 0.01)
    	pos.y = lerp(pos.y, target.y, delta * 0.01)

		container.position.x = pos.x;
		console.log(delta)
		container.position.y = pos.y;
        // rotate the container!
        // use delta to create frame-independent transform
        // container.rotation -= 0.01 * delta;
    });

// const redSquare = new PIXI.Sprite(PIXI.Texture.from('/assets/mink.png'));
// 	redSquare.position.set(0, 0);
// 	redSquare.width = redSquare.width / 2;
// 	redSquare.height = redSquare.height / 2;

app.renderer.plugins.interaction.on('mouseup', (event) => onClick(event, container, app, target));


}

function lerp (value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    // const offset = a
    return value1 + (value2 - value1) * amount;
}

function onClick (event, container, app, target) {
	target.x = event.data.global.x;
    target.y = event.data.global.y;
}
