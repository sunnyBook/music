(function ($, root) {
    
    var $scope = $(document.body);

    //渲染歌曲信息
    function renderInfo(info) {
        var html = '<h1 class="song-name">'+info.song+'</h1>' + 
                   '<h3 class="singer-name">'+info.singer+'</h3>' + 
                   '<h3 class="album-name">'+info.album+'</h3>';

        $scope.find('.song-info').html(html);
    }

    //渲染歌曲图片以及高斯模糊
    function renderImage(src) {
        var image = new Image();
        
        image.onload = function () {
            root.blurImg(image, $scope);
            $scope.find(".song-img .img-wrapper img").attr("src",src);
        }

        image.src = src;
    }

    //渲染like-btn
    function renderLikeBtn(isLike) {
        if (isLike) {
            $scope.find('.like-btn').addClass('liked');
        }else {
            $scope.find('.like-btn').removeClass('liked');
        }
    }

    root.render = function (data) {
        renderInfo(data);
        renderImage(data.image);
        renderLikeBtn(data.isLike);
    }
}(window.Zepto, window.player || (window.player = {})))