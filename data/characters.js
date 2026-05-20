// ============================================================
// data/characters.js - キャラクターデータの定義ファイル
// ============================================================
// ここにガチャで排出されるキャラクターを定義する
// rarity: レアリティ（SSR/SR/R）
// rate: 排出確率（全キャラを合計すると100になるように設定）

const characters = [
  // ============================
  // SSR（超激レア）- 合計約3%
  // ============================
  {
    id: 1,
    name: 'アルテミス',
    title: '星の女神',
    rarity: 'SSR',
    element: '光',
    rate: 0.6,           // 0.6% の確率で出る
    emoji: '✨',
    description: '星々を統べる伝説の女神。その力は銀河すら照らす。',
    color: '#FFD700'     // キャラカードの色（ゴールド）
  },
  {
    id: 2,
    name: 'ヴォイド',
    title: '虚空の覇者',
    rarity: 'SSR',
    element: '闇',
    rate: 0.6,
    emoji: '🌑',
    description: '暗黒宇宙から召喚された最強の存在。',
    color: '#9B30FF'
  },
  {
    id: 3,
    name: 'フェニックス',
    title: '炎の転生者',
    rarity: 'SSR',
    element: '炎',
    rate: 0.6,
    emoji: '🔥',
    description: '何度でも蘇る不死鳥。その炎は太陽をも凌ぐ。',
    color: '#FF4500'
  },
  {
    id: 4,
    name: 'ネプチューン',
    title: '深海の支配者',
    rarity: 'SSR',
    element: '水',
    rate: 0.6,
    emoji: '🌊',
    description: '海の底より現れた古の神。',
    color: '#00CED1'
  },
  {
    id: 5,
    name: 'ライトニング',
    title: '雷霆の将軍',
    rarity: 'SSR',
    element: '雷',
    rate: 0.6,
    emoji: '⚡',
    description: '雷を自在に操る最強の戦士。',
    color: '#FFFF00'
  },

  // ============================
  // SR（激レア）- 合計約17%
  // ============================
  {
    id: 6,
    name: 'セレスティア',
    title: '天の騎士',
    rarity: 'SR',
    element: '光',
    rate: 2.0,           // 2% の確率
    emoji: '⚔️',
    description: '天界より降臨した光の騎士。',
    color: '#87CEEB'
  },
  {
    id: 7,
    name: 'シャドウ',
    title: '影の刺客',
    rarity: 'SR',
    element: '闇',
    rate: 2.0,
    emoji: '🗡️',
    description: '闇に溶け込む凄腕の暗殺者。',
    color: '#800080'
  },
  {
    id: 8,
    name: 'ブレイズ',
    title: '炎の魔道士',
    rarity: 'SR',
    element: '炎',
    rate: 2.0,
    emoji: '🔮',
    description: '炎魔法の天才魔道士。',
    color: '#FF6347'
  },
  {
    id: 9,
    name: 'アクア',
    title: '水の巫女',
    rarity: 'SR',
    element: '水',
    rate: 2.0,
    emoji: '💧',
    description: '水を司る神秘の巫女。',
    color: '#4169E1'
  },
  {
    id: 10,
    name: 'ストーム',
    title: '嵐の召喚士',
    rarity: 'SR',
    element: '風',
    rate: 2.0,
    emoji: '🌪️',
    description: '嵐を呼ぶ強大な召喚士。',
    color: '#90EE90'
  },
  {
    id: 11,
    name: 'テラ',
    title: '大地の守護者',
    rarity: 'SR',
    element: '土',
    rate: 2.0,
    emoji: '🌿',
    description: '大地の力を借りる古き守護者。',
    color: '#8B4513'
  },
  {
    id: 12,
    name: 'フロスト',
    title: '氷の魔女',
    rarity: 'SR',
    element: '氷',
    rate: 2.0,
    emoji: '❄️',
    description: 'すべてを凍てつかせる氷の魔女。',
    color: '#B0E0E6'
  },
  {
    id: 13,
    name: 'アーク',
    title: '聖弓の射手',
    rarity: 'SR',
    element: '光',
    rate: 1.5,
    emoji: '🏹',
    description: '光の矢で悪を射抜く弓使い。',
    color: '#FFD700'
  },
  {
    id: 14,
    name: 'ダスク',
    title: '黄昏の剣士',
    rarity: 'SR',
    element: '闇',
    rate: 1.5,
    emoji: '🌆',
    description: '黄昏時のみ現れる謎の剣士。',
    color: '#DA70D6'
  },

  // ============================
  // R（レア）- 合計約80%
  // ============================
  {
    id: 15,
    name: 'ソルジャー',
    title: '星の戦士',
    rarity: 'R',
    element: '炎',
    rate: 10.0,          // 10% の確率
    emoji: '⚔️',
    description: '星軍の一般兵士。しかし心は熱い。',
    color: '#CD853F'
  },
  {
    id: 16,
    name: 'アーチャー',
    title: '新人弓使い',
    rarity: 'R',
    element: '風',
    rate: 10.0,
    emoji: '🏹',
    description: '訓練中の若き弓使い。',
    color: '#228B22'
  },
  {
    id: 17,
    name: 'メイジ',
    title: '見習い魔道士',
    rarity: 'R',
    element: '闇',
    rate: 10.0,
    emoji: '📚',
    description: '魔法学校に通う見習い生。',
    color: '#6A5ACD'
  },
  {
    id: 18,
    name: 'ヒーラー',
    title: '回復の使い手',
    rarity: 'R',
    element: '光',
    rate: 10.0,
    emoji: '💊',
    description: '傷を癒すやさしき回復師。',
    color: '#98FB98'
  },
  {
    id: 19,
    name: 'タンカー',
    title: '鋼の守護者',
    rarity: 'R',
    element: '土',
    rate: 10.0,
    emoji: '🛡️',
    description: '頑丈な鎧をまとった防衛兵。',
    color: '#708090'
  },
  {
    id: 20,
    name: 'スカウト',
    title: '情報収集者',
    rarity: 'R',
    element: '風',
    rate: 10.0,
    emoji: '🔭',
    description: '素早く動き回る偵察兵。',
    color: '#2E8B57'
  },
  {
    id: 21,
    name: 'アルケミスト',
    title: '錬金術師',
    rarity: 'R',
    element: '水',
    rate: 10.0,
    emoji: '⚗️',
    description: '薬品と魔法を組み合わせる錬金術師。',
    color: '#20B2AA'
  },
  {
    id: 22,
    name: 'バード',
    title: '旅の吟遊詩人',
    rarity: 'R',
    element: '風',
    rate: 10.0,
    emoji: '🎵',
    description: '音楽で仲間を鼓舞する詩人。',
    color: '#DDA0DD'
  },
];

