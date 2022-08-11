// ハンバーガーメニューの開閉
$(".header__openbtn").click(function () {
  $(this).toggleClass('active');
  $('.header__nav').toggleClass('active');
  $('body').toggleClass('noscroll');
});
// #about、#worksをクリックするとメニューを閉じる
$(".about-sp, .works-sp").click(function () {
  $(".header__openbtn").removeClass('active');
  $('.header__nav').removeClass('active');
});

// SVGアニメーションの描画
var stroke;
  stroke = new Vivus('mask', { //アニメーションをするIDの指定
  start:'manual', //自動再生をせずスタートをマニュアルに
  type: 'scenario-sync', // アニメーションのタイプを設定
  duration: 140, //アニメーションの時間設定。数字が小さくなるほど速い
  forceRender: false, //パスが更新された場合に再レンダリングさせない
  animTimingFunction:Vivus.EASE, //動きの加速減速設定
});

// メニュークリック時のスクロール設定
$('a[href*="#"]').click(function () { //全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK
  var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
  var pos = $(elmHash).offset().top-90; //idの上部の距離からHeaderの高さを引いた値を取得
  $('body,html').animate({scrollTop: pos}, 1000, 'easeOutCirc'); //取得した位置にスクロール。
  return false;
});

// プロフィール
$(function(){
  var inputs = $('.input');
  var paras = $('.description-flex-container').find('p');
  inputs.click(function(){
    var t = $(this),
        ind = t.index(),
        matchedPara = paras.eq(ind);
    t.add(matchedPara).addClass('active');
    inputs.not(t).add(paras.not(matchedPara)).removeClass('active');
  });
});

// タブメニューの操作
$(function () {
  //////////// 一番目以外のコンテンツは非表示
  $(".works__inner:not(:first-of-type)").css("display", "none");
  //////////// タブの制御
  $('.tab').on('click', function () { // タブメニューをhoverしたら
    var index = $('.tab').index(this); // hoverしたタブ番号を取得
    $('.tab').removeClass('current'); // タブ現在地クラスを削除し、
    $(this).addClass('current'); // hoverしたタブにタブ現在地クラスを付与
    //////////// コンテンツの制御
    $('.works__inner').hide().eq(index).fadeIn();
  });
});


// 画面を読み込んだ際の処理
$(window).on('load',function(){

  $("#splash").delay(1000).fadeOut('slow', function () { //ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述
    $('body').addClass('appear'); //フェードアウト後bodyにappearクラス付与
    var h = $(window).height(); //ブラウザの高さを取得
    $(".splashbg").css({
      "border-width": h, //ボーダーの太さにブラウザの高さを代入
      "animation-name": "backBoxAnime" //animation-nameを定義
    });
  });
  $("#splash-logo").delay(800).fadeOut('slow'); //ロゴを1.2秒でフェードアウトする記述

  //SVGアニメーションの実行
  setTimeout(() => {
    stroke.play()
  }, 2100);
});