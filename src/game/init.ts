import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import * as game from './game';

const WIDTH = 800;
const HEIGHT = 800;

export function initGame(gameElement: HTMLElement) {


    const app = new PIXI.Application()
    // document.body.appendChild(app.view)

    document.getElementById("floorplanner").appendChild(app.view);

    // create viewport
    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: 1000,
        worldHeight: 1000,

        interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })

    // add the viewport to the stage
    app.stage.addChild(viewport)

    // activate plugins
    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate()

    // ************************** START OF PIXI ********************** //
    // ************************** START OF PIXI ********************** //
    // ************************** START OF PIXI ********************** //

    game.setup(app, viewport);

    // ************************** END OF PIXI ********************** //
    // ************************** END OF PIXI ********************** //
    // ************************** END OF PIXI ********************** //


    // Perform initial resizing
    resize(app)();
    // Add event listener so that our resize function runs every time the
    // browser window is resized.
    window.addEventListener("resize", () => resize(app));
}






// Consider that WIDTH and HEIGHT are defined as the width and height of your unresized game in pixels.

/**
 * @param {PIXI.Application} app
 * @returns {Function}
 */
function resize(app): Function {
    return function () {
        const vpw = window.innerWidth;  // Width of the viewport
        const vph = window.innerHeight; // Height of the viewport
        let nvw; // New game width
        let nvh; // New game height

        // The aspect ratio is the ratio of the screen's sizes in different dimensions.
        // The height-to-width aspect ratio of the game is HEIGHT / WIDTH.

        if (vph / vpw < HEIGHT / WIDTH) {
            // If height-to-width ratio of the viewport is less than the height-to-width ratio
            // of the game, then the height will be equal to the height of the viewport, and
            // the width will be scaled.
            nvh = vph;
            nvw = (nvh * WIDTH) / HEIGHT;
        } else {
            // In the else case, the opposite is happening.
            nvw = vpw;
            nvh = (nvw * HEIGHT) / WIDTH;
        }

        // Set the game screen size to the new values.
        // This command only makes the screen bigger --- it does not scale the contents of the game.
        // There will be a lot of extra room --- or missing room --- if we don't scale the stage.
        app.renderer.resize(nvw, nvh);

        // This command scales the stage to fit the new size of the game.
        app.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);
    };
}


