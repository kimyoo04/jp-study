// 외래어 (gairaigo) — 카타카나로 쓰는 외래어 단어. 카드는 글자 + romaji + 뜻.
// words.ts와 같은 'words' 종류 덱이라 같은 "뜻 고르기" 퀴즈 엔진을 씀.
import type { Kana } from './kana'

export const LOANWORD_ROWS: Kana[][] = [
  // 음식 / 음료
  [
    { kana: 'コーヒー', romaji: 'koohii', meaning: '커피' },
    { kana: 'ジュース', romaji: 'juusu', meaning: '주스' },
    { kana: 'ビール', romaji: 'biiru', meaning: '맥주' },
    { kana: 'ケーキ', romaji: 'keeki', meaning: '케이크' },
    { kana: 'チーズ', romaji: 'chiizu', meaning: '치즈' },
    { kana: 'アイス', romaji: 'aisu', meaning: '아이스크림' },
    { kana: 'パン', romaji: 'pan', meaning: '빵' },
  ],
  // 장소
  [
    { kana: 'ホテル', romaji: 'hoteru', meaning: '호텔' },
    { kana: 'レストラン', romaji: 'resutoran', meaning: '레스토랑' },
    { kana: 'コンビニ', romaji: 'konbini', meaning: '편의점' },
    { kana: 'バス', romaji: 'basu', meaning: '버스' },
    { kana: 'タクシー', romaji: 'takushii', meaning: '택시' },
    { kana: 'デパート', romaji: 'depaato', meaning: '백화점' },
  ],
  // 기기 / 디지털
  [
    { kana: 'テレビ', romaji: 'terebi', meaning: '텔레비전' },
    { kana: 'カメラ', romaji: 'kamera', meaning: '카메라' },
    { kana: 'パソコン', romaji: 'pasokon', meaning: '컴퓨터 (PC)' },
    { kana: 'スマホ', romaji: 'sumaho', meaning: '스마트폰' },
    { kana: 'メール', romaji: 'meeru', meaning: '이메일' },
    { kana: 'ニュース', romaji: 'nyuusu', meaning: '뉴스' },
  ],
  // 취미 / 스포츠
  [
    { kana: 'サッカー', romaji: 'sakkaa', meaning: '축구' },
    { kana: 'テニス', romaji: 'tenisu', meaning: '테니스' },
    { kana: 'ゲーム', romaji: 'geemu', meaning: '게임' },
    { kana: 'テスト', romaji: 'tesuto', meaning: '시험' },
    { kana: 'スポーツ', romaji: 'supootsu', meaning: '스포츠' },
  ],
  // 의류 / 물건
  [
    { kana: 'シャツ', romaji: 'shatsu', meaning: '셔츠' },
    { kana: 'ズボン', romaji: 'zubon', meaning: '바지' },
    { kana: 'スカート', romaji: 'sukaato', meaning: '치마' },
    { kana: 'ボタン', romaji: 'botan', meaning: '버튼 / 단추' },
    { kana: 'ペン', romaji: 'pen', meaning: '펜' },
    { kana: 'ノート', romaji: 'nooto', meaning: '공책' },
    { kana: 'ドア', romaji: 'doa', meaning: '문' },
    { kana: 'ベッド', romaji: 'beddo', meaning: '침대' },
  ],
  // 음식 2
  [
    { kana: 'ハンバーガー', romaji: 'hanbaagaa', meaning: '햄버거' },
    { kana: 'ピザ', romaji: 'piza', meaning: '피자' },
    { kana: 'サラダ', romaji: 'sarada', meaning: '샐러드' },
    { kana: 'スープ', romaji: 'suupu', meaning: '수프' },
    { kana: 'ヨーグルト', romaji: 'yooguruto', meaning: '요거트' },
    { kana: 'チョコレート', romaji: 'chokoreeto', meaning: '초콜릿' },
    { kana: 'バナナ', romaji: 'banana', meaning: '바나나' },
  ],
  // 나라
  [
    { kana: 'アメリカ', romaji: 'amerika', meaning: '미국' },
    { kana: 'カナダ', romaji: 'kanada', meaning: '캐나다' },
    { kana: 'フランス', romaji: 'furansu', meaning: '프랑스' },
    { kana: 'ドイツ', romaji: 'doitsu', meaning: '독일' },
    { kana: 'イタリア', romaji: 'itaria', meaning: '이탈리아' },
    { kana: 'タイ', romaji: 'tai', meaning: '태국' },
  ],
  // 취미 / 스포츠 2
  [
    { kana: 'バスケット', romaji: 'basuketto', meaning: '농구' },
    { kana: 'バレー', romaji: 'baree', meaning: '배구' },
    { kana: 'ゴルフ', romaji: 'gorufu', meaning: '골프' },
    { kana: 'ダンス', romaji: 'dansu', meaning: '댄스' },
    { kana: 'ピアノ', romaji: 'piano', meaning: '피아노' },
    { kana: 'ギター', romaji: 'gitaa', meaning: '기타' },
  ],
  // 생활 물건
  [
    { kana: 'テーブル', romaji: 'teeburu', meaning: '테이블' },
    { kana: 'ソファー', romaji: 'sofaa', meaning: '소파' },
    { kana: 'カーテン', romaji: 'kaaten', meaning: '커튼' },
    { kana: 'タオル', romaji: 'taoru', meaning: '수건' },
    { kana: 'コップ', romaji: 'koppu', meaning: '컵' },
    { kana: 'ナイフ', romaji: 'naifu', meaning: '나이프' },
    { kana: 'フォーク', romaji: 'fooku', meaning: '포크' },
    { kana: 'スプーン', romaji: 'supuun', meaning: '숟가락' },
  ],
  // 현대 / IT
  [
    { kana: 'アプリ', romaji: 'apuri', meaning: '앱' },
    { kana: 'サイト', romaji: 'saito', meaning: '사이트' },
    { kana: 'パスワード', romaji: 'pasuwaado', meaning: '비밀번호' },
    { kana: 'カード', romaji: 'kaado', meaning: '카드' },
    { kana: 'チケット', romaji: 'chiketto', meaning: '티켓' },
    { kana: 'カレンダー', romaji: 'karendaa', meaning: '달력' },
  ],
  // 의류 2
  [
    { kana: 'コート', romaji: 'kooto', meaning: '코트' },
    { kana: 'セーター', romaji: 'seetaa', meaning: '스웨터' },
    { kana: 'ネクタイ', romaji: 'nekutai', meaning: '넥타이' },
    { kana: 'ベルト', romaji: 'beruto', meaning: '벨트' },
    { kana: 'ポケット', romaji: 'poketto', meaning: '주머니' },
    { kana: 'サイズ', romaji: 'saizu', meaning: '사이즈' },
  ],
  // 음식 / 음료 3
  [
    { kana: 'コーラ', romaji: 'koora', meaning: '콜라' },
    { kana: 'ミルク', romaji: 'miruku', meaning: '우유' },
    { kana: 'ワイン', romaji: 'wain', meaning: '와인' },
    { kana: 'トマト', romaji: 'tomato', meaning: '토마토' },
    { kana: 'カレー', romaji: 'karee', meaning: '카레' },
    { kana: 'ラーメン', romaji: 'raamen', meaning: '라멘' },
    { kana: 'パスタ', romaji: 'pasuta', meaning: '파스타' },
    { kana: 'ステーキ', romaji: 'suteeki', meaning: '스테이크' },
  ],
  // 나라 2
  [
    { kana: 'イギリス', romaji: 'igirisu', meaning: '영국' },
    { kana: 'スペイン', romaji: 'supein', meaning: '스페인' },
    { kana: 'ロシア', romaji: 'roshia', meaning: '러시아' },
    { kana: 'インド', romaji: 'indo', meaning: '인도' },
    { kana: 'オーストラリア', romaji: 'oosutoraria', meaning: '호주' },
    { kana: 'ブラジル', romaji: 'burajiru', meaning: '브라질' },
  ],
  // 스포츠 3
  [
    { kana: 'マラソン', romaji: 'marason', meaning: '마라톤' },
    { kana: 'スキー', romaji: 'sukii', meaning: '스키' },
    { kana: 'ボクシング', romaji: 'bokushingu', meaning: '복싱' },
    { kana: 'サーフィン', romaji: 'saafin', meaning: '서핑' },
    { kana: 'ジョギング', romaji: 'jogingu', meaning: '조깅' },
    { kana: 'ヨガ', romaji: 'yoga', meaning: '요가' },
  ],
  // 직장 / 학교
  [
    { kana: 'クラス', romaji: 'kurasu', meaning: '반 / 수업' },
    { kana: 'レポート', romaji: 'repooto', meaning: '리포트' },
    { kana: 'ミーティング', romaji: 'miitingu', meaning: '미팅' },
    { kana: 'プロジェクト', romaji: 'purojekuto', meaning: '프로젝트' },
    { kana: 'グループ', romaji: 'guruupu', meaning: '그룹' },
    { kana: 'メンバー', romaji: 'menbaa', meaning: '멤버' },
  ],
  // 색 / 추상
  [
    { kana: 'ピンク', romaji: 'pinku', meaning: '핑크' },
    { kana: 'オレンジ', romaji: 'orenji', meaning: '오렌지색' },
    { kana: 'グレー', romaji: 'guree', meaning: '회색' },
    { kana: 'デザイン', romaji: 'dezain', meaning: '디자인' },
    { kana: 'イメージ', romaji: 'imeeji', meaning: '이미지' },
    { kana: 'アイデア', romaji: 'aidea', meaning: '아이디어' },
  ],
  // 음식 2
  [
    { kana: 'サンドイッチ', romaji: 'sandoicchi', meaning: '샌드위치' },
    { kana: 'ドーナツ', romaji: 'doonatsu', meaning: '도넛' },
    { kana: 'クッキー', romaji: 'kukkii', meaning: '쿠키' },
    { kana: 'プリン', romaji: 'purin', meaning: '푸딩' },
    { kana: 'ハム', romaji: 'hamu', meaning: '햄' },
    { kana: 'ソーセージ', romaji: 'sooseeji', meaning: '소시지' },
    { kana: 'バター', romaji: 'bataa', meaning: '버터' },
    { kana: 'ジャム', romaji: 'jamu', meaning: '잼' },
  ],
  // 가전 / 기기 2
  [
    { kana: 'エアコン', romaji: 'eakon', meaning: '에어컨' },
    { kana: 'ラジオ', romaji: 'rajio', meaning: '라디오' },
    { kana: 'プリンター', romaji: 'purintaa', meaning: '프린터' },
    { kana: 'マウス', romaji: 'mausu', meaning: '마우스' },
    { kana: 'キーボード', romaji: 'kiiboodo', meaning: '키보드' },
    { kana: 'イヤホン', romaji: 'iyahon', meaning: '이어폰' },
    { kana: 'リモコン', romaji: 'rimokon', meaning: '리모컨' },
    { kana: 'ドライヤー', romaji: 'doraiyaa', meaning: '드라이어' },
  ],
  // 장소 2
  [
    { kana: 'ビル', romaji: 'biru', meaning: '빌딩' },
    { kana: 'アパート', romaji: 'apaato', meaning: '아파트' },
    { kana: 'マンション', romaji: 'manshon', meaning: '맨션 / 아파트' },
    { kana: 'プール', romaji: 'puuru', meaning: '수영장' },
    { kana: 'ジム', romaji: 'jimu', meaning: '헬스장' },
    { kana: 'カフェ', romaji: 'kafe', meaning: '카페' },
    { kana: 'クリニック', romaji: 'kurinikku', meaning: '클리닉' },
    { kana: 'エレベーター', romaji: 'erebeetaa', meaning: '엘리베이터' },
  ],
  // 직업 / 사람
  [
    { kana: 'エンジニア', romaji: 'enjinia', meaning: '엔지니어' },
    { kana: 'デザイナー', romaji: 'dezainaa', meaning: '디자이너' },
    { kana: 'プログラマー', romaji: 'puroguramaa', meaning: '프로그래머' },
    { kana: 'マネージャー', romaji: 'maneejaa', meaning: '매니저' },
    { kana: 'スタッフ', romaji: 'sutaffu', meaning: '스태프' },
    { kana: 'パートナー', romaji: 'paatonaa', meaning: '파트너' },
  ],
  // 취미 / 일상 2
  [
    { kana: 'カラオケ', romaji: 'karaoke', meaning: '노래방' },
    { kana: 'キャンプ', romaji: 'kyanpu', meaning: '캠핑' },
    { kana: 'ドライブ', romaji: 'doraibu', meaning: '드라이브' },
    { kana: 'ショッピング', romaji: 'shoppingu', meaning: '쇼핑' },
    { kana: 'パーティー', romaji: 'paatii', meaning: '파티' },
    { kana: 'コンサート', romaji: 'konsaato', meaning: '콘서트' },
    { kana: 'チーム', romaji: 'chiimu', meaning: '팀' },
    { kana: 'スーパー', romaji: 'suupaa', meaning: '슈퍼마켓' },
  ],
]

/** All loanwords flattened in teaching order. */
export const LOANWORDS: Kana[] = LOANWORD_ROWS.flat()
