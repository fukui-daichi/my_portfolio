/*===========================================================*/
/* ハンバーガーメニューの開閉 */
/*===========================================================*/
$(".header__openbtn").click(function () {
  $(this).toggleClass('active');
  $('.header__nav').toggleClass('active');
  $('body').toggleClass('noscroll');
});

/*===========================================================*/
/* スクロール途中でヘッダーが消え、上にスクロールすると復活 */
/*===========================================================*/
var beforePos = 0; //スクロールの値の比較用の設定
//スクロール途中でヘッダーが消え、上にスクロールすると復活する設定を関数にまとめる
function ScrollAnime() {
  var elemTop = $('.works').offset().top; //#serviceの位置まできたら
  var scroll = $(window).scrollTop();
  //ヘッダーの出し入れをする
  if (scroll == beforePos) {
    //IE11対策で処理を入れない
  } else if (elemTop > scroll || 0 > scroll - beforePos) {
    //ヘッダーが上から出現する
    $('.header').removeClass('UpMove'); //.headerにUpMoveというクラス名を除き
    $('.header').addClass('DownMove'); //.headerにDownMoveのクラス名を追加
  } else {
    //ヘッダーが上に消える
    $('.header').removeClass('DownMove'); //.headerにDownMoveというクラス名を除き
    $('.header').addClass('UpMove'); //.headerにUpMoveのクラス名を追加
  }
  beforePos = scroll; //現在のスクロール値を比較用のbeforePosに格納
}


/*===========================================================*/
/* ゆっくりズームアウトさせながら全画面で見せる */
/*===========================================================*/
//Vegas全体の設定
$('#slider').vegas({
  overlay: 'https://cdnjs.cloudflare.com/ajax/libs/vegas/2.4.0/overlays/03.png', //画像の上にオーバーレイパターン画像を指定適用。
  transition: 'blur', //切り替わりのアニメーション。http://vegas.jaysalvat.com/documentation/transitions/参照。fade、fade2、slideLeft、slideLeft2、slideRight、slideRight2、slideUp、slideUp2、slideDown、slideDown2、zoomIn、zoomIn2、zoomOut、zoomOut2、swirlLeft、swirlLeft2、swirlRight、swirlRight2、burnburn2、blurblur2、flash、flash2が設定可能。
  transitionDuration: 2000, //切り替わりのアニメーション時間をミリ秒単位で設定
  delay: 10000, //スライド間の遅延をミリ秒単位で。
  animationDuration: 15000, //スライドアニメーション時間をミリ秒単位で設定
  animation: 'kenburns', //スライドアニメーションの種類。http://vegas.jaysalvat.com/documentation/transitions/参照。kenburns、kenburnsUp、kenburnsDown、kenburnsRight、kenburnsLeft、kenburnsUpLeft、kenburnsUpRight、kenburnsDownLeft、kenburnsDownRight、randomが設定可能。
  slides: [
    {
      src: './images/main-bg01.webp'
    }, {
      src: './images/main-bg04.webp'
    }, {
      src: './images/main-bg03.webp'
    }
  ], //画像設定を読む
  timer: false, //プログレスバー非表示
});

/*===========================================================*/
/* スクロールに合わせて画像を拡大縮小 */
/*===========================================================*/
function fadeAnime(){
  $('.zoomOutTrigger').each(function(){ //zoomOutTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('zoomOut');// 画面内に入ったらzoomOutというクラス名を追記
		}else{
		$(this).removeClass('zoomOut');// 画面外に出たらzoomOutというクラス名を外す
		}
  });	
}


/*===========================================================*/
/* 関数の実行 */
/*===========================================================*/
// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  ScrollAnime(); //機能編 5-1-9スクロール途中でヘッダーが消え、上にスクロールすると復活の関数を呼ぶ
  fadeAnime();/* アニメーション用の関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  $("#splash-logo").delay(1200).fadeOut('slow'); //ロゴを1.2秒でフェードアウトする記述
  //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
  $("#splash").delay(1500).fadeOut('slow', function () { //ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述    
    $('body').addClass('appear'); //フェードアウト後bodyにappearクラス付与
    ScrollAnime(); //機能編 5-1-9スクロール途中でヘッダーが消え、上にスクロールすると復活の関数を呼ぶ
  });
});