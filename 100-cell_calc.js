/**
  100繝槭せ險育ｮ玲ｼ皮ｿ偵�繝ｭ繧ｰ繝ｩ繝�
  TexClub縺ｮ驛ｨ蜩｡縺ｮ譁ｹ縺ｯ閾ｪ逕ｱ縺ｫ菫ｮ豁｣縺励※繧ゅｉ縺｣縺ｦ螟ｧ荳亥､ｫ縺ｧ縺吶�
  javascript闍ｦ謇九□縺九ｉ繧ｳ繝ｼ繝峨′豎壹＞縺代←(ﾂｴ繝ｻﾏ峨�`)縲�

  Copyright: TexClub,
  Author: Tomoaki Seto,
  Date: 2016/09/06
**/

var table = {
  vertical: 10,
  horizontal: 10,
  cell_size: 40,
  cell_color: "rgb(233, 225, 142)",
  verticalArray: [],
  horizontalArray: [],
};

var timer = {
  width: 140,
  height: 40,
  sec: 0,
  min: 0,
  hour: 0,
};

var canvas;
var context;
var select;
var timerEvent;
var timerContext;
var count = 0;

/**
  蛻晄悄蛹悶ｒ陦後≧髢｢謨ｰ
  @param select 雜ｳ縺礼ｮ励∝ｼ輔″邂励∵寺縺醍ｮ励√◎繧御ｻ･螟�(default)
**/
function init(select) {
  if (select != "addition" && select != "subtraction" && select != "multiplication" && select != "default") {
    console.log("繝舌げ隕九▽縺代ｈ縺�→縺励↑縺�〒(ﾂｴ繝ｻﾏ峨�`)");
    location.href = "http://www.kochi-tech.ac.jp";
    return;
  }

  this.select = select;
  canvas = document.getElementById("calc");

  // canvas縺御ｽｿ逕ｨ蜿ｯ閭ｽ縺ｪ蝣ｴ蜷医�縺ｿ謠冗判
  if (canvas.getContext) {
    context = canvas.getContext("2d");
    timerContext = document.getElementById("timer").getContext("2d");

    clearCanvas();
    clearInputForm();
    clearButton();

    createButton();
    drawTable();
    drawOperator();
    createTimer();

    // 繧ｭ繝ｼ繝ｪ繧ｹ繝翫�縺ｮ逋ｻ骭ｲ
    if (document.addEventListener) {
      document.addEventListener("keydown", onKeyDown);
    } else if (document.attachEvent) {
      document.attachEvent("onkeydown", onKeyDown);
    }
  }
}

/**
  髢句ｧ九�繧ｿ繝ｳ縺梧款縺輔ｌ縺滓凾縺ｮ蜃ｦ逅�未謨ｰ
**/
function start() {
  clearCanvas();
  clearInputForm();

  drawTable();
  drawText();
  drawOperator();
  createInputForm();

  createTimer();
  timerEvent = setInterval(addTimer, 1000);

  document.start.src = "./img/answer.png";
  document.getElementById("start").href = "javascript:answer();";
}

/**
  遲斐∴蜷医ｏ縺�
**/
function answer() {
  stopTimer();
  clearButton();
  createButton();

  var mistake = 0;

  var count = 1;
  for (var i = 0; i < table.vertical; i++) {
    for (var j = 0; j < table.horizontal; j++) {
      var element = document.getElementById(count);

      var ans = 0;
      switch (select) {
        case "addition":
          ans = table.verticalArray[i] + table.horizontalArray[j];
          break;
        case "subtraction":
          ans = table.verticalArray[i] - table.horizontalArray[j];
          break;
        case "multiplication":
          ans = table.verticalArray[i] * table.horizontalArray[j];
          break;
        default:
          return;
      }

      if (element.value == "" || element.value != ans) {
        element.style.background = "#ff0000";
        mistake++;
      }
      count++;
    }
  }

  addResultText(mistake);
}

/**
  繧�ｊ逶ｴ縺�
**/
function restart() {
  stopTimer();
  init(select);
}

/**
  驕ｸ謚樒判髱｢繧定｡ｨ遉ｺ縺吶ｋ
**/
function change() {
  stopTimer();

  // 繝懊ち繝ｳ縺ｮ蜀咲函謌�
  clearButton();
  createButton();

  displaySelect();
}

/**
  陦ｨ繧呈緒逕ｻ縺吶ｋ髢｢謨ｰ
**/
function drawTable() {
  context.fillStyle = table.cell_color;

  context.fillRect(0, 0, table.cell_size, table.cell_size);
  context.strokeRect(0, 0, table.cell_size, table.cell_size);

  for (var i = 1; i <= table.vertical; i++) {
    // horizontal
    context.fillRect(i * table.cell_size, 0, table.cell_size, table.cell_size);
    context.strokeRect(i * table.cell_size, 0, table.cell_size, table.cell_size);

    // vertical
    context.fillRect(0, i * table.cell_size, table.cell_size, table.cell_size);
    context.strokeRect(0, i * table.cell_size, table.cell_size, table.cell_size);

    for (var j = 1; j <= table.horizontal; j++) {
      context.strokeRect(j * table.cell_size, i * table.cell_size, table.cell_size, table.cell_size);
    }
  }
}

