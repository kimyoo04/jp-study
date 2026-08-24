// 외래어 (gairaigo) — 카타카나로 쓰는 외래어 단어. 카드는 글자 + romaji + 뜻.
// words.ts와 같은 'words' 종류 덱이라 같은 "뜻 고르기" 퀴즈 엔진을 씀.
import type { Kana } from './kana'
import { LOANWORD_EXPANSION_ROWS } from './loanwords-expanded'

export const BASE_LOANWORD_ROWS: Kana[][] = [
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
  // 음식 3
  [
    { kana: 'アイスクリーム', romaji: 'aisukuriimu', meaning: '아이스크림' },
    { kana: 'サイダー', romaji: 'saidaa', meaning: '사이다' },
    { kana: 'ポップコーン', romaji: 'poppukoon', meaning: '팝콘' },
    { kana: 'マヨネーズ', romaji: 'mayoneezu', meaning: '마요네즈' },
    { kana: 'ケチャップ', romaji: 'kechappu', meaning: '케첩' },
    { kana: 'ヌードル', romaji: 'nuudoru', meaning: '누들 / 면' },
    { kana: 'シリアル', romaji: 'shiriaru', meaning: '시리얼' },
    { kana: 'デザート', romaji: 'dezaato', meaning: '디저트' },
  ],
  // IT / 통신 2
  [
    { kana: 'ネット', romaji: 'netto', meaning: '인터넷' },
    { kana: 'メッセージ', romaji: 'messeeji', meaning: '메시지' },
    { kana: 'データ', romaji: 'deeta', meaning: '데이터' },
    { kana: 'ファイル', romaji: 'fairu', meaning: '파일' },
    { kana: 'アカウント', romaji: 'akaunto', meaning: '계정' },
    { kana: 'ログイン', romaji: 'roguin', meaning: '로그인' },
    { kana: 'スクリーン', romaji: 'sukuriin', meaning: '화면' },
    { kana: 'アイコン', romaji: 'aikon', meaning: '아이콘' },
  ],
  // 패션 / 뷰티
  [
    { kana: 'ワンピース', romaji: 'wanpiisu', meaning: '원피스' },
    { kana: 'ジーンズ', romaji: 'jiinzu', meaning: '청바지' },
    { kana: 'スニーカー', romaji: 'suniikaa', meaning: '운동화' },
    { kana: 'ブーツ', romaji: 'buutsu', meaning: '부츠' },
    { kana: 'マスク', romaji: 'masuku', meaning: '마스크' },
    { kana: 'サンダル', romaji: 'sandaru', meaning: '샌들' },
    { kana: 'シャンプー', romaji: 'shanpuu', meaning: '샴푸' },
    { kana: 'メガネ', romaji: 'megane', meaning: '안경' },
  ],
  // 교통 / 여행
  [
    { kana: 'パスポート', romaji: 'pasupooto', meaning: '여권' },
    { kana: 'スーツケース', romaji: 'suutsukeesu', meaning: '여행 가방' },
    { kana: 'シート', romaji: 'shiito', meaning: '좌석' },
    { kana: 'ガソリン', romaji: 'gasorin', meaning: '휘발유' },
    { kana: 'バイク', romaji: 'baiku', meaning: '오토바이' },
    { kana: 'ヘルメット', romaji: 'herumetto', meaning: '헬멧' },
    { kana: 'マップ', romaji: 'mappu', meaning: '지도' },
    { kana: 'ガイド', romaji: 'gaido', meaning: '가이드' },
  ],
  // 비즈니스 / 추상
  [
    { kana: 'ビジネス', romaji: 'bijinesu', meaning: '비즈니스' },
    { kana: 'サービス', romaji: 'saabisu', meaning: '서비스' },
    { kana: 'チャンス', romaji: 'chansu', meaning: '기회' },
    { kana: 'ストレス', romaji: 'sutoresu', meaning: '스트레스' },
    { kana: 'ルール', romaji: 'ruuru', meaning: '규칙' },
    { kana: 'レベル', romaji: 'reberu', meaning: '레벨' },
    { kana: 'スタート', romaji: 'sutaato', meaning: '시작' },
    { kana: 'ゴール', romaji: 'gooru', meaning: '골 / 목표' },
  ],
  // 식당 / 메뉴
  [
    { kana: 'メニュー', romaji: 'menyuu', meaning: '메뉴' },
    { kana: 'ランチ', romaji: 'ranchi', meaning: '런치' },
    { kana: 'ディナー', romaji: 'dinaa', meaning: '디너' },
    { kana: 'セット', romaji: 'setto', meaning: '세트' },
    { kana: 'ビュッフェ', romaji: 'byuffe', meaning: '뷔페' },
    { kana: 'レシピ', romaji: 'reshipi', meaning: '레시피' },
    { kana: 'カロリー', romaji: 'karorii', meaning: '칼로리' },
    { kana: 'メニューバー', romaji: 'menyuubaa', meaning: '메뉴바' },
  ],
  // 가전 / 생활 2
  [
    { kana: 'トースター', romaji: 'toosutaa', meaning: '토스터' },
    { kana: 'ミキサー', romaji: 'mikisaa', meaning: '믹서' },
    { kana: 'アイロン', romaji: 'airon', meaning: '다리미' },
    { kana: 'ストーブ', romaji: 'sutoobu', meaning: '난로' },
    { kana: 'ヒーター', romaji: 'hiitaa', meaning: '히터' },
    { kana: 'クーラー', romaji: 'kuuraa', meaning: '냉방기' },
    { kana: 'スイッチ', romaji: 'suicchi', meaning: '스위치' },
    { kana: 'コンセント', romaji: 'konsento', meaning: '콘센트' },
  ],
  // 스포츠 / 취미 4
  [
    { kana: 'スケート', romaji: 'sukeeto', meaning: '스케이트' },
    { kana: 'ボウリング', romaji: 'bouringu', meaning: '볼링' },
    { kana: 'バドミントン', romaji: 'badominton', meaning: '배드민턴' },
    { kana: 'ラグビー', romaji: 'ragubii', meaning: '럭비' },
    { kana: 'ヨット', romaji: 'yotto', meaning: '요트' },
    { kana: 'サイクリング', romaji: 'saikuringu', meaning: '사이클링' },
    { kana: 'トレーニング', romaji: 'toreeningu', meaning: '트레이닝' },
    { kana: 'ストレッチ', romaji: 'sutorecchi', meaning: '스트레칭' },
  ],
  // 음악 / 엔터
  [
    { kana: 'ロック', romaji: 'rokku', meaning: '록 음악' },
    { kana: 'ジャズ', romaji: 'jazu', meaning: '재즈' },
    { kana: 'クラシック', romaji: 'kurashikku', meaning: '클래식' },
    { kana: 'アニメ', romaji: 'anime', meaning: '애니메이션' },
    { kana: 'ドラマ', romaji: 'dorama', meaning: '드라마' },
    { kana: 'アイドル', romaji: 'aidoru', meaning: '아이돌' },
    { kana: 'ライブ', romaji: 'raibu', meaning: '라이브' },
    { kana: 'ステージ', romaji: 'suteeji', meaning: '무대' },
  ],
  // 추상 2
  [
    { kana: 'チェック', romaji: 'chekku', meaning: '체크' },
    { kana: 'プラン', romaji: 'puran', meaning: '계획' },
    { kana: 'メモ', romaji: 'memo', meaning: '메모' },
    { kana: 'コメント', romaji: 'komento', meaning: '코멘트' },
    { kana: 'ポイント', romaji: 'pointo', meaning: '포인트' },
    { kana: 'タイプ', romaji: 'taipu', meaning: '타입' },
    { kana: 'パターン', romaji: 'pataan', meaning: '패턴' },
    { kana: 'バランス', romaji: 'baransu', meaning: '밸런스' },
  ],
  // 음식 4
  [
    { kana: 'ピーマン', romaji: 'piiman', meaning: '피망' },
    { kana: 'キャベツ', romaji: 'kyabetsu', meaning: '양배추' },
    { kana: 'レタス', romaji: 'retasu', meaning: '양상추' },
    { kana: 'トースト', romaji: 'toosuto', meaning: '토스트' },
    { kana: 'オムレツ', romaji: 'omuretsu', meaning: '오믈렛' },
    { kana: 'グラタン', romaji: 'guratan', meaning: '그라탕' },
    { kana: 'カツ', romaji: 'katsu', meaning: '돈가스' },
    { kana: 'コロッケ', romaji: 'korokke', meaning: '고로케' },
  ],
  // 패션 2
  [
    { kana: 'ベスト', romaji: 'besuto', meaning: '조끼' },
    { kana: 'パーカー', romaji: 'paakaa', meaning: '후드티' },
    { kana: 'マフラー', romaji: 'mafuraa', meaning: '목도리' },
    { kana: 'リュック', romaji: 'ryukku', meaning: '백팩' },
    { kana: 'ハンカチ', romaji: 'hankachi', meaning: '손수건' },
    { kana: 'アクセサリー', romaji: 'akusesarii', meaning: '액세서리' },
    { kana: 'イヤリング', romaji: 'iyaringu', meaning: '귀걸이' },
    { kana: 'ネックレス', romaji: 'nekkuresu', meaning: '목걸이' },
  ],
  // 직장 2
  [
    { kana: 'オフィス', romaji: 'ofisu', meaning: '오피스' },
    { kana: 'デスク', romaji: 'desuku', meaning: '책상' },
    { kana: 'スケジュール', romaji: 'sukejuuru', meaning: '스케줄' },
    { kana: 'キャンセル', romaji: 'kyanseru', meaning: '취소' },
    { kana: 'サイン', romaji: 'sain', meaning: '서명' },
    { kana: 'スピーチ', romaji: 'supiichi', meaning: '연설' },
    { kana: 'インタビュー', romaji: 'intabyuu', meaning: '인터뷰' },
    { kana: 'アンケート', romaji: 'ankeeto', meaning: '설문' },
  ],
  // 여행 2
  [
    { kana: 'ツアー', romaji: 'tsuaa', meaning: '투어' },
    { kana: 'フライト', romaji: 'furaito', meaning: '비행편' },
    { kana: 'チェックイン', romaji: 'chekkuin', meaning: '체크인' },
    { kana: 'ロビー', romaji: 'robii', meaning: '로비' },
    { kana: 'フロント', romaji: 'furonto', meaning: '프런트' },
    { kana: 'チップ', romaji: 'chippu', meaning: '팁' },
    { kana: 'オプション', romaji: 'opushon', meaning: '옵션' },
    { kana: 'ルート', romaji: 'ruuto', meaning: '루트' },
  ],
  // 감정 / 추상 3
  [
    { kana: 'ハッピー', romaji: 'happii', meaning: '해피' },
    { kana: 'ラッキー', romaji: 'rakkii', meaning: '럭키' },
    { kana: 'ショック', romaji: 'shokku', meaning: '쇼크' },
    { kana: 'リラックス', romaji: 'rirakkusu', meaning: '릴랙스' },
    { kana: 'プレッシャー', romaji: 'puresshaa', meaning: '압박' },
    { kana: 'モチベーション', romaji: 'mochibeeshon', meaning: '동기' },
    { kana: 'エネルギー', romaji: 'enerugii', meaning: '에너지' },
    { kana: 'パワー', romaji: 'pawaa', meaning: '파워' },
  ],
  // 음식 5
  [
    { kana: 'ホットドッグ', romaji: 'hottodoggu', meaning: '핫도그' },
    { kana: 'フライドチキン', romaji: 'furaidochikin', meaning: '프라이드치킨' },
    { kana: 'カクテル', romaji: 'kakuteru', meaning: '칵테일' },
    { kana: 'スムージー', romaji: 'sumuujii', meaning: '스무디' },
    { kana: 'ミルクティー', romaji: 'mirukutii', meaning: '밀크티' },
    { kana: 'ソーダ', romaji: 'sooda', meaning: '소다' },
    { kana: 'ワッフル', romaji: 'waffuru', meaning: '와플' },
    { kana: 'マフィン', romaji: 'mafin', meaning: '머핀' },
  ],
  // 기기 3
  [
    { kana: 'スマートフォン', romaji: 'sumaatofon', meaning: '스마트폰' },
    { kana: 'タブレット', romaji: 'taburetto', meaning: '태블릿' },
    { kana: 'ヘッドホン', romaji: 'heddohon', meaning: '헤드폰' },
    { kana: 'スピーカー', romaji: 'supiikaa', meaning: '스피커' },
    { kana: 'バッテリー', romaji: 'batterii', meaning: '배터리' },
    { kana: 'ケーブル', romaji: 'keeburu', meaning: '케이블' },
    { kana: 'モニター', romaji: 'monitaa', meaning: '모니터' },
    { kana: 'マイク', romaji: 'maiku', meaning: '마이크' },
  ],
  // 장소 3
  [
    { kana: 'スタジアム', romaji: 'sutajiamu', meaning: '경기장' },
    { kana: 'シアター', romaji: 'shiataa', meaning: '극장' },
    { kana: 'ギャラリー', romaji: 'gyararii', meaning: '갤러리' },
    { kana: 'スタジオ', romaji: 'sutajio', meaning: '스튜디오' },
    { kana: 'センター', romaji: 'sentaa', meaning: '센터' },
    { kana: 'ホール', romaji: 'hooru', meaning: '홀' },
    { kana: 'ロッカー', romaji: 'rokkaa', meaning: '사물함' },
    { kana: 'コーナー', romaji: 'koonaa', meaning: '코너' },
  ],
  // 뷰티 / 패션 3
  [
    { kana: 'メイク', romaji: 'meiku', meaning: '메이크업' },
    { kana: 'クリーム', romaji: 'kuriimu', meaning: '크림' },
    { kana: 'ローション', romaji: 'rooshon', meaning: '로션' },
    { kana: 'リップスティック', romaji: 'rippusutikku', meaning: '립스틱' },
    { kana: 'マニキュア', romaji: 'manikyua', meaning: '매니큐어' },
    { kana: 'ブラシ', romaji: 'burashi', meaning: '브러시' },
    { kana: 'タイツ', romaji: 'taitsu', meaning: '타이츠' },
    { kana: 'ストッキング', romaji: 'sutokkingu', meaning: '스타킹' },
  ],
  // 추상 / 일 3
  [
    { kana: 'テーマ', romaji: 'teema', meaning: '테마' },
    { kana: 'システム', romaji: 'shisutemu', meaning: '시스템' },
    { kana: 'グラフ', romaji: 'gurafu', meaning: '그래프' },
    { kana: 'リスト', romaji: 'risuto', meaning: '리스트' },
    { kana: 'サンプル', romaji: 'sanpuru', meaning: '샘플' },
    { kana: 'コピー', romaji: 'kopii', meaning: '복사' },
    { kana: 'ファックス', romaji: 'fakkusu', meaning: '팩스' },
    { kana: 'スキャン', romaji: 'sukyan', meaning: '스캔' },
  ],
  // 자동차 / 교통 3
  [
    { kana: 'ハンドル', romaji: 'handoru', meaning: '핸들' },
    { kana: 'ブレーキ', romaji: 'bureeki', meaning: '브레이크' },
    { kana: 'エンジン', romaji: 'enjin', meaning: '엔진' },
    { kana: 'タイヤ', romaji: 'taiya', meaning: '타이어' },
    { kana: 'ガレージ', romaji: 'gareeji', meaning: '차고' },
    { kana: 'トンネル', romaji: 'tonneru', meaning: '터널' },
    { kana: 'ハイウェイ', romaji: 'haiwei', meaning: '고속도로' },
    { kana: 'ナンバー', romaji: 'nanbaa', meaning: '번호' },
  ],
  // 디저트 / 간식 3
  [
    { kana: 'スイーツ', romaji: 'suiitsu', meaning: '디저트 / 스위츠' },
    { kana: 'ポテト', romaji: 'poteto', meaning: '감자 / 포테이토' },
    { kana: 'フライドポテト', romaji: 'furaidopoteto', meaning: '감자튀김' },
    { kana: 'マカロン', romaji: 'makaron', meaning: '마카롱' },
    { kana: 'パンケーキ', romaji: 'pankeeki', meaning: '팬케이크' },
    { kana: 'クレープ', romaji: 'kureepu', meaning: '크레이프' },
    { kana: 'タルト', romaji: 'taruto', meaning: '타르트' },
    { kana: 'ゼリー', romaji: 'zerii', meaning: '젤리' },
  ],
  // IT / 통신 3
  [
    { kana: 'ダウンロード', romaji: 'daunroodo', meaning: '다운로드' },
    { kana: 'アップロード', romaji: 'appuroodo', meaning: '업로드' },
    { kana: 'クリック', romaji: 'kurikku', meaning: '클릭' },
    { kana: 'スクロール', romaji: 'sukurooru', meaning: '스크롤' },
    { kana: 'フォルダ', romaji: 'foruda', meaning: '폴더' },
    { kana: 'ウェブ', romaji: 'webu', meaning: '웹' },
    { kana: 'オンライン', romaji: 'onrain', meaning: '온라인' },
    { kana: 'ブログ', romaji: 'burogu', meaning: '블로그' },
  ],
  // 단위 / 수량
  [
    { kana: 'パーセント', romaji: 'paasento', meaning: '퍼센트' },
    { kana: 'グラム', romaji: 'guramu', meaning: '그램' },
    { kana: 'キロ', romaji: 'kiro', meaning: '킬로' },
    { kana: 'メートル', romaji: 'meetoru', meaning: '미터' },
    { kana: 'センチ', romaji: 'senchi', meaning: '센티미터' },
    { kana: 'リットル', romaji: 'rittoru', meaning: '리터' },
    { kana: 'カップ', romaji: 'kappu', meaning: '컵 (계량)' },
    { kana: 'ダース', romaji: 'daasu', meaning: '다스 / 12개' },
  ],
  // 생활용품 3
  [
    { kana: 'ストロー', romaji: 'sutoroo', meaning: '빨대' },
    { kana: 'ナプキン', romaji: 'napukin', meaning: '냅킨' },
    { kana: 'ペットボトル', romaji: 'pettobotoru', meaning: '페트병' },
    { kana: 'バケツ', romaji: 'baketsu', meaning: '양동이' },
    { kana: 'ホース', romaji: 'hoosu', meaning: '호스' },
    { kana: 'スポンジ', romaji: 'suponji', meaning: '스펀지' },
    { kana: 'ペンキ', romaji: 'penki', meaning: '페인트' },
    { kana: 'ドライバー', romaji: 'doraibaa', meaning: '드라이버 (공구)' },
  ],
  // 쇼핑 / 패션 4
  [
    { kana: 'レジ', romaji: 'reji', meaning: '계산대' },
    { kana: 'レシート', romaji: 'reshiito', meaning: '영수증' },
    { kana: 'セール', romaji: 'seeru', meaning: '세일' },
    { kana: 'ブランド', romaji: 'burando', meaning: '브랜드' },
    { kana: 'スーツ', romaji: 'suutsu', meaning: '정장' },
    { kana: 'ハイヒール', romaji: 'haihiiru', meaning: '하이힐' },
    { kana: 'リボン', romaji: 'ribon', meaning: '리본' },
    { kana: 'ベビーカー', romaji: 'bebiikaa', meaning: '유모차' },
  ],
]

/** Core list followed by the independently sourced JLPT expansion. */
export const LOANWORD_ROWS: Kana[][] = [...BASE_LOANWORD_ROWS, ...LOANWORD_EXPANSION_ROWS]

/** All loanwords flattened in teaching order. */
export const LOANWORDS: Kana[] = LOANWORD_ROWS.flat()
