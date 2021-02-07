import { fontStyle, penColors, appSetting, Rects, Numbers } from "/js/settings.js";
let Graphics = PIXI.Graphics;
let Application = PIXI.Application;
let loader = PIXI.loader;
let Sprite = PIXI.Sprite;
let resources = PIXI.loader.resources;
let Text = PIXI.Text;

const app = new Application({
    width: appSetting.width,
    height: appSetting.height,
    backgroundColor: appSetting.backColor,
    antialias: true,
});

app.renderer.view.style.border = "1px solid black";
document.querySelector(".app").appendChild(app.view);
loader.add("images/background.png").load(setup);

let isRemoved = false;
let back;
let rectangles = [];
let digits = [];

getColor();
removeColor();
savePos();

function setup() {
    back = new Sprite(resources["images/background.png"].texture);
    back.width = appSetting.width;
    back.height = appSetting.height;
    app.stage.addChild(back);
    document.addEventListener("mousewheel", zoom);
    drawRect();
    app.renderer.render(app.stage);
}
//квадраты
function cube(x, y) {
    const rect = new Graphics();
    rect.beginFill(0xffffff);
    rect.lineStyle(1, penColors.red, 1);
    rect.drawRect(0, 0, appSetting.rectWidth, appSetting.rectHeight);
    rect.endFill();
    rect.x = y;
    rect.y = x;
    rect.interactive = true;
    rect.buttonMode = true;
    return rect;
}
//цыфры на квадратах
function label(x, y) {
    const namText = new Text(Math.floor(Math.random(-1, 2) * 10), fontStyle);
    namText.x = y;
    namText.y = x;
    return namText;
}
//заполняем экран квадратами с рандомными цыфрами
function drawRect() {
    for (let x = 0; x < appSetting.height; x += appSetting.rectHeight) {
        for (let y = 0; y < appSetting.width; y += appSetting.rectWidth) {
            let rect = cube(x, y);
            rect.on("click", onButtonClick);
            let numText = label(x, y);

            back.addChild(rect);
            back.addChild(numText);

            rectangles.push(rect);
            digits.push(numText);
        }
    }
}
//событие нажатия на квадрат
function onButtonClick(e) {
    let num = digits.filter((i) => (i.x == this.x) & (i.y == this.y));
    if (isRemoved) {
        removed(this, num);
        return 0;
    }
    //костыль 
    let txtBtn = num[0].text;
    if (isTrue(txtBtn, "0", this.isdown, penColors.red)) {
        print(this);
    } else if (isTrue(txtBtn, "1", this.isdown, penColors.orange)) {
        print(this);
    } else if (isTrue(txtBtn, "2", this.isdown, penColors.yellow)) {
        print(this);
    } else if (isTrue(txtBtn, "3", this.isdown, penColors.green)) {
        print(this);
    } else if (isTrue(txtBtn, "4", this.isdown, penColors.cyan)) {
        print(this);
    } else if (isTrue(txtBtn, "5", this.isdown, penColors.blue)) {
        print(this);
    } else if (isTrue(txtBtn, "6", this.isdown, penColors.purple)) {
        print(this);
    } else if (isTrue(txtBtn, "7", this.isdown, penColors.darkOrchid)) {
        print(this);
    } else if (isTrue(txtBtn, "8", this.isdown, penColors.chocolate)) {
        print(this);
    } else if (isTrue(txtBtn, "9", this.isdown, penColors.tomato)) {
        print(this);
    } else {
        cross(this);
    }
}
//проверка совпадения цвета и номера
function isTrue(txtBtn, text, down, color) {
    if ((txtBtn == text) & !down & (appSetting.targetColor == color)) {
        return true;
    } else {
        return false;
    }
}
//удаление цвета и креста TODO: удалять line1,line2, а не закрашивать
function removed(e, num) {
    isRemoved = false;
    e.isdown = false;
    e._tint = appSetting.backColor;
    back.addChild(e);
    back.addChild(num[0]);
    // back.removeChild(e);   
}
//если цвет и число совпадает закращиваем
function print(e) {
    e.tint = appSetting.targetColor;
    e.isdown = true;
    back.addChild(e);
}
//если цвет и число не совпадает рисуем крест
function cross(ev) {
    let lineBold = 3;
    let line1 = new Graphics();
    line1.lineStyle(lineBold, appSetting.crossColor, 1);
    line1.moveTo(7, 7);
    line1.lineTo(25, 25);
    line1.x = ev.x;
    line1.y = ev.y;
    let line2 = new Graphics();
    line2.lineStyle(lineBold, appSetting.crossColor, 1);
    line2.moveTo(7, 25);
    line2.lineTo(25, 7);
    line2.x = ev.x;
    line2.y = ev.y;
    back.addChild(line1,line2);
    ev.isdown = true;
}
//увеличение по прокретке колёсика мыши
function zoom(e) {
    appSetting.scale += e.deltaY / 10000;
    // appSetting.width += e.deltaY / 10;
    // back.transform.position.x = e.layerX - appSetting.width / 2;
    // back.transform.position.y = e.layerY - appSetting.height / 2;

    back.scale.x = appSetting.scale;
    back.scale.y = appSetting.scale;
}
//получаем цвет со страницы при нажатии кнопок
function getColor() {
    let doc = document.querySelectorAll(".buttons");
    doc.forEach(function (item) {
        item.addEventListener("click", function (e) {
            appSetting.targetColor = penColors[e.target.value];
        });
    });
}
//кнопка для удаления креста или цвета
function removeColor() {
    let doc = document.querySelector(".remove");
    doc.addEventListener("click", function () {
        isRemoved = true;
    });
}

function savePos(){
    let doc = document.querySelector('.savePos');
    doc.addEventListener('click', function(){
        seveCubePosition();
        seveNumbersPosition();
    });
}

let arrayRects = [];
function seveCubePosition(){
    //key - индекс в массиве
    for(let key in rectangles){
        let saveRect = new Rects();
        saveRect.id = key;
        saveRect.color = rectangles[key]["tint"];
        saveRect.coord.x = rectangles[key]["x"];
        saveRect.coord.y = rectangles[key]["y"];
        arrayRects.push(saveRect);
    }
    let json = JSON.stringify(arrayRects);
}

let arrayNumbs = [];
function seveNumbersPosition(){
    //key - индекс в массиве
    for(let key in digits){
        let saveNamb = new Numbers();
        saveNamb.id = key;
        saveNamb.coord.x = digits[key]["x"];
        saveNamb.coord.y = digits[key]["y"];
        saveNamb.text = digits[key]["text"]
        arrayNumbs.push(saveNamb);
    }
    let json = JSON.stringify(arrayNumbs);
}