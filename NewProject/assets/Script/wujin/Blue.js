cc.Class({
    extends: cc.Component,

    properties: {
        parentNode: cc.Node,
        coins: 300,
    },

    // use this for initialization
    onLoad: function () {
        this.goldLess = cc.find("Canvas/goldLess");
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (B.game.canBuy(self.coins)) {
                //消耗金币
                B.game.downCoin(self.coins);
                self.parentNode.opacity = 100;
                self.parentNode.getComponent(cc.PolygonCollider).tag = 1000;
                self.parentNode.getComponent('invisible').visibleState = 1;
               
                self.parentNode.getComponent('invisible').scheduleOnce(function () {
                    self.parentNode.opacity = 255;
                    self.parentNode.getComponent(cc.PolygonCollider).tag = 222;
                    self.parentNode.getComponent('invisible').visibleState = 0;
                }, 3);
            } else {
                if(B.game.daojishi == -1){
                    self.goldLess.opacity = 255;
                    var action = cc.fadeTo(1, 0);
                    self.goldLess.runAction(action);
                }
            }
            self.parentNode.getComponent('invisible').blueState = 0;
            self.node.active = false;
        });
    },

});