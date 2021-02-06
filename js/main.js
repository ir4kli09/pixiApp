let Graphics = PIXI.Graphics;
let Application = PIXI.Application;
let loader = PIXI.loader;
let Sprite = PIXI.Sprite;
let resources = PIXI.loader.resources;
let RenderTexture = PIXI.RenderTexture;
let Text = PIXI.Text;
let TextStyle = PIXI.TextStyle;
let autoDetectRenderer = PIXI.autoDetectRenderer;

let appSetting = {
    width: 500,
    height: 500,
    rectWidth: 32,
    rectHeight: 32,
    scale: 1,
    rotation: 0,
};
const fonyStyle = new TextStyle({
    fontFamily: "Verdana",
    fontSize: 13,
    fill: ["#ffffff"], // gradient , "#00ff99"
    stroke: "#4a1850",
    strokeThickness: 5,
    lineJoin: "round",
});

let penColors = {
    red: 0xfe0008, // красный
    orange: 0xffa500, // оранжевый
    yellow: 0xffff00, // жёлтый
    green: 0x00ff00, // зелёный
    cyan: 0x00ffff, // "голубой"
    blue: 0x0000ff, // синий
    purple: 0xa020f0, // фиолетовый
};
// 16646152 // красный
// 16753920 // оранжевый
// 16776960 // жёлтый
// 65280    // зелёный
// 65535    // "голубой"
// 255      // синий
// 10494192 // фиолетовый
let targetColor = penColors.blue;
console.log(penColors.cyan);
const app = new Application({
    width: appSetting.width,
    height: appSetting.height,
    backgroundColor: 0xffffff,
});

let zoomPosition = {
    x: 0,
    y: 0
}
// Рамка для canvsa на странице
app.renderer.view.style.border = "1px solid black";

document.querySelector(".app").appendChild(app.view);
loader.add("images/background.png").load(setup);
let back;
const rectangles = [];
const digist = [];

function setup() {
    back = new Sprite(resources["images/background.png"].texture);

    back.width = appSetting.width;
    back.height = appSetting.height;
    app.stage.addChild(back);
    // app.stage.interactive = true;
    // Событие прокрутки колеса мыши
    document.addEventListener("mousewheel", mouseWheelHandler);
    drawRect();

    app.ticker.add((delta) => gameLoop(delta));



}

function gameLoop(delta) {
    back.position.x = zoomPosition.x;
    back.position.y = zoomPosition.y;
 
    back.scale.x = appSetting.scale;
    back.scale.y = appSetting.scale;
}

function cube(x,y){
    const rect = new Graphics();
    rect.beginFill(penColors.cyan);
    rect.lineStyle(1, penColors.red, 1);
    rect.drawRect(0, 0, appSetting.rectWidth, appSetting.rectHeight);
    rect.endFill();
    rect.x = y;
    rect.y = x;
    rect.interactive = true;
    rect.buttonMode = true;
    return rect;
}

function label(x,y){
    const namText = new Text(
        Math.floor(Math.random(-1, 2) * 10),
        fonyStyle
    );
    namText.x = y;
    namText.y = x;
    // richText.interactive = true;
    // richText.buttonMode = true;
    // richText.width = appSetting.rectWidth;
    // richText.height = appSetting.rectHeight;
    return namText;
}

function drawRect() {
    for (let x = 0; x < appSetting.height; x += appSetting.rectHeight) {
        for (let y = 0; y < appSetting.width; y += appSetting.rectWidth) {
            let rect = cube(x,y);
            rect.on("pointerdown", onButtonDown);
            let numText = label(x,y);
            // richText.on("pointerdown", onButtonDownText);
            
            back.addChild(rect);
            back.addChild(numText);

            rectangles.push(rect);
            digist.push(numText);
        }
    }
}

function onButtonDown(e) {
    if (this.isdown) {
        return;
    }
    this.isdown = true;
    let a = digist.filter((i) => (i.x == this.x) & (i.y == this.y));
    console.log(a[0].text);
    if(a[0].text == 6 & this.isdown){
        this._tint = targetColor;
        console.log(this._tint);
        back.addChild(this);
    }else{
        this._tint = 0xfffff;
        console.log(this._tint);
        back.addChild(this);
    }

}

function onButtonDownText() {
    console.log(this.text);
}

//Zooming
function mouseWheelHandler(e) {
    zoomPosition.x = e.layerX;
    zoomPosition.y = e.layerY;

    appSetting.scale += e.deltaY / 10000;
    appSetting.width += e.deltaY / 100;
}

function getColor(e) {
    let doc = document.querySelectorAll(".buttons");
    doc.forEach(function(item){
        item.addEventListener('click', function(e){
            // e.preventDefault();
            targetColor = penColors[e.target.value];
            console.log(targetColor)
        })
    });
}
getColor();


// function drawRectangle(e) {
//     let rect = new Graphics();
//     let posMouse = e.data.global;

//     rect.beginFill(targetColor);
//     rect.drawRect(0, 0, appSetting.rectWidth, appSetting.rectHeight);
//     rect.endFill();

//     posMouse.x /= appSetting.scale;
//     posMouse.y /= appSetting.scale;

//     rect.x = posMouse.x - Math.round(appSetting.rectWidth / 2);
//     rect.y = posMouse.y - Math.round(appSetting.rectHeight / 2);

//     back.addChild(rect);
//     // app.stage.addChild(rect);
// }
