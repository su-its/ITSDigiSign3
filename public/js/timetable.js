let timetable_n;
const timetable_bg = new Image();
timetable_bg.src = "img/jr_timetable_toyohashi.png";
const type = new Image();
type.src = "img/jr_timetable_type.png";
const icon = new Image();
icon.src = "img/jr_timetable_icon.png";

// 時刻表画像の生成
function generateTimetable(arr) {
  initTimeTable(arr);
  g.drawImage(timetable_bg, 0, 0);
  for (let i = 0; i < 3; i++) {
    g.drawImage(icon, 150, 0, 75, 75, 601, 403 + 340 * i, 75, 75); // トイレアイコンのダミー
    if (timetable_n != -1) {
      g.fillStyle = "white";
      g.textalign = "start";
      // 種別
      g.drawImage(
        type,
        296 * typeID[arr[timetable_n][2]],
        0,
        296,
        196,
        183,
        182 + 340 * i,
        296,
        196
      );
      // 発車時刻
      g.font = "83pt 'RobotoBold'";
      if (arr[timetable_n][0] >= 10) {
        g.fillText(arr[timetable_n][0], 534, 317 + i * 340);
      } else {
        g.fillText("0" + arr[timetable_n][0], 534, 317 + i * 340);
      }
      g.fillText(":", 671, 317 + i * 340);
      if (arr[timetable_n][1] >= 10) {
        g.fillText(arr[timetable_n][1], 711, 317 + i * 340);
      } else {
        g.fillText("0" + arr[timetable_n][1], 711, 317 + i * 340);
      }
      // 行先
      g.font = "74pt 'NotoSansJPRegular'";
      g.textalign = "center";
      g.fillText(
        destination[arr[timetable_n][3]],
        896 + (340 - g.measureText(destination[arr[timetable_n][3]]).width) / 2,
        292 + i * 340
      );
      // 行先（英語）
      g.font = "27pt 'RobotoRegular'";
      g.fillText(
        destinationEnglish[arr[timetable_n][3]],
        896 +
          (340 - g.measureText(destinationEnglish[arr[timetable_n][3]]).width) /
            2,
        350 + i * 340
      );
      g.font = "23pt 'NotoSansJPRegular'";
      // 停車駅
      switch (arr[timetable_n][2]) {
        case "":
          g.fillText("各駅", 345, 427 + i * 340);
          break;
        case "区間快速":
          g.fillText("岡崎までの各駅", 345, 427 + i * 340);
          break;
        case "サンライズ瀬戸":
          g.fillText("姫路, 岡山, 児島", 345, 427 + i * 340);
          break;
        case "サンライズ出雲":
          g.fillText("姫路, 岡山, 倉敷", 345, 427 + i * 340);
          break;
        default:
          g.fillText("豊橋までの各駅", 345, 427 + i * 340);
          break;
      }
      // 運用車両
      g.font = "23pt 'RobotoRegular'";
      g.fillText(arr[timetable_n][4], 345, 475 + i * 340);
      g.font = "23pt 'NotoSansJPRegular'";
      // g.fillText("準備中", 345, 475 + i * 340);
      // アイコン
      drawToiletIcon(arr[timetable_n][4], i);
      timetable_n = countTimeTable(timetable_n, arr);
    }
  }
  document.getElementById("area_image").src = canvas.toDataURL();
}

// 開始時刻の初期化
function initTimeTable(arr) {
  timetable_n = -1;
  let startTime = new Date();
  let hour = startTime.getHours();
  let min = startTime.getMinutes();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] * 60 + arr[i][1] > hour * 60 + min) {
      timetable_n = i;
      break;
    }
  }
  if (timetable_n == -1) {
    timetable_n = 0;
  }
}

// 時刻表データの参照位置を次へ
function countTimeTable(i, arr) {
  i++;
  if (i >= arr.length) {
    i = -1;
  }
  return i;
}

function drawToiletIcon(str, cnt) {
  let x = 75;
  for (let i = 0; i < trainHaveToilet.length; i++) {
    if (str.indexOf(trainHaveToilet[i]) >= 0) {
      x = 0;
    }
  }
  g.drawImage(icon, x, 0, 75, 75, 601, 403 + 340 * cnt, 75, 75);
}
