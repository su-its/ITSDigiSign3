const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
let ct = 0;
let ct2 = 0;
let info = 0;
let slide = -1;
let canvas = null;
let g = null;
let interval = null;
let interval_count = 0;
let opening = new Image();
let bg = new Image();
let ad = new Image();

window.onload = function () {
  canvas = document.getElementById("canvas");
  g = canvas.getContext("2d");
  ad.src = "img/ad.png?version=20220607";
  opening.src = "img/opening.png?version=20220114";
  opening.onload = function () {
    interval = setInterval(drawTestPattern, 1000);
  };
};

function main() {
  let now = new Date();
  // 日付の更新
  let year = now.getFullYear();
  let month = clockProcess(now.getMonth() + 1);
  let day = clockProcess(now.getDate());
  document.getElementById("area_clock_sub").innerText =
    year + "/" + month + "/" + day + "　" + dayOfWeek[now.getDay()] + "曜日";
  // 時刻の更新
  let hour = clockProcess(now.getHours());
  let min = clockProcess(now.getMinutes());
  // 1000ms毎にmainを呼んでもらうことが必須
  document.getElementById("area_clock_main").innerHTML =
    hour + "<span class='clock-colon'>:</span>" + min;
  // 一定時間経過したらお知らせ文とスライドショー画像を書き換え
  if (ct2 % 8 == 0) {
    changeInfoText();
    changeSlideImage();
  }
  ct++;
  ct2++;
  if (ct == 4) {
    ct = 0;
  }
  if (now.getSeconds() <= 6 && (min == "00" || min == "30")) {
    location.reload();
  }
}

// 時刻を文字列に変換
function clockProcess(str) {
  if (str < 10) {
    str = "0" + str;
  } else {
    str = str.toString();
  }
  return str;
}

// お知らせ文の書き換え
function changeInfoText() {
  document.getElementById("area_info").style.opacity = 0;
  setTimeout(function () {
    document.getElementById("area_info_title").innerText =
      information[info].title;
    document.getElementById("area_info_contents").innerText =
      information[info].contents;
    document.getElementById("area_info").style.opacity = 1;
    info++;
    if (info >= information.length) {
      info = 0;
    }
  }, 500);
}

// スライドショー画像の書き換え
function changeSlideImage() {
  slide++;
  if (slide >= slideImage.length) {
    slide = 0;
  }
  switch (slideImage[slide].type) {
    case "image":
      setImage("img/" + slideImage[slide].src, false);
      break;
    case "image_ad":
      setImage("img/" + slideImage[slide].src, true);
      break;
    case "timetable":
      generateTimetable(jr_toyohashi);
      break;
  }
}

// スライドショー画像のセット
function setImage(src, adflag) {
  bg.src = src + "?version=" + version;
  bg.onload = function () {
    g.drawImage(bg, 0, 0);
    if (adflag == true) {
      g.drawImage(ad, 26, 18);
    }
    document.getElementById("area_image").src = canvas.toDataURL();
  };
}

// Canvasテストパターンの表示
function drawTestPattern() {
  drawBootScreen(0);
  interval_count++;
  if (interval_count >= 6) {
    drawBootScreen(1);
    clearInterval(interval);
    interval = setInterval(main, 2000);
  }
}

// 起動画面の表示
function drawBootScreen(id) {
  g.drawImage(opening, 0, 0);
  g.fillStyle = "rgb(83, 92, 104)";
  drawTestPatternText("Version " + version, "24pt 'RobotoBold'", 30, 1130);
  switch (id) {
    case 0:
      drawTestPatternText(interval_count + 1, "24pt 'RobotoRegular'", 30, 1170);
      drawTestPatternText(
        "回目の文字表示テストを実行中。",
        "24pt 'NotoSansJPRegular'",
        50,
        1170
      );
      break;
    case 1:
      drawTestPatternText(
        "まもなく起動処理が完了します…",
        "24pt 'NotoSansJPRegular'",
        30,
        1170
      );
      break;
  }
  document.getElementById("area_image").src = canvas.toDataURL();
}

// 起動画面用の文字表示関数
function drawTestPatternText(str, font, x, y) {
  g.font = font;
  g.fillText(str, x, y);
}
