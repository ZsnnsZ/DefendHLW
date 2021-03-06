cc.Class({
    extends: cc.Component,

    properties: {
        top: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        var minOpacity = 0;
        var timeIn = 20;
        this.schedule(function(){
            timeIn--;
            this.top.opacity = minOpacity + Math.floor(0.08*(255-minOpacity));
            minOpacity = this.top.opacity;
            if(timeIn===0){
                cc.director.loadScene('main');
            }
        },0.05);
        cc.director.preloadScene('main', function () {
            cc.log('Next scene preloaded');
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    // },
});
