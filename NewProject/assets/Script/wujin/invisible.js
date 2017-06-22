cc.Class({
    extends: cc.Component,

    properties: {
        liuwa:cc.Node,
        visibleState:0,//0表示爷爷为可见状态，1表示爷爷为隐身状态
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, function(event){
            //如果爷爷是正常状态，显示葫芦
            if(self.visibleState == 0){
                self.liuwa.active = true;
            }
        });
    },

});