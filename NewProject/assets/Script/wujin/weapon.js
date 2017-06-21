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
        var self = this;
        //监听事件
        self.node.on(cc.Node.EventType.TOUCH_START, function(event){//MOUSE_DOWN
            if(self.btnState == 0){
                // 显示+号
                self.btnPlus.active = true;
                self.btnState = 1;
            } else if(self.btnState == 1){
                // 放置一个炮塔
               
                if (B.game.couldBuy(self.coins)){
                    B.game.downCoin(self.coins);
                    let tower = null;
                    self.btnPlus.active = false;
                    tower = cc.instantiate(self.towerPrefab);
                    self.towerLayer.addChild(tower);
                    tower.setPosition(self.node.getPosition());
                    self.btnState = 2;
                    tower.getComponent('tower').init();
                }else{
                    self.btnPlus.active = false;
                    self.btnState = 0;
                }
            } else if(self.btnState == 2){
            // buff
            //按钮为武器塔状态时的点击状态2

                //获取btn的position
                var btn_pos = self.node.getPosition();
            
                //能力位置偏移量
                var ability_poss = [cc.p(-60,60), cc.p(0,60),cc.p(60,60),cc.p(-60,-60),cc.p(0,-60),cc.p(60,-60)];

                //颜色数组
                var colors = [cc.color(255,0,0),cc.color(238,80,5),cc.color(248,229,5),
                cc.color(0,255,0), cc.color(5,248,161),cc.color(248,5,219)];
              
                //获得所有的能力子节点
                self.abilityLayer = cc.find("Canvas/abilityLayer");
                var a_children = self.abilityLayer.getChildren();

                //显示所有的能力子节点
                for(var i = 0; i < a_children.length; i++){

                    a_children[i].active = true;
                    a_children[i].setPosition(cc.p(btn_pos.x+ability_poss[i].x, btn_pos.y+ability_poss[i].y));
                    a_children[i].color = colors[i];
                    a_children[i].getComponent('ability').parentPos = self.node.getPosition();

                }

                //将按钮状态置为能力状态3
                self.btnState = 3;
            }
        });

        
        //
    
    },
    createEnemy:function(){

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});