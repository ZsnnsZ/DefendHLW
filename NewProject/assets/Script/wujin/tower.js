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
        attackSpeed: 100,
        attackDst: 200,
        bulletPrefab: cc.Prefab,
        state: {
            type: State,
            default: State.NONE,
            visible: false,
        },

    },

    init: function () {
        this.enemyLayer = cc.find("Canvas/enemyLayer");
        this.attack();
    },

    //炮塔攻击
    attack: function () {
        //炮塔的位置
        this.start_pos = this.node.getPosition();
        this.schedule(function () {
            switch (this.state) {
                case 0://还原炮塔发射子弹的速度和攻击距离
                    this.attackSpeed = 100;
                    this.attackDst = 200;
                    break;
                case 2://攻击距离加倍
                    this.attackDst = 400;
                    break;
                case 7://攻击速度加倍
                    this.attackSpeed = 1000;
            }
            this.getBullet();
        }, 100 / this.attackSpeed);

    },

    // 使用炮塔位置和敌人位置生成一个子弹
    getBullet: function () {
        var cannons = this.enemyLayer.getChildren();
        // enemy的位置(寻找最短距离enemy)
        // var end_pos = cannon[0].getPosition();
        var minDst = 1000;
        var tempDst = 0;
        var end_pos = cc.Vec2();
        for (var i = 0; i < cannons.length; ++i) {
            tempDst = cc.pLength(cc.pSub(this.start_pos, cannons[i].getPosition()));
            // console.log("tempDst " + tempDst);
            if (tempDst < minDst) {
                minDst = tempDst;
                end_pos = cannons[i].getPosition();
            }
        }
        // console.log("minDst " + minDst);
        // console.log("attackDst " + this.attackDst);
        if (minDst <= this.attackDst) {
            // 进行子弹的初始化
            let bullet = B.bulletManager.createBullet();
            bullet.setPosition(this.start_pos);
            bullet.getComponent("bullet").findRoad(this.start_pos, end_pos, this.state);
        }

    },

});