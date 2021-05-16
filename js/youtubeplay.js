var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//iframe player APIコードを非同期で読み込みます。
var player;

function onYouTubeIframeAPIReady() {
    //動画を埋め込む場所を指定(1.のidを入れる)
    player = new YT.Player('yt_player', {
        //YouTUbeの動画IDを入れる
        videoId: 'z4pWvWYcb_I',
        //オプションを設定する場所
        playerVars: {
            playsinline: 1,
            loop: 1,
            listType: 'playlist',
            playlist: 'z4pWvWYcb_I', //上と同じ動画ID_リピートするには入力必須
            rel: 0, // 関連動画の非表示
            controls: 0, // 動画プレーヤーのコントロール非表示
        },

        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

//プレーヤの準備完了後に呼び出す関数
function onPlayerReady(event) {
    event.target.mute(); //ミュートにしないとスマホで再生されない
    event.target.playVideo(); //ビデオを再生
}
var done = false;

function onPlayerStateChange(event) {
    var ytStatus = event.target.getPlayerState();
    if (ytStatus == YT.PlayerState.ENDED) {
        event.target.mute(); //ミュートにしないとスマホで再生されない
        event.target.playVideo(); //ビデオを再生
    }
}

// 上下左右に出てくる黒帯を非表示
var $WIN = $(window); // ブラウザのウインドウを取得する
 
function screen_fit () {
    // 上下左右の縦横比を調節する関数
    const WIN_H = $WIN.height(); // windowの高さを取得
    const WIN_W = $WIN.width(); // windowの幅を取得
    const screen_switch = 0.5625; // youtubeの縦横比16:9=>9/16した値
    const screen_ratio = WIN_H / WIN_W; // windowの高さの値/windowの幅の値
    const ratio_H = WIN_H / screen_switch; // windowの高さ/縦横比の値
    const ratio_W = WIN_W * screen_switch; // windowの幅*縦横比の値

    if (screen_ratio > screen_switch) {
        // windowの高さの値/windowの幅の値>youtubeの縦横比16:9=>9/16した値
        $("#yt_player").css({　//動画を入れる場所のid名入れる
            height: "100%",
            width: ratio_H,
            "margin-top": "0",
            "margin-left": -ratio_H / 2,
            left: "50%",
            top: "0"
        });
    } else {
        $("#yt_player").css({　//APIの場所のid名入れる
            width: "100%",
            height: ratio_W,
            "margin-top": -ratio_W / 2,
            "margin-left": "0",
            top: "50%",
            left: "0"
        });
    }
}

$WIN.on("resize", function () {
   screen_fit();
});

$(function () {
    screen_fit ();
});
