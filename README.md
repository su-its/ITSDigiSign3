# ITS DigiSign 3

(c) 2020-2024 IT Solution Room, Shizuoka University all rights reserved.

## 実装した機能

- 日付と時刻の表示
- 一般画像及び広告のスライドショー (PNG / JPG 形式の画像と HTML5 Canvas に対応)
- お知らせや更新履歴の表示
- リロードによる自動アップデート (毎時 0 / 30 分)

## 開発中の機能

- JR 浜松駅時刻表の表示 (アイコン以外は出るようになった)

## 今後実装したい機能

- 記念日の表示
- ニュース / 天気予報の表示

## 動作環境

Raspberry Pi (2 以上) + Raspberry Pi OS (旧 Raspbian) + Chromium の環境を推奨。  
解像度 1920×1200 のモニタが必要。それ以外の解像度では正しく表示されない。

## 開発環境

ローカルで HTML5 Canvas に依存する機能 (JR 浜松駅時刻表 など) を使うとセキュリティエラーが出るため、スタンドアロン環境でもウェブサーバ必須。  
Docker 導入済の Linux 環境で `$ sudo docker-compose up` コマンドを実行すると、ローカル開発用環境が起動する (アクセス URL は http://localhost:3000/) 。

本リポジトリの main ブランチに Push すると、本番環境の GitHub Pages (https://su-its.github.io/ITSDigiSign3/) へ自動でデプロイされる。
