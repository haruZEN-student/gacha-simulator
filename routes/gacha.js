// ============================================================
// routes/gacha.js - ガチャのAPIルートを定義するファイル
// ============================================================
// ここでURLとその処理（コントローラー）を対応させる

const express = require('express');
const router = express.Router(); // Expressのルーターを作成

// キャラクターデータと抽選関数を読み込む
const { drawOnce, drawTen, characters } = require('../data/characters');

// ============================================================
// 排出履歴のデータ（メモリ上に保存）
// ============================================================
// 注意: サーバーを再起動するとリセットされる
// 永続化したい場合はデータベース（SQLiteなど）を使う
let history = [];

// ============================================================
// APIエンドポイントの定義
// ============================================================

/**
 * POST /api/gacha/single
 * 1回ガチャを引く
 */
router.post('/single', (req, res) => {
  // 1回抽選する
  const result = drawOnce();
  
  // タイムスタンプを追加して履歴に保存
  const record = {
    ...result,
    drawnAt: new Date().toLocaleString('ja-JP'),
    type: 'single' // 1連か10連かの種別
  };
  
  // 履歴の先頭に追加（新しいものが上に来るように）
  history.unshift(record);
  
  // 履歴が多すぎる場合は古いものを削除（最大100件）
  if (history.length > 100) {
    history = history.slice(0, 100);
  }
  
  // 結果をJSONで返す
  res.json({
    success: true,
    result: result,
    totalCount: history.length
  });
});

/**
 * POST /api/gacha/ten
 * 10連ガチャを引く
 */
router.post('/ten', (req, res) => {
  // 10回抽選する（10連確定SR以上付き）
  const results = drawTen();
  
  // 各結果に情報を付加して履歴に保存
  const now = new Date().toLocaleString('ja-JP');
  
  results.forEach(result => {
    history.unshift({
      ...result,
      drawnAt: now,
      type: 'ten'
    });
  });
  
  // 履歴が多すぎる場合は古いものを削除
  if (history.length > 100) {
    history = history.slice(0, 100);
  }
  
  // 結果をJSONで返す
  res.json({
    success: true,
    results: results,
    totalCount: history.length
  });
});

/**
 * GET /api/gacha/history
 * 排出履歴を取得する
 */
router.get('/history', (req, res) => {
  res.json({
    success: true,
    history: history,
    total: history.length
  });
});

/**
 * DELETE /api/gacha/history
 * 排出履歴をリセットする
 */
router.delete('/history', (req, res) => {
  history = []; // 配列を空にする
  
  res.json({
    success: true,
    message: '履歴をリセットしました'
  });
});

/**
 * GET /api/gacha/stats
 * 統計情報を取得する（排出率確認用）
 */
router.get('/stats', (req, res) => {
  // レアリティごとの件数を集計
  const rarityCount = {
    SSR: history.filter(h => h.rarity === 'SSR').length,
    SR:  history.filter(h => h.rarity === 'SR').length,
    R:   history.filter(h => h.rarity === 'R').length,
  };
  
  res.json({
    success: true,
    total: history.length,
    rarityCount,
    characters: characters.map(c => ({
      name: c.name,
      rarity: c.rarity,
      rate: c.rate
    }))
  });
});

// ルーターをエクスポート
module.exports = router;
