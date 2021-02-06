import {fontStyle, penColors} from '/js/settings.js';
let Graphics    = PIXI.Graphics;
let Application = PIXI.Application;
let loader      = PIXI.loader;
let Sprite      = PIXI.Sprite;
let resources   = PIXI.loader.resources;
let Text        = PIXI.Text;

let appSetting = {
    width: 500,
    height: 500,
    rectWidth: 32,
    rectHeight: 32,
    scale: 1,
};

let targetColor = penColors.red;

const app = new Application({
    width: appSetting.width,
    height: appSetting.height,
    backgroundColor: 0xffffff,
    antialias: true,
});

// Рамка для canvsa на странице
app.renderer.view.style.border = "1px solid black";
document.querySelector(".app").appendChild(app.view);
loader.add("images/background.png").load(setup);

let isRemoved = false;
let back;
const rectangles = [];
const digist = [];

getColor();
removeColor();

function setup() {
    back = new Sprite(resources["images/background.png"].texture);
    back.width = appSetting.width;
    back.height = appSetting.height;
    app.stage.addChild(back);
    // app.stage.interactive = true;
    document.addEventListener("mousewheel", zoom);
    drawRect();
    console.log(rectangles.filter(i=>i.geometry.id == 26));
    app.renderer.render(app.stage);
}

function cube(x, y) {
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

function label(x, y) {
    const namText = new Text(Math.floor(Math.random(-1, 2) * 10), fontStyle);
    namText.x = y;
    namText.y = x;
    return namText;
}

function drawRect() {
    for (let x = 0; x < appSetting.height; x += appSetting.rectHeight) {
        for (let y = 0; y < appSetting.width; y += appSetting.rectWidth) {
            let rect = cube(x, y);
            rect.on("pointerdown", onButtonDown);
            let numText = label(x, y);

            back.addChild(rect);
            back.addChild(numText);

            rectangles.push(rect);
            digist.push(numText);
        }
    }
}

function onButtonDown(e) {
    let a = digist.filter((i) => (i.x == this.x) & (i.y == this.y));
    if (isRemoved) {
        isRemoved = false;
        this.isdown = false;
        this._tint = penColors.cyan;
        back.addChild(this);
        back.addChild(a[0]);
        return 0;
    }
    //костыль
    if (a[0].text == "0" && targetColor == penColors.red) {
        this._tint = targetColor;
        this.isdown = true;
        back.addChild(this);
    } else if (a[0].text == "1" && targetColor == penColors.orange) {
        this._tint = targetColor;
        this.isdown = true;
        back.addChild(this);
    } else if (a[0].text == "2" && targetColor == penColors.yellow) {
        this._tint = targetColor;
        this.isdown = true;
        back.addChild(this);
    } else if (a[0].text == "3" && targetColor == penColors.green) {
        this._tint = targetColor;
        this.isdown = true;
        back.addChild(this);
    } else if (a[0].text == "4" && targetColor == penColors.cyan) {
        this._tint = targetColor;
        this.isdown = true;
        back.addChild(this);
    } else if (a[0].text == "5" && targetColor == penColors.blue) {
        this._tint = targetColor;
        this.isdown = true;
        back.addChild(this);
    } else if (a[0].text == "6" && targetColor == penColors.purple) {
        this._tint = targetColor;
        this.isdown = true;
        back.addChild(this);
    } else if (a[0].text == "7" && targetColor == penColors.darkOrchid) {
        this._tint = targetColor;
        this.isdown = true;
        back.addChild(this);
    } else if (a[0].text == "8" && targetColor == penColors.chocolate) {
        this._tint = targetColor;
        this.isdown = true;
        back.addChild(this);
    } else if (a[0].text == "9" && targetColor == penColors.tomato) {
        this._tint = targetColor;
        this.isdown = true;
        back.addChild(this);
    } else {
        let ev = this;
        cross(ev);
    }
}

function cross(ev) {
    let line1 = new Graphics();
    line1.lineStyle(5, 0xffffff, 1);
    line1.moveTo(0, 0);
    line1.lineTo(30, 30);
    line1.x = ev.x;
    line1.y = ev.y;
    back.addChild(line1);
    let line2 = new Graphics();
    line2.lineStyle(5, 0xffffff, 1);
    line2.moveTo(30, 0);
    line2.lineTo(0, 30);
    line2.x = ev.x;
    line2.y = ev.y;
    back.addChild(line2);
}

function zoom(e) {
    appSetting.scale += e.deltaY / 10000;
    appSetting.width += e.deltaY / 10;
    back.transform.position.x = e.layerX - appSetting.width / 2;
    back.transform.position.y = e.layerY - appSetting.height / 2;

    back.scale.x = appSetting.scale;
    back.scale.y = appSetting.scale;
}

function getColor() {
    let doc = document.querySelectorAll(".buttons");
    doc.forEach(function (item) {
        item.addEventListener("click", function (e) {
            targetColor = penColors[e.target.value];
            console.log(targetColor);
        });
    });
}

function removeColor() {
    let doc = document.querySelector(".remove");
    doc.addEventListener("click", function () {
        isRemoved = true;
        console.log(doc.value);
    });
}
