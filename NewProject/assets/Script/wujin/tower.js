var bulletManager = require("bulletManager");


cc.Class({
    extends: cc.Component,

    properties: {
        attackSpeed: 100,
        bulletPrefab: cc.Prefab,
    },

    init: function(){
        this.enemyLayer = cc.find("Canvas/enemyLayer");
        // this.bulletManager = cc.find("Game/bulletManager");
        this.attack();
    },
    
    //炮塔攻击
    attack: function(){
        //炮塔的位置
        this.start_pos = this.node.getPosition();
        // console.log("tower " + this.start_pos);
        this.schedule(function(){
            this.getBullet();
        }, 100/this.attackSpeed);
    },
    
    // 使用炮塔位置和敌人位置生成一个子弹
    getBullet: function() {
        this.cannon = this.enemyLayer.getChildren();
        // enemy的位置(寻找最短距离enemy)
        var end_pos = this.cannon[0].getPosition();
        // 进行子弹的初始化
        let bullet = B.bulletManager.createBullet();
        bullet.setPosition(this.start_pos);
        bullet.getComponent("bullet").findRoad(this.start_pos, end_pos);
    },

});