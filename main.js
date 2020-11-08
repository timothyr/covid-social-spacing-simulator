(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\dev\covid-social-spacing-simulator\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "EVan":
/*!**************************!*\
  !*** ./src/game/game.ts ***!
  \**************************/
/*! exports provided: setup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "IqKQ");

function setup(app, viewport) {
    const varus_container = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Container"]();
    app.stage.addChild(varus_container);
    const enemies = [];
    const playerCurrentPos = {
        rotation: 0,
        x: app.screen.width / 2,
        y: app.screen.height / 2
    };
    const playerTargetPos = {
        rotation: 0,
        x: app.screen.width / 2,
        y: app.screen.height / 2
    };
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
                    gameRunning = false;
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
            addEnemy(enemies, app, varus_container);
        }
    }, 1000);
    app.renderer.plugins.interaction.on('mouseup', (event) => onClick(event, playerCurrentPos, player, playerTargetPos, app));
}
function addEnemy(enemies, app, varus_container) {
    const newEnemy = createEnemy(app, varus_container);
    enemies.push(newEnemy);
    console.log("we spawn", enemies.length);
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
    const container = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Container"]();
    app.stage.addChild(container);
    // Create a new texture
    const texture = pixi_js__WEBPACK_IMPORTED_MODULE_0__["Texture"].from('assets/mink.png');
    // Create mink
    const bunny = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Sprite"](texture);
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
    const textur = pixi_js__WEBPACK_IMPORTED_MODULE_0__["Texture"].from('assets/Covid.png');
    // Create mink
    const enemyx = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Sprite"](textur);
    enemyx.anchor.set(0.5);
    enemyx.width = 60;
    enemyx.height = 40;
    ;
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
    playerTargetPos.rotation = theta + 2; //(theta * 180 / Math.PI) % 360;
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
        && bounds1.y < bounds2.y + 50 // + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}
function gameOver(app) {
    const end = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Graphics"]();
    end.beginFill(0x000000, 0.03);
    end.drawRect(0, 0, 1200, 800);
    end.endFill();
    app.stage.addChild(end);
    var style = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["TextStyle"]({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'],
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
    var gameoverstyle = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["TextStyle"]({
        fontFamily: 'Arial',
        fontSize: 72,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#ffff99'],
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
    var diestyle = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["TextStyle"]({
        fontFamily: 'Arial',
        fontSize: 72,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ff0000', '#ff0000'],
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
    var retrystyle = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["TextStyle"]({
        fontFamily: 'Arial',
        fontSize: 52,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#00ffff', '#00ff00'],
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
    const gameovertext = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Text"](`Game Over.`, gameoverstyle);
    gameovertext.x = 50;
    gameovertext.y = 50;
    app.stage.addChild(gameovertext);
    var richText = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Text"]('17 million Minks in Denmark will be killed due to the virus outbreak.', style);
    richText.x = 50;
    richText.y = 200;
    var nicetxt = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Text"]('You let one die.', diestyle);
    nicetxt.x = 50;
    nicetxt.y = 350;
    app.stage.addChild(nicetxt);
    var retrytext = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Text"]('Refresh your browser to save the next one.', retrystyle);
    retrytext.x = 50;
    retrytext.y = 500;
    app.stage.addChild(retrytext);
    app.stage.addChild(richText);
    return end;
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _game_init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game/init */ "iEj0");



const _c0 = ["gamec"];
class AppComponent {
    constructor() {
        this.title = 'covid-social-spacing-simulator';
    }
    ngAfterViewInit() {
        // console.log(this.game.nativeElement);
        _game_init__WEBPACK_IMPORTED_MODULE_1__["initGame"](null);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c0, true, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.game = _t.first);
    } }, decls: 1, vars: 0, consts: [["id", "floorplanner", 1, "pixi"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, { game: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ["gamec", { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], static: true }]
        }] }); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");





class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "iEj0":
/*!**************************!*\
  !*** ./src/game/init.ts ***!
  \**************************/
/*! exports provided: initGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initGame", function() { return initGame; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "IqKQ");
/* harmony import */ var pixi_viewport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pixi-viewport */ "ssMx");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "EVan");



const WIDTH = 1200;
const HEIGHT = 800;
function initGame(gameElement) {
    const app = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Application"]({ backgroundColor: 0x2d21f3 });
    // document.body.appendChild(app.view)
    document.getElementById("floorplanner").appendChild(app.view);
    // create viewport
    const viewport = new pixi_viewport__WEBPACK_IMPORTED_MODULE_1__["Viewport"]({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: 1000,
        worldHeight: 1000,
        interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });
    // add the viewport to the stage
    app.stage.addChild(viewport);
    // activate plugins
    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate();
    // ************************** START OF PIXI ********************** //
    // ************************** START OF PIXI ********************** //
    // ************************** START OF PIXI ********************** //
    _game__WEBPACK_IMPORTED_MODULE_2__["setup"](app, viewport);
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
function resize(app) {
    return function () {
        const vpw = window.innerWidth; // Width of the viewport
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
        }
        else {
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


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map