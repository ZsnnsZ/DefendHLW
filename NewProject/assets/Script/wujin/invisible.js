cc.Class({
    extends: cc.Component,

    properties: {
        liuwa:cc.Node,
        visibleState:0,//0表示爷爷为可见状态，1表示爷爷为隐身状态
        blueState:0,//0表示蓝葫芦不可见，1表示蓝葫芦可见
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, function(event){
            //如果爷爷是正常状态，显示葫芦
            if(self.visibleState == 0 && self.blueState == 0){
                console.log("隐身");
                self.liuwa.active = true;
                self.blueState = 1;
            } else if(self.visibleState == 0 && self.blueState == 1){
                self.liuwa.active = false;
                self.blueState = 0;
            }
        }); 
    },

});