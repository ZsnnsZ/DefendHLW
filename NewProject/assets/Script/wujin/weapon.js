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
        towerPrefab: cc.Prefab,
        btnState: 0,
        btnPlus: cc.Node,
        towerLayer: cc.Node,
        coins: 100,
    },

    // use this for initialization
    onLoad: function () {
        this.weaponLayer = cc.find("Canvas/weaponLayer");
        this.abilityLayer = cc.find("Canvas/abilityLayer");

        //设置能力字节点的颜色
        this.setColor();

        var self = this;
        //监听事件
        self.node.on(cc.Node.EventType.TOUCH_START, function(event){//MOUSE_DOWN
            if(self.btnState == 0){
                // 显示所有可以放置炮塔的btn
                self.showAllBtn(self);
                //隐藏能力子节点
                self.hideAllAbility(self);
            } else if(self.btnState == 1){
                // 放置一个炮塔              
                if (B.game.canBuy(self.coins)){
                    B.game.downCoin(self.coins);
                    let tower = null;
                    self.btnPlus.active = false;
                    tower = cc.instantiate(self.towerPrefab);
                    self.towerLayer.addChild(tower);
                    tower.setPosition(self.node.getPosition());
                    self.btnState = 2;
                    tower.getComponent('tower').init();
                }
                //隐藏其它按钮
                self.hideAllWeaponBtn(self);
            } else if(self.btnState == 2){
                // buff
                //显示buff列表，选择buff后进入ability中的事件监听
                self.showAllAbility(self);
                self.hideAllWeaponBtn(self);
                //将按钮状态置为buff等待选择状态
                self.btnState = 3;
            }else if (self.btnState == 3){
                //没有选择buff则返回状态2
                self.hideAllAbility(self);
                self.hideAllWeaponBtn(self);
                self.btnState = 2;
            }else if(self.btnState == 4) {
                self.hideAllAbility(self);
                self.hideAllWeaponBtn(self);
            }

        });

    },

    hideAllAbility:function (self) {
        //获得所有的能力子节点
        var a_children = self.abilityLayer.getChildren();
        //隐藏所有的能力子节点
        for (var i = 0; i < a_children.length; i++) {
            a_children[i].active = false;
        }
    },

    showAllAbility: function (self) {
        //获取btn的position
        var btn_pos = self.node.getPosition();

        //能力位置偏移量
        var ability_poss = [cc.p(-60, 60), cc.p(0, 60), cc.p(60, 60), cc.p(-60, -60), cc.p(0, -60), cc.p(60, -60)];
        var states = [State.RED, State.ORANGE, State.YELLOW, State.GREEN, State.CYAN, State.PURPLE]           
        //获得所有的能力子节点
        var a_children = self.abilityLayer.getChildren();

        //显示所有的能力子节点
        for (var i = 0; i < B.game.buffNum; i++) {
            a_children[i].active = true;

            //对边界上的能力子节点的位置进行处理
            if(btn_pos.x < -400){
                a_children[i].setPosition(cc.p(btn_pos.x + ability_poss[i].x+60, btn_pos.y + ability_poss[i].y));
            } else if (btn_pos.x > 400){
                a_children[i].setPosition(cc.p(btn_pos.x + ability_poss[i].x-60, btn_pos.y + ability_poss[i].y));
            } else {
                a_children[i].setPosition(cc.p(btn_pos.x + ability_poss[i].x, btn_pos.y + ability_poss[i].y));
            }
            a_children[i].getComponent("ability").state = states[i];
            a_children[i].getComponent('ability').parentPos = self.node.getPosition();
            a_children[i].getComponent('ability').btnNode = self.node;

        }
    },

    //设置子节点颜色
    setColor: function () {
        //颜色数组
        var colors = [cc.color(255, 0, 0), cc.color(238, 80, 5), cc.color(248, 229, 5),
        cc.color(0, 255, 0), cc.color(5, 248, 161), cc.color(248, 5, 219)];

        var a_children = this.abilityLayer.getChildren();
        for (var i = 0; i < a_children.length; i++) {
            a_children[i].color = colors[i];
        }
    },

    //显示可以安装武器塔的按钮
    showAllBtn: function (node) {
        var children = node.weaponLayer.getChildren();
        var tempNode = null;
        for (var i = 0; i < children.length; i++) {
            tempNode = children[i].getComponent('weapon');
            if (tempNode.btnState == 0) {
                tempNode.btnPlus.active = true;
                tempNode.btnState = 1;
            }
        }
    },

    //隐藏可以安装武器塔的按钮
    hideAllWeaponBtn: function (node) {
        var children = node.weaponLayer.getChildren();
        var tempNode = null;
        for (var i = 0; i < children.length; i++) {
            tempNode = children[i].getComponent('weapon');
            if (tempNode.btnState == 1) {
                tempNode.btnPlus.active = false;
                tempNode.btnState = 0;
            }
        }
    },

});