// ============================================================
// ガチャの抽選処理
// ============================================================

/**
 * 1回のガチャを引く関数
 * @returns {Object} 排出されたキャラクターオブジェクト
 */
function drawOnce() {
  // 0〜100の乱数を生成
  const random = Math.random() * 100;
  
  let cumulative = 0; // 累積確率
  
  // キャラクターを順番に見ていき、乱数が累積確率を超えたキャラを排出
  for (const character of characters) {
    cumulative += character.rate;
    if (random <= cumulative) {
      return { ...character }; // オブジェクトのコピーを返す
    }
  }
  
  // 万が一、どのキャラにも当たらなかった場合は最後のキャラを返す
  return { ...characters[characters.length - 1] };
}

/**
 * 10連ガチャを引く関数
 * ※ 10連では最低1枚はSR以上が確定する
 * @returns {Array} 排出されたキャラクター10体の配列
 */
function drawTen() {
  const results = [];
  
  // 最初の9回は通常抽選
  for (let i = 0; i < 9; i++) {
    results.push(drawOnce());
  }
  
  // 10回目はSR以上確定
  // SRかSSRのキャラクターだけを抽出
  const srAndAbove = characters.filter(c => c.rarity === 'SR' || c.rarity === 'SSR');
  
  // SR以上の中で抽選
  const totalRate = srAndAbove.reduce((sum, c) => sum + c.rate, 0);
  const random = Math.random() * totalRate;
  
  let cumulative = 0;
  let guaranteed = srAndAbove[srAndAbove.length - 1]; // デフォルト
  
  for (const character of srAndAbove) {
    cumulative += character.rate;
    if (random <= cumulative) {
      guaranteed = character;
      break;
    }
  }
  
  results.push({ ...guaranteed });
  
  return results;
}

// 他のファイルから使えるようにエクスポート
module.exports = {
  characters,
  drawOnce,
  drawTen
};
