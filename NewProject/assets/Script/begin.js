cc.Class({
    extends: cc.Component,

    properties: {
        storyBoard:cc.Node,
        btnPlay:cc.Node,
        btnStory:cc.Node,
        audioSource:{
            url:cc.AudioClip,
            default:null,
        },
        audioSource1:{
            url:cc.AudioClip,
            default:null,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.audioID = cc.audioEngine.play(this.audioSource, true, 1);
    },

    onBtnStory: function(){
        // cc.audioEngine.pauseAll();
        this.storyBoard.active = true;
        this.btnPlay.active = false;
        this.btnStory.active = false;
    },

    onBtnPlay: function(){
        cc.audioEngine.stop(this.audioID);
        cc.director.loadScene("load");
    },

    onBtnBack:function(){
        cc.audioEngine.play(this.audioSource1, false, 1);//返回按钮音效
        this.storyBoard.active = false;
        this.btnPlay.active = true;
        this.btnStory.active = true;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
