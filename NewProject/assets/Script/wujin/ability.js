var State = cc.Enum({
    NONE: 0,
    RED: 1,
    ORANGE: 2,
    YELLOW: 3,
    GREEN: 4,
    CYAN: 5,
    PURPLE: 7,
});

cc.Class({
    extends: cc.Component,

    properties: {
        coins: 100,
        towerLayer: cc.Node,
        parentPos: cc.Vec2,
        abilityLayer: cc.Node,
        state: {
            type: State,
            default: State.NONE,
            visible: false,
        },
        btnNode: cc.Node,
        eventState: 0,
        audioSource:{
            url:cc.AudioClip,
            default:null,
        }

       
    },

    canBuyAbility: function () {
        if (B.game.canBuy(this.coins)) {
            this.getBuff();
        } else {
            return 0;
        }
    },

    // use this for initialization
    getBuff: function () {
        var self = this;
        this.preWeaponBtn = this.btnNode;
        if (self.eventState == 0) {
            self.eventState = 1;
            //给能力子节点添加事件监听
            self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
                cc.audioEngine.play(self.audioSource, false, 1);
                B.game.downCoin(self.coins);
                //选择能力后五秒恢复按钮的状态
                self.btnNode.getComponent("weapon").btnState = 4;
                var preWeaponBtn = self.node.getComponent('ability').preWeaponBtn;
                preWeaponBtn.getComponent("weapon").scheduleOnce(function () {
                    preWeaponBtn.getComponent("weapon").btnState = 2;
                }, B.game.buffTime);
                //获得所有的炮塔子节点
                var tower_children = self.towerLayer.getChildren();
                for (var i = 0; i < tower_children.length; ++i) {
                    var child_pos = tower_children[i].getPosition();
                    var btn_pos = self.parentPos;

                    if (child_pos.x == btn_pos.x && child_pos.y == btn_pos.y) {

                        tower_children[i].color = this.color;
                        tower_children[i].getComponent("tower").state = self.state;
                        // console.log("ability40 "+self.state);
                        tower_children[i].getComponent("tower").scheduleOnce(function () {
                            tower_children[i].color = cc.color(255, 255, 255);
                            tower_children[i].getComponent("tower").state = State.NONE;
                        }, B.game.buffTime);

                        var a_children = self.abilityLayer.getChildren();

                        for (var j = 0; j < a_children.length; ++j) {
                            a_children[j].active = false;
                        }
                        break;
                    }
                }
            })
        }
    }

});