// ============================================================
// public/js/gacha.js - ブラウザ上で動くJavaScript
// ============================================================
// ここでボタンクリックの処理・API通信・アニメーションを管理する

// ============================================================
// ページ読み込み後に実行（DOMが準備できてから）
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // DOM要素の取得（操作したいHTML要素を変数に入れる）
  // ============================================================
  const btnSingle   = document.getElementById('btnSingle');    // 1回ボタン
  const btnTen      = document.getElementById('btnTen');       // 10連ボタン
  const btnReset    = document.getElementById('btnReset');     // リセットボタン
  const btnBack     = document.getElementById('btnBack');      // 1連後「続ける」
  const btnBackTen  = document.getElementById('btnBackTen');   // 10連後「続ける」

  // ステージ（演出エリア）
  const stageIdle      = document.getElementById('stageIdle');      // 待機中表示
  const stageLoading   = document.getElementById('stageLoading');   // 読み込み中
  const stageResult    = document.getElementById('stageResult');    // 1連結果
  const stageResultTen = document.getElementById('stageResultTen'); // 10連結果

  // 結果カードの各パーツ
  const resultCard  = document.getElementById('resultCard');
  const cardRarity  = document.getElementById('cardRarity');
  const cardEmoji   = document.getElementById('cardEmoji');
  const cardName    = document.getElementById('cardName');
  const cardTitle   = document.getElementById('cardTitle');
  const cardElement = document.getElementById('cardElement');
  const cardDesc    = document.getElementById('cardDesc');
  const tenResults  = document.getElementById('tenResults');

  // 統計表示
  const statTotal = document.getElementById('statTotal');
  const statSSR   = document.getElementById('statSSR');
  const statSR    = document.getElementById('statSR');
  const statR     = document.getElementById('statR');

  // 履歴リスト
  const historyList = document.getElementById('historyList');

  // ============================================================
  // 状態変数（ガチャの状態を管理する）
  // ============================================================
  let isProcessing = false;  // ガチャ処理中フラグ（二重クリック防止）
  let localStats = { total: 0, SSR: 0, SR: 0, R: 0 }; // ローカル統計

  // ============================================================
  // ページ読み込み時に履歴を取得して表示
  // ============================================================
  loadHistory();

  // ============================================================
  // ボタンのイベントリスナー設定
  // ============================================================

  // 1回召喚ボタン
  btnSingle.addEventListener('click', () => {
    if (isProcessing) return; // 処理中は無視
    drawSingle();
  });

  // 10連召喚ボタン
  btnTen.addEventListener('click', () => {
    if (isProcessing) return;
    drawTen();
  });

  // 「続けて引く」ボタン（1連の後）
  btnBack.addEventListener('click', () => {
    showStage('idle'); // 待機画面に戻る
  });

  // 「続けて引く」ボタン（10連の後）
  btnBackTen.addEventListener('click', () => {
    showStage('idle');
  });

  // リセットボタン
  btnReset.addEventListener('click', async () => {
    // 確認ダイアログを表示
    if (!confirm('📛 召喚履歴をリセットしますか？\nこの操作は元に戻せません。')) return;
    
    await resetHistory();
  });

  // ============================================================
  // 背景パーティクルの生成
  // ============================================================
  createParticles();

  // ============================================================
  // 関数定義
  // ============================================================

  /**
   * ステージの表示を切り替える関数
   * @param {string} stage - 'idle' | 'loading' | 'result' | 'resultTen'
   */
  function showStage(stage) {
    // すべて非表示にする
    stageIdle.style.display      = 'none';
    stageLoading.style.display   = 'none';
    stageResult.style.display    = 'none';
    stageResultTen.style.display = 'none';

    // 指定されたステージを表示
    if (stage === 'idle')      stageIdle.style.display      = 'flex';
    if (stage === 'loading')   stageLoading.style.display   = 'flex';
    if (stage === 'result')    stageResult.style.display    = 'flex';
    if (stage === 'resultTen') stageResultTen.style.display = 'block';
  }

  /**
   * 1回ガチャを引く
   */
  async function drawSingle() {
    isProcessing = true; // 処理開始フラグ
    
    // ローディング表示
    showStage('loading');
    setButtonsDisabled(true);

    try {
      // サーバーのAPIにPOSTリクエストを送る
      const response = await fetch('/api/gacha/single', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      // レスポンスがOKでない場合はエラー
      if (!response.ok) throw new Error('サーバーエラーが発生しました');

      // JSONに変換
      const data = await response.json();

      // 少し待機（演出のため）
      await sleep(800);

      // 結果を表示
      showSingleResult(data.result);

      // 統計と履歴を更新
      updateLocalStats(data.result.rarity);
      addHistoryItem(data.result);

    } catch (error) {
      console.error('ガチャエラー:', error);
      alert('エラーが発生しました: ' + error.message);
      showStage('idle');
    } finally {
      isProcessing = false;
      setButtonsDisabled(false);
    }
  }

  /**
   * 10連ガチャを引く
   */
  async function drawTen() {
    isProcessing = true;
    
    showStage('loading');
    setButtonsDisabled(true);

    try {
      const response = await fetch('/api/gacha/ten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('サーバーエラーが発生しました');

      const data = await response.json();

      // 10連は少し長め演出
      await sleep(1200);

      // 結果を表示
      showTenResult(data.results);

      // 統計と履歴を更新
      data.results.forEach(result => {
        updateLocalStats(result.rarity);
        addHistoryItem(result);
      });

    } catch (error) {
      console.error('ガチャエラー:', error);
      alert('エラーが発生しました: ' + error.message);
      showStage('idle');
    } finally {
      isProcessing = false;
      setButtonsDisabled(false);
    }
  }

  /**
   * 1連の結果を画面に表示する
   * @param {Object} character - キャラクターオブジェクト
   */
  function showSingleResult(character) {
    // SSRなら特別演出（画面が光る）
    if (character.rarity === 'SSR') {
      triggerSSREffect();
    }

    // カードの各部分にデータを設定
    resultCard.className = `result-card rarity-${character.rarity}`;
    cardRarity.textContent  = character.rarity;
    cardRarity.className    = `card-rarity rarity-${character.rarity}`;
    cardEmoji.textContent   = character.emoji;
    cardName.textContent    = character.name;
    cardTitle.textContent   = character.title;
    cardElement.textContent = `[ ${character.element} ]`;
    cardDesc.textContent    = character.description;

    // カードの色を変える（キャラクター固有の色）
    resultCard.style.setProperty('--char-color', character.color);

    // 結果ステージを表示
    showStage('result');
  }

  /**
   * 10連の結果を画面に表示する
   * @param {Array} characters - キャラクター10体の配列
   */
  function showTenResult(characters) {
    // SSRがあれば特別演出
    const hasSSR = characters.some(c => c.rarity === 'SSR');
    if (hasSSR) triggerSSREffect();

    // 10連カードグリッドを作成
    tenResults.innerHTML = ''; // 一度クリア

    characters.forEach((character) => {
      // ミニカードのHTMLを作成
      const card = document.createElement('div');
      card.className = `mini-card rarity-${character.rarity}`;
      card.innerHTML = `
        <div class="mini-rarity rarity-${character.rarity}">${character.rarity}</div>
        <span class="mini-emoji">${character.emoji}</span>
        <div class="mini-name">${character.name}</div>
      `;
      tenResults.appendChild(card);
    });

    showStage('resultTen');
  }

  /**
   * SSR演出（画面がフラッシュする）
   */
  function triggerSSREffect() {
    const flash = document.createElement('div');
    flash.className = 'ssr-flash';
    document.body.appendChild(flash);

    // アニメーション終了後に要素を削除
    setTimeout(() => flash.remove(), 1000);
  }

  /**
   * ローカルの統計を更新して画面に表示
   * @param {string} rarity - 'SSR' | 'SR' | 'R'
   */
  function updateLocalStats(rarity) {
    localStats.total++;
    localStats[rarity]++;

    // DOM更新
    statTotal.textContent = localStats.total;
    statSSR.textContent   = localStats.SSR;
    statSR.textContent    = localStats.SR;
    statR.textContent     = localStats.R;
  }

  /**
   * 履歴に1件追加する（画面の先頭に表示）
   * @param {Object} character - キャラクターオブジェクト
   */
  function addHistoryItem(character) {
    // 「まだ召喚していません」メッセージがあれば削除
    const emptyMsg = historyList.querySelector('.history-empty');
    if (emptyMsg) emptyMsg.remove();

    // 履歴アイテムのHTML要素を作成
    const item = document.createElement('div');
    item.className = `history-item rarity-${character.rarity}`;
    item.innerHTML = `
      <span class="history-rarity rarity-${character.rarity}">${character.rarity}</span>
      <span class="history-emoji">${character.emoji}</span>
      <span class="history-name">${character.name}</span>
      <span class="history-element">${character.element}</span>
      <span class="history-time">${getNow()}</span>
    `;

    // 先頭に追加（新しいものが上に来る）
    historyList.insertBefore(item, historyList.firstChild);

    // 100件を超えたら末尾を削除
    const items = historyList.querySelectorAll('.history-item');
    if (items.length > 100) {
      items[items.length - 1].remove();
    }
  }

  /**
   * サーバーから履歴を取得して表示（初回読み込み）
   */
  async function loadHistory() {
    try {
      const response = await fetch('/api/gacha/history');
      const data = await response.json();

      if (data.history && data.history.length > 0) {
        // 統計を集計
        data.history.forEach(h => {
          localStats.total++;
          if (localStats[h.rarity] !== undefined) localStats[h.rarity]++;
        });

        // DOM更新
        statTotal.textContent = localStats.total;
        statSSR.textContent   = localStats.SSR;
        statSR.textContent    = localStats.SR;
        statR.textContent     = localStats.R;

        // 履歴表示
        historyList.innerHTML = '';
        data.history.forEach(character => {
          const item = document.createElement('div');
          item.className = `history-item rarity-${character.rarity}`;
          item.innerHTML = `
            <span class="history-rarity rarity-${character.rarity}">${character.rarity}</span>
            <span class="history-emoji">${character.emoji}</span>
            <span class="history-name">${character.name}</span>
            <span class="history-element">${character.element}</span>
            <span class="history-time">${character.drawnAt || ''}</span>
          `;
          historyList.appendChild(item);
        });
      }
    } catch (error) {
      console.error('履歴の読み込みエラー:', error);
    }
  }

  /**
   * 履歴をリセットする
   */
  async function resetHistory() {
    try {
      const response = await fetch('/api/gacha/history', {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('リセットに失敗しました');

      // ローカルの統計もリセット
      localStats = { total: 0, SSR: 0, SR: 0, R: 0 };
      statTotal.textContent = 0;
      statSSR.textContent   = 0;
      statSR.textContent    = 0;
      statR.textContent     = 0;

      // 履歴表示をリセット
      historyList.innerHTML = '<p class="history-empty">まだ召喚していません</p>';

      // 待機画面に戻る
      showStage('idle');

    } catch (error) {
      console.error('リセットエラー:', error);
      alert('リセットに失敗しました: ' + error.message);
    }
  }

  /**
   * ボタンの有効/無効を切り替える
   * @param {boolean} disabled - trueで無効化
   */
  function setButtonsDisabled(disabled) {
    btnSingle.disabled = disabled;
    btnTen.disabled    = disabled;
    btnReset.disabled  = disabled;

    // 視覚的にも変える（透明度を下げる）
    const opacity = disabled ? '0.5' : '1';
    btnSingle.style.opacity = opacity;
    btnTen.style.opacity    = opacity;
  }

  /**
   * 指定ミリ秒待機する関数（Promiseベース）
   * @param {number} ms - 待機時間（ミリ秒）
   */
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 現在時刻の文字列を返す
   */
  function getNow() {
    return new Date().toLocaleString('ja-JP', {
      month: '2-digit',
      day:   '2-digit',
      hour:  '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * 背景パーティクルを生成する
   */
  function createParticles() {
    const container = document.getElementById('bgParticles');
    const count = 30; // パーティクル数

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // ランダムな位置・サイズ・速度を設定
      const size     = Math.random() * 3 + 1;
      const posX     = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay    = Math.random() * 15;

      // パーティクルの色をランダムに（青か紫か白）
      const colors = ['#00c8ff', '#a855f7', '#ffffff', '#f0abfc'];
      const color  = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${posX}%;
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        background: ${color};
        box-shadow: 0 0 ${size * 2}px ${color};
      `;

      container.appendChild(particle);
    }
  }

}); // DOMContentLoaded 終わり
