# ⭐ STAR GACHA - 星霊召喚システム

> Node.js + Express + EJS で作った近未来ゲーム風ガチャシミュレーター

## 📁 フォルダ構成

```
gacha-simulator/
├── server.js                 ← ① アプリのメインファイル（ここから起動）
├── package.json              ← ② npmパッケージの設定
├── .gitignore                ← gitで管理しないファイルの設定
│
├── data/
│   └── characters.js         ← ③ キャラクターデータ・抽選ロジック
│
├── routes/
│   └── gacha.js              ← ④ ガチャAPIのルート定義
│
├── views/
│   └── index.ejs             ← ⑤ HTMLテンプレート（EJS形式）
│
└── public/
    ├── css/
    │   └── style.css         ← ⑥ スタイルシート（ゲーム風デザイン）
    └── js/
        └── gacha.js          ← ⑦ ブラウザで動くJavaScript

## 🎮 機能一覧

- ✅ 1回ガチャ
- ✅ 10連ガチャ（SR以上確定）
- ✅ SSR / SR / R レアリティ表示
- ✅ ガチャ演出アニメーション
- ✅ SSR排出時フラッシュ演出
- ✅ 排出履歴表示（最大100件）
- ✅ リセットボタン
- ✅ 統計情報（総召喚数・レアリティ別件数）
- ✅ 背景パーティクルエフェクト
- ✅ スキャンライン演出
- ✅ レスポンシブ対応（スマートフォン対応）

---

## 📄 ライセンス

MIT License - 学習・個人利用・改変自由です。

*STAR GACHA SYSTEM v1.0 — Built with Node.js × Express × EJS*
"# Gacha-Simulation" 
"# Gacha-Simulation"  
