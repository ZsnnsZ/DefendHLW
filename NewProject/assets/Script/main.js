cc.Class({
    extends: cc.Component,

    properties: {
        bangzhuBoard: cc.Node,
        guanyuBoard: cc.Node,
        wujinBtn: cc.Node,
        xuanguanBtn: cc.Node,
        bangzhuBtn: cc.Node,
        guanyuBtn: cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },
    // 无尽按钮
    onBtnWJ: function () {
        cc.director.loadScene("wujin");
    },
    // 选关按钮
    onBtnXG: function () {
        cc.director.loadScene("xuanguan");
    },
    // 帮助按钮
    onBtnBZ: function () {
        this.bangzhuBoard.active = true;
        this.wujinBtn.active = false;
        this.xuanguanBtn.active = false;
        this.bangzhuBtn.active = false;
        this.guanyuBtn.active = false;
    },
    // 关于按钮
    onBtnGY: function () {
        this.guanyuBoard.active = true;
        this.wujinBtn.active = false;
        this.xuanguanBtn.active = false;
        this.bangzhuBtn.active = false;
        this.guanyuBtn.active = false;
    },
    // 返回按钮
    onBtnBack:function(){
        cc.director.loadScene("main");
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
