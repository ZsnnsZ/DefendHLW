cc.Class({
    extends: cc.Component,

    properties: {
        storyMenu:cc.Node.Node,
    },

    // use this for initialization
    onLoad: function () {

    },

    onBtnStory: function(){
        this.storyMenu = true;
    },

    onBtnPlay: function(){
        cc.director.loadScene("load");
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