/**
  譁�ｭ励ｒ謠冗判縺吶ｋ髢｢謨ｰ
**/
function drawText() {
  context.fillStyle = "rgb(0, 0, 0)";
  context.font = "25px Century Gothic";

  // 荵ｱ謨ｰ逕滓�
  table.verticalArray = generateRandomArray(table.vertical);
  table.horizontalArray = generateRandomArray(table.horizontal);

  // 謠冗判
  for (var i = 1; i <= table.vertical; i++) {
    context.fillText(table.horizontalArray[i-1], (i * table.cell_size) + table.cell_size/3, table.cell_size/1.5);

    context.fillText(table.verticalArray[i-1], table.cell_size/3, (i * table.cell_size) + table.cell_size/1.5);
  }
}

function drawOperator() {
  context.fillStyle = "rgb(0, 0, 0)";
  context.font = "25px Century Gothic";

  switch (select) {
    case "addition":
      context.fillText("��", 7, 29);
      break;
    case "subtraction":
      context.fillText("竏�", 12, 27);
      break;
    case "multiplication":
      context.fillText("ﾃ�", 12, 29)
      break;
    default:
      return;
  }
}

/**
  蜈･蜉帙ヵ繧ｩ繝ｼ繝�繧堤函謌舌☆繧矩未謨ｰ
**/
function createInputForm() {
  // 譌｢縺ｫ繝輔か繝ｼ繝�縺悟ｭ伜惠縺吶ｋ縺�
  var containerName = "forms";
  if (hasElement(containerName)) {
    return;
  }

  var container = document.createElement("div");
  container.setAttribute("id", containerName);
  document.getElementById("contents").appendChild(container);

  for (var i = 1; i <= table.vertical; i++) {
    for (var j = 1; j <= table.horizontal; j++) {
      var input = document.createElement("input");
      input.type = "number";
      input.id = String( ((i-1) * table.vertical) + j);
      input.name = String( ((i-1) * table.vertical) + j);
      input.style.position = "absolute";
      input.style.left = String(j * table.cell_size+115) + "px";
      input.style.top = String(i * table.cell_size+102) + "px";
      input.style.width = String(table.cell_size-10) + "px";
      input.style.height = String(table.cell_size-10) + "px";

      container.appendChild(input);
    }
  }
}

/**
  繝懊ち繝ｳ繧堤函謌舌☆繧矩未謨ｰ
**/
function createButton() {
  // 譌｢縺ｫ繝懊ち繝ｳ縺悟ｭ伜惠縺吶ｋ縺�
  var containerName = "buttons";
  if (hasElement(containerName)) {
    return;
  }

  // 繝懊ち繝ｳ縺ｮ蜈･繧檎黄
  var container = document.createElement("span");
  container.setAttribute("id", containerName);

  // 縺薙％縺九ｉ繝懊ち繝ｳ縺ｮ貅門ｙ
  var start = document.createElement("a");
  start.setAttribute("href", "javascript:start();");
  start.setAttribute("id", "start");
  var startButton = document.createElement("img");
  startButton.setAttribute("src", "./img/start.png");
  startButton.setAttribute("alt", "髢句ｧ�");
  startButton.setAttribute("name", "start");
  start.appendChild(startButton);

  var restart = document.createElement("a");
  restart.setAttribute("href", "javascript:restart();")
  var restartButton = document.createElement("img");
  restartButton.setAttribute("src", "./img/restart.png");
  restartButton.setAttribute("alt", "繧�ｊ逶ｴ縺�");
  restart.appendChild(restartButton);

  var change = document.createElement("a");
  change.setAttribute("href", "javascript:change();");
  var changeButton = document.createElement("img");
  changeButton.setAttribute("src", "./img/change.png");
  changeButton.setAttribute("alt", "驕ｸ縺ｳ逶ｴ縺�");
  change.appendChild(changeButton);

  // 謠冗判
  var canvas = document.getElementById("timer");
  document.getElementById("contents").insertBefore(container, canvas);
  container.appendChild(start);
  container.appendChild(restart);
  container.appendChild(change);
}

function createTimer() {
  timer.sec = 0;
  timer.min = 0;
  timer.hour = 0;

  timerContext.clearRect(0, 0, timer.width, timer.height);

  timerContext.lineWidth = 4;
  timerContext.strokeRect(0, 0, timer.width, timer.height);

  timerContext.fillStyle = "rgb(0, 0, 0)";
  timerContext.font = "25px Century Gothic";
  timerContext.fillText("0:00:00", 30, 28);
}

