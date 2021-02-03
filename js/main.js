let Graphics = PIXI.Graphics;
let Application = PIXI.Application;
let loader = PIXI.loader;
let Sprite = PIXI.Sprite;
let resources = PIXI.loader.resources;
let RenderTexture = PIXI.RenderTexture;

let penColor = 0xffff00;

let appSetting = {
    width: 800,
    height: 500,
    rectWidth: 10,
    rectHeight: 10,
    scale: 0.3,
};

const app = new Application({
    width: appSetting.width,
    height: appSetting.height,
    backgroundColor: 0xffffff,
});

document.querySelector(".app").appendChild(app.view);
loader.add("images/kot.jpg").load(setup);

let sprites = {};
let cat;

function setup() {
    sprites.cat = new Sprite(resources["images/kot.jpg"].texture);

    sprites.cat.width = appSetting.width;
    sprites.cat.height = appSetting.height;

    app.stage.addChild(sprites.cat);

    app.stage.interactive = true;
    document.addEventListener("mousewheel", mouseWheelHandler);
    app.stage.on("mousedown", drawRectangle);

    app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta) {
    sprites.cat.scale.x = appSetting.scale;
    sprites.cat.scale.y = appSetting.scale;
}

function drawRectangle(e) {
    let rect = new Graphics();
    let posMouse = e.data.global;

    rect.beginFill(penColor);
    rect.drawRect(0, 0, appSetting.rectWidth, appSetting.rectHeight);
    rect.endFill();

    rect.x = posMouse.x - Math.round(appSetting.rectWidth / 2);
    rect.y = posMouse.y - Math.round(appSetting.rectHeight / 2);
    
    app.stage.addChild(rect);
}

function getPenSize() {
    let x = document.getElementById("penSizeX");
    let y = document.getElementById("penSizeY");
    appSetting.rectHeight = y.value;
    appSetting.rectWidth = x.value;
}

function saveImage() {
    console.log("Save Image");
}

function openImage() {
    console.log("Open Image");
}
///
function drawLine() {
    for (let i = 0; i < appSetting.height; i += appSetting.rectWH) {
        drawLineH(i, 0);
        drawLineW(0, i);
    }
}

function drawLineH(i, j) {
    let line = new Graphics();
    line.lineStyle(1, 0xff0000, 1);
    line.moveTo(0, 0);
    line.lineTo(0, appSetting.height);
    line.x = i;
    line.y = j;
    app.stage.addChild(line);
}

function drawLineW(i, j) {
    let line = new Graphics();
    line.lineStyle(1, 0xff0000, 1);
    line.moveTo(0, 0);
    line.lineTo(appSetting.width, 0);
    line.x = i;
    line.y = j;
    app.stage.addChild(line);
}
////
function mouseWheelHandler(e) {
    appSetting.scale += e.deltaY / 10000;
    appSetting.width += e.deltaY / 10;
}

function getColor(form) {
    let doc = document.getElementById("#formColor");
    penColor = doc.value.replace("#", "0x");
}
