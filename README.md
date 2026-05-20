# ⭐ STAR GACHA - 星霊召喚システム

> Node.js + Express + EJS で作った近未来ゲーム風ガチャシミュレーター

---

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
```

---

## 📝 ファイルを作る手順（初心者向け）

### ステップ1: フォルダを作る

ターミナル（コマンドプロンプト）を開いて以下を実行：

```bash
# プロジェクトフォルダを作成
mkdir gacha-simulator
cd gacha-simulator

# 必要なサブフォルダを作成
mkdir data routes views
mkdir -p public/css public/js
```

### ステップ2: 各ファイルを作成して貼り付ける

上のフォルダ構成の通り、各ファイルを作成してコードをコピペしてください。

- `server.js` → メインフォルダに作る
- `package.json` → メインフォルダに作る
- `data/characters.js` → dataフォルダの中に作る
- `routes/gacha.js` → routesフォルダの中に作る
- `views/index.ejs` → viewsフォルダの中に作る
- `public/css/style.css` → public/cssフォルダの中に作る
- `public/js/gacha.js` → public/jsフォルダの中に作る

---

## 🚀 起動方法

### 1. 必要なソフトウェアのインストール

まず [Node.js](https://nodejs.org/) をインストールしてください（LTS版を推奨）。

インストールを確認：
```bash
node -v    # バージョンが表示されればOK（例: v20.0.0）
npm -v     # 例: 10.0.0
```

### 2. npmパッケージのインストール

```bash
# gacha-simulatorフォルダの中で実行
cd gacha-simulator
npm install
```

これで `node_modules` フォルダが作成され、必要なライブラリが入ります。

**インストールされるライブラリ：**
| ライブラリ | 役割 |
|---|---|
| `express` | Webサーバーフレームワーク |
| `ejs` | HTMLテンプレートエンジン |
| `nodemon` | ファイル変更を自動検知して再起動（開発用） |

### 3. サーバーを起動する

```bash
# 本番起動（手動）
npm start

# 開発時（ファイル変更を自動検知）
npm run dev
```

### 4. ブラウザで開く

起動後、ブラウザで以下にアクセス：

```
http://localhost:3000
```

🎉 ゲーム風ガチャ画面が表示されれば成功！

---

## 🌐 公開方法

### Render での公開手順

Render（https://render.com）は無料プランがあるホスティングサービスです。

#### 1. GitHubにコードをアップロード

```bash
# Gitリポジトリを初期化
git init
git add .
git commit -m "first commit"

# GitHubでリポジトリを作成してからpush
git remote add origin https://github.com/あなたのユーザー名/gacha-simulator.git
git push -u origin main
```

#### 2. Renderでデプロイ

1. [Render](https://render.com) にサインアップ
2. 「New +」→「Web Service」をクリック
3. GitHubリポジトリを連携
4. 以下を設定：
   - **Name**: `gacha-simulator`（好きな名前）
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. 「Create Web Service」をクリック

数分後にURLが発行されます（例: `https://gacha-simulator.onrender.com`）

---

### Railway での公開手順

Railway（https://railway.app）も同様に簡単に公開できます。

1. [Railway](https://railway.app) にサインアップ（GitHub連携可能）
2. 「New Project」→「Deploy from GitHub Repo」
3. リポジトリを選択
4. 環境変数は不要（PORT は Railway が自動設定）
5. デプロイ完了後、「Settings」→「Domains」でURLを発行

---

## ⚙️ カスタマイズ方法

### キャラクターを追加したい

`data/characters.js` を編集します：

```javascript
// 新しいキャラクターを追加する例
{
  id: 23,                    // ユニークなID（既存と重複NG）
  name: 'ガイア',             // キャラクター名
  title: '地球の母神',         // 二つ名
  rarity: 'SSR',             // SSR / SR / R
  element: '土',              // 属性
  rate: 0.6,                 // 排出率（全体で100になるように）
  emoji: '🌍',               // アイコン絵文字
  description: '地球そのものを体現する大地の女神。',
  color: '#228B22'            // カード色
},
```

### 排出率を変えたい

`data/characters.js` の各キャラの `rate` 値を変更します。
**全キャラの `rate` の合計が100になるように設定してください。**

---

## 🔧 トラブルシューティング

| 問題 | 解決方法 |
|------|----------|
| `npm install` でエラー | Node.jsを再インストール |
| ポートが使用中 | 他のアプリを閉じるか、`server.js`の`PORT`を変更 |
| 画面が真っ白 | ブラウザのコンソール（F12）でエラーを確認 |
| ガチャが動かない | ターミナルのエラーメッセージを確認 |

---

## 📊 技術仕様

| 項目 | 内容 |
|------|------|
| サーバー | Node.js + Express |
| テンプレート | EJS |
| スタイル | CSS3（グラデーション・アニメーション） |
| クライアント | Vanilla JavaScript（フレームワークなし） |
| データ保存 | メモリ内（サーバー再起動でリセット） |
| デプロイ対応 | Render / Railway |

---

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

---

*STAR GACHA SYSTEM v1.0 — Built with Node.js × Express × EJS*
"# Gacha-Simulation" 
