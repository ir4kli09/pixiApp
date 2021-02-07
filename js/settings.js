let TextStyle = PIXI.TextStyle;



const fontStyle = new TextStyle({
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
    darkOrchid: 0xe512ec,
    chocolate: 0xd2691e,
    tomato: 0xff6347,
};
// 16646152 // красный
// 16753920 // оранжевый
// 16776960 // жёлтый
// 65280    // зелёный
// 65535    // "голубой"
// 255      // синий
// 10494192 // фиолетовый
let appSetting = {
    width: 500,
    height: 500,
    rectWidth: 32,
    rectHeight: 32,
    scale: 1,
    targetColor: 0xfe0008,
    crossColor: 0xff0000,
    backColor: 0xffffff,
};

export {fontStyle, penColors, appSetting};