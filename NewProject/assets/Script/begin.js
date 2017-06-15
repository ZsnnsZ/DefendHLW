cc.Class({
    extends: cc.Component,

    properties: {
        storyBoard:cc.Node,
        btnPlay:cc.Node,
        btnStory:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },

    onBtnStory: function(){
        this.storyBoard.active = true;
        this.btnPlay.active = false;
        this.btnStory.active = false;
    },

    onBtnPlay: function(){
        cc.director.loadScene("load");
    },

    onBtnBack:function(){
        cc.director.loadScene("begin");
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
