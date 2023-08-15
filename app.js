const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save-btn");
const fontStyleInput = document.getElementById("font-style");
const fontSizeInput = document.getElementById("font-size");
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
ctx.font = "30px serif";
let isFilling = false;

let isPainting = false;
function onMove(e) {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(e.offsetX, e.offsetY);
}
function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(e) {
  ctx.lineWidth = e.target.value;
}
function onColorChange(e) {
  ctx.strokeStyle = ctx.fillStyle = e.target.value;
}
function onColorClick(e) {
  const colorValue = e.target.dataset.color;
  ctx.strokeStyle = ctx.fillStyle = color.value = colorValue;
}
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Change to Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Change to Draw";
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onResetClick() {
  if (window.confirm("This action will reset your canvas")) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Change to Fill";
}
function onFileChange(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}
function onDoubleClick(e) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save(); // 이전 세팅을 저장함
    ctx.lineWidth = 1;
    ctx.fillText(text, e.offsetX, e.offsetY);
    ctx.restore(); // 이전 세팅을 다시 불러옴
  }
}
function onSaveClick() {
  const url = canvas.toDataURL(); // encode as a url
  const a = document.createElement("a");
  a.href = url; // add a download attribute
  a.download = "myDrawing.png";
  a.click();
}
let fontStyle;
let fontSize = 30;
function onFontChange(e) {
  fontStyle = e.target.value;
  text.style.fontFamily = fontStyle;
  ctx.font = `${fontSize}px ${fontStyle}`;
}
function onFontSizeChange(e) {
  fontSize = e.target.value;
  ctx.font = `${fontSize}px ${fontStyle}`;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
resetBtn.addEventListener("click", onResetClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
fontStyleInput.addEventListener("change", onFontChange);
fontSizeInput.addEventListener("change", onFontSizeChange);
