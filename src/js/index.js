var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var dataUrl = '/mock/data.json';
var render = root.render;
var controlManager;
var audioManager = new root.AudioManager();
var songList;
var procressor = root.procressor;

var playlist = root.playList;


//绑定touch事件

function bindTouch() {
    $slidePoint = $scope.find('.slide-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $slidePoint.on('touchstart',function () {
        procressor.stop();
    }).on('touchmove',function (e) {
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width; 
        if (percentage < 0 || percentage > 1) {
            percentage = 0;
        }
        procressor.update(percentage);
    }).on('touchend',function (e) {
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width; 
        if (percentage < 0 || percentage > 1) {
            percentage = 0;
        }
        var index = controlManager.index;
        var curData = songList[index];
        var currenttime = curData.duration * percentage;
        procressor.start(percentage);
        audioManager.jumpToPlay(currenttime);
        $scope.find('.play-btn').addClass('playing');
        audioManager.status = 'play';
    })
}


$scope.on('play:change', function(event,index,flag){
    var curData = songList[index];
    render(curData);
    audioManager.setAudioSource(curData.audio);
    playlist.signSong(controlManager.index);
    if (audioManager.status == 'play' || flag) {
        audioManager.play();
        procressor.start();
    }
    procressor.render(curData.duration);
    procressor.update(0);
});


$scope.on('click', '.prev-btn', function () {
    var index = controlManager.prev();
    $scope.trigger('play:change',index);
});

$scope.on('click', '.next-btn', function () {
    var index = controlManager.next();
    $scope.trigger('play:change',index);
});

//点击播放按钮
$scope.on('click','.play-btn',function(){
    if (audioManager.status === 'play') {
        audioManager.pause();
        procressor.stop();
    }else {
        audioManager.play();
        procressor.start();
    }
    $(this).toggleClass('playing');
});



//点击列表按钮
$scope.on('click','.list-btn',function () {
    playlist.show(controlManager);
});

function successCallback (data) {
    songList = data;
    playlist.render(data);
    controlManager =  new root.ControlManager(data.length);
    $scope.trigger('play:change',0);
    bindTouch();
}


function getData (url, callback) {
    $.ajax({
        url:url,
        type:'GET',
        success:callback,
        error:function () {
            console.log(error);
        }
    });
}


getData(dataUrl,successCallback);