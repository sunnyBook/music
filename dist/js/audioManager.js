//播放音乐模块

(function($,root) {
	var $scope = $(document.body);
	var AudioManager = function () {
		this.audio = new Audio();
		this.status = 'pause';
		this.bindEvent();
	}

	AudioManager.prototype = {
		bindEvent : function () {
			$(this.audio).on('ended',function() {
				$scope.find('.next-btn').trigger('click');
			})
		},
		play : function () {
			this.audio.play();
			this.status = 'play';
		},
		pause : function () {
			this.audio.pause();
			this.status = 'pause';
		},
		//跳转
		jumpToPlay : function (time) {
			this.audio.currentTime = time;
			this.audio.play();
		},
		setAudioSource : function (src) {
			this.audio.src = src;
			this.audio.load();
		}
	}

	root.AudioManager = AudioManager;
}(window.Zepto,window.player||(window.player = {})))