function addTimer() {
  if (timer.hour >= 99 && timer.min >= 59 && timer.sec >= 59) {
    stopTimer();
  }

  timer.sec++;
  if (timer.sec >= 60) {
    timer.sec = 0;
    timer.min++;
  }
  if (timer.min >= 60) {
    timer.min = 0;
    timer.hour++;
  }

  var sec = String(timer.sec);
  if (timer.sec < 10) {
    sec = "0" + String(timer.sec);
  }

  var min = String(timer.min);
  if (timer.min < 10) {
    min = "0" + String(timer.min);
  }
  timerContext.clearRect(5, 5, timer.width-10, timer.height-10);
  timerContext.fillText(String(timer.hour) + ":" + min + ":" + sec, 30, 28);
}

function stopTimer() {
  clearInterval(timerEvent);
}

function addResultText(mistake) {
  var resultForm = document.getElementById("result");

  var element = document.createElement("div");
  element.setAttribute("class", "inner");

  var header = document.createElement("h4");
  header.appendChild(document.createTextNode(String(++count) + "蝗樒岼��"));
  var operator = document.createElement("span");
  operator.setAttribute("class", "operator");
  operator.appendChild(document.createTextNode(getOperatorText(select)));
  header.appendChild(operator);
  element.appendChild(header);

  var mistakeCount = document.createElement("p");
  mistakeCount.appendChild(document.createTextNode("荳肴ｭ｣隗｣謨ｰ��" + String(mistake)));
  element.appendChild(mistakeCount);

  var accuracyRate = document.createElement("p");
  accuracyRate.appendChild(document.createTextNode("豁｣隗｣邇�ｼ�" + String(((table.vertical*table.horizontal - mistake) / table.vertical*table.horizontal)) + "%"));
  element.appendChild(accuracyRate);

  var time = document.createElement("p");
  var timeText = "邨碁℃譎る俣��";
  if (timer.hour != 0) {
    timeText += String(timer.hour) + "譎る俣";
  }
  if (timer.min != 0) {
    timeText += String(timer.min) + "蛻�";
  }
  timeText += String(timer.sec) + "遘�";
  time.appendChild(document.createTextNode(timeText));
  element.appendChild(time);

  resultForm.appendChild(element);
}

/**
  canvas縺ｧ謠冗判縺励◆隕∫ｴ�繧貞炎髯､縺吶ｋ
**/
function clearCanvas() {
  context.clearRect(0, 0, table.horizontal*table.cell_size, table.vertical*table.cell_size);
}

/**
  蜈･蜉帙ヵ繧ｩ繝ｼ繝�繧貞炎髯､縺吶ｋ
**/
function clearInputForm() {
  if (!hasElement("forms")) {
    return;
  }

  var forms = document.getElementById("forms");
  forms.parentNode.removeChild(forms);
}

function clearButton() {
  if (!hasElement("buttons")) {
    return;
  }

  var buttons = document.getElementById("buttons");
  buttons.parentNode.removeChild(buttons);
}

/**
  驥崎､�↑縺励〒荵ｱ謨ｰ繧堤函謌舌☆繧�
  @param num 逕滓�縺吶ｋ荵ｱ謨ｰ縺ｮ荳企剞縲∝区焚
  @return 荵ｱ謨ｰ繧呈�ｼ邏阪＠縺滄�蛻�
**/
function generateRandomArray(num) {
  var a = [];
  for (var i = 0; i < num; i++) {
    a.push(i);
  }

  var t = [];
  var r = [];
  var l = a.length;
  var n = num < l ? num : l;
  while (n-- > 0) {
    var i = Math.random() * l | 0;
    r[n] = t[i] || a[i];
    --l;
    t[i] = t[l] || a[l];
  }
  return r;
}

/**
  譌｢縺ｫ隕∫ｴ�縺悟ｭ伜惠縺吶ｋ縺九ｒ遒ｺ隱阪☆繧�
  @param element 遒ｺ隱阪＠縺溘＞隕∫ｴ�蜷�
  @return 蟄伜惠縺吶ｌ縺ｰtrue
**/
function hasElement(element) {
  if (document.getElementById(element) == null) {
    return false;
  }

  return true;
}

function getOperatorText(select) {
  switch (select) {
    case "addition":
      return "雜ｳ縺礼ｮ�";
    case "subtraction":
      return "蠑輔″邂�";
    case "multiplication":
      return "謗帙￠邂�";
    default:
      break;
  }
}

/**
  繧ｭ繝ｼ縺梧款縺輔ｌ縺滓凾縺ｫ蜻ｼ縺ｳ蜃ｺ縺輔ｌ繧�
  @param e 謚ｼ縺輔ｌ縺溘く繝ｼ縺ｮ諠��ｱ縺梧�ｼ邏阪＆繧後※縺�ｋ
**/
function onKeyDown(e) {
  var keyCode = e.keyCode;

  // 繧ｨ繝ｳ繧ｿ繝ｼ縺梧款縺輔ｌ縺滓凾縺ｯ谺｡縺ｮ繝輔か繝ｼ繝�縺ｸ遘ｻ蜍�
  if (keyCode == 13) {
    var activeElement = document.activeElement;
    var id = Number(activeElement.id);

    if (id == table.vertical * table.horizontal) {
      id = 1;
    } else {
      ++id;
    }

    var element = document.getElementById(id);
    if (element != null) {
      element.focus();
    }
  }
}
