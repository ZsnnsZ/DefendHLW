var EnemyManager = require("enemyManager");
var BulletManager = require("bulletManager");
cc.Class({
    extends: cc.Component,

    properties: {
        enemyManager: EnemyManager,
        bulletManager: BulletManager,
        gameOverMenu: cc.Node,
        coinsLab: cc.Label,
        timeLab: cc.Label,
        bloodLab: cc.Label,
        boshuLab: cc.Label,
        reStartBtn: cc.Button,
        backBtn: cc.Button,
        zhyb: cc.Node,
        ygzzjj: cc.Node,
        ydbygzzjj: cc.Node,
        grandFather: cc.Node,
        enemyLayer: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if(keyCode == cc.KEY.back){
                    cc.director.loadScene('Menu');
                }
            }
        }, this.node);
        B.game = this;
        this.road_path = [cc.p(125,0),cc.p(125,110),cc.p(355,110),cc.p(355,240),cc.p(125,240),cc.p(125,375),cc.p(275,375),cc.p(275,440),cc.p(680,440),cc.p(680,375),cc.p(840,375),cc.p(840,240),cc.p(605,240),cc.p(605,110),cc.p(960,110)];
        this.startGame();
    },

    startGame: function() {
        this.coin = 200;
        this.coinsLab.string = this.coin;
        this.fatherBlood = 10;
        this.bloodLab.string = this.fatherBlood;
        this.time = 30;
        this.timeLab.string = this.time + " s";
        this.boshu = 1;
        this.totalBo = 5;
        this.boshuLab.string = this.boshu + " of " + this.totalBo;
        //开启碰撞
        cc.director.getCollisionManager().enabled = true;
        this.enemyManager.init(this);
        this.bulletManager.init(this);
        this.cannons = this.enemyManager.enemyLayer.getChildren();
        //检测是否产生下一波:1.地图上无怪物 2.到达消灭当前怪物的时间限制
        this.schedule(function(){
            if (this.enemyManager.enemyPool.size() == 5){
                this.time = 30;
                this.nextAttack();
            }
        }, 10);
        this.schedule(function(){
            if (this.time == 0){
                this.time = 30;
                this.nextAttack();
            }
            this.time --;
            this.timeLab.string = this.time + "s";
        }, 1);
    },

    stopGame: function() {
        this.gameOverMenu.active = true;
        cc.director.getCollisionManager().enabled = false;
    },

    backMain: function() {
        cc.director.loadScene("main");
    },

    reStart: function() {
        cc.director.loadScene("wujin");
    },

    gainCoin: function() {
        this.coin += 100;
        this.coinsLab.string = this.coin;
    },

    //检测金币够不够花
    couldBuy: function(coins) {
        if(this.coin - coins >= 0){
            return 1;
        }else{
            return 0;
        }
    },

    downCoin: function(coins) {
        //花费金币(建炮塔、买buff)
        this.coin -= coins;
        this.coinsLab.string = this.coin;
    },
    downFatherBlood: function(){
        this.fatherBlood --;
        if (this.fatherBlood == 0) {
            this.grandFather.color = cc.Color.GRAY;
            this.stopGame();
        }
        this.bloodLab.string = this.fatherBlood;
    },

    nextAttack: function() {
        this.boshu ++;
        if (this.boshu == (this.totalBo/2)) {
            this.ydbygzzjj.active = true;
            this.scheduleOnce(function(){
                this.ydbygzzjj.active = false;
            }, 1);
        }else if (this.boshu == this.totalBo) {
            this.zhyb.active = true;
            this.scheduleOnce(function(){
                this.zhyb.active = false;
            }, 1);
        }else{
            this.ygzzjj.active = true;
            this.scheduleOnce(function(){
                this.ygzzjj.active = false;
            }, 1);
        }
        this.boshuLab.string = this.boshu + " of " + this.totalBo;
        this.schedule(function(){
            this.enemyManager.createEnemy();
        }, 1, 4, 0);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    // },
});
