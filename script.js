const brush = document.getElementById("brushIcon");
const eraser = document.getElementById("eraserIcon");
const brushSize = document.getElementById("brushSize");
const brushColor = document.getElementById("brushColor");
const backgroundColor = document.getElementById("backgroundColor");
const eraserSize = document.getElementById("eraser");
const canvasContainer = document.getElementById("canvas__container");
const clearBtn = document.getElementById("clearCanvas");

// Canvas Dimensions
const width = window.innerWidth;
const height = window.innerHeight;

// On window load execute loadCanvas function
window.addEventListener("load", loadCanvas);

let clearedCanvas = false;
function loadCanvas() {
  // state variables
  let tool = "brush";
  let drawing = false;
  let color,
    size,
    backColor = "#333",
    eSize;
  let canvasHeading;
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  if (!clearedCanvas) {
    // Canvas Heading
    canvasHeading = document.createElement("h1");
    canvasHeading.textContent = "Click Here To Start Painting!";
    canvasHeading.className = "canvas__heading";

    canvasContainer.append(canvasHeading);
    canvasHeading.addEventListener("click", readyToDraw);
  }
  canvasContainer.appendChild(canvas);

  //   EventListeners
  eraser.addEventListener("click", changeToEraser);
  brush.addEventListener("click", changeToBrush);

  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", endPosition);
  brushSize.addEventListener("change", changeBrushSize);
  brushColor.addEventListener("change", changeBrushColor);
  backgroundColor.addEventListener("change", changeBackgroundColor);

  eraserSize.addEventListener("change", changeEraserSize);

  clearBtn.addEventListener("click", clearCanvas);

  //  All functionality goes below
  function readyToDraw() {
    canvasHeading.hidden = true;
  }
  function startPosition(e) {
    drawing = true;
    draw(e);
  }
  function draw(e) {
    if (!drawing) return;
    //   if drawing then execute these lines
    if (tool == "brush") {
      ctx.strokeStyle = color ? color : "#04AA6d";
      ctx.lineWidth = size ? size : 10;
      ctx.lineCap = "round";
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.beginPath();
      ctx.lineTo(e.clientX, e.clientY);
    }
    if (tool == "eraser") {
      ctx.strokeStyle = backColor;
      ctx.lineWidth = eSize ? eSize : 10;
      ctx.lineCap = "round";
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.beginPath();
      ctx.lineTo(e.clientX, e.clientY);
    }
  }
  function endPosition() {
    drawing = false;
    ctx.beginPath();
  }
  function changeBrushSize(e) {
    tool = "brush";
    size = e.target.value;
  }
  function changeBrushColor(e) {
    document.querySelector(".fa-brush").style.color = e.target.value;
    color = e.target.value;
  }
  function changeBackgroundColor(e) {
    backColor = e.target.value;
    document.querySelector(".fa-fill-drip").style.color = e.target.value;
    canvas.style.background = e.target.value;
  }
  function changeToBrush() {
    console.log("tool is brush");
    tool = "brush";
  }
  function changeToEraser() {
    console.log("tool is eraser");
    tool = "eraser";
  }
  function changeEraserSize(e) {
    tool = "eraser";
    eSize = e.target.value;
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
  }
}
