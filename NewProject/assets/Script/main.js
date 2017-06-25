cc.Class({
    extends: cc.Component,

    properties: {
        bangzhuBoard: cc.Node,
        guanyuBoard: cc.Node,
        playBtn: cc.Node,
        bangzhuBtn: cc.Node,
        guanyuBtn: cc.Node,
        audioSource:{
            url:cc.AudioClip,
            default:null,
        },
        audioSource1:{
            url:cc.AudioClip,
            default:null,
        },
        audioSource2:{
            url:cc.AudioClip,
            default:null,
        }

        
    },

    // use this for initialization
    onLoad: function () {
        this.audioID = cc.audioEngine.play(this.audioSource, true, 1);
    },
    // 开始游戏
    onBtnPlay: function () {
        cc.audioEngine.play(this.audioSource1, false, 1);
        cc.audioEngine.stop(this.audioID);
        cc.director.loadScene("wujin");
    },

    // 帮助按钮
    onBtnBZ: function () {
        cc.audioEngine.play(this.audioSource1, false, 1);
        this.bangzhuBoard.active = true;
        this.playBtn.active = false;
        this.bangzhuBtn.active = false;
        this.guanyuBtn.active = false;
    },
    // 关于按钮
    onBtnGY: function () {
        cc.audioEngine.play(this.audioSource1, false, 1);
        this.guanyuBoard.active = true;
        this.playBtn.active = false;
        this.bangzhuBtn.active = false;
        this.guanyuBtn.active = false;
    },
    // 返回按钮
    onBtnBack:function(){
        cc.audioEngine.play(this.audioSource2, false, 1);
        this.guanyuBoard.active = false;
        this.bangzhuBoard.active = false;
        this.playBtn.active = true;
        this.bangzhuBtn.active = true;
        this.guanyuBtn.active = true;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
