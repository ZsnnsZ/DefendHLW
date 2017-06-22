cc.Class({
    extends: cc.Component,

    properties: {
        parentNode:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, function(event){
            //消耗金币
            B.game.coin -= 200;
            B.game.coinsLab.string = B.game.coin;

            self.parentNode.opacity = 100;
            self.parentNode.getComponent(cc.PolygonCollider).tag = 1000;
            self.parentNode.getComponent('invisible').visibleState = 1;
            self.node.active = false;
            self.parentNode.getComponent('invisible').scheduleOnce(function(){
                self.parentNode.opacity = 255;
                self.parentNode.getComponent(cc.PolygonCollider).tag = 222;
                self.parentNode.getComponent('invisible').visibleState = 0;
            }, 3);
           
        });
    },
  
});