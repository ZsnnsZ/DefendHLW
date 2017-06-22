var EnemyManager = require("enemyManager");
var BulletManager = require("bulletManager");
cc.Class({
    extends: cc.Component,

    properties: {
        enemyManager: EnemyManager,
        bulletManager: BulletManager,
        gameOverMenu: cc.Node,
        scoreLab: cc.Label,
        coinsLab: cc.Label,
        timeLab: cc.Label,
        bloodLab: cc.Label,
        boshuLab: cc.Label,
        reStartBtn: cc.Button,
        backBtn: cc.Button,
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
                    cc.director.loadScene('main');
                }
            }
        }, this.node);
        B.game = this;
        this.road_path = [cc.p(125,0),cc.p(125,110),cc.p(355,110),cc.p(355,240),cc.p(125,240),cc.p(125,375),cc.p(275,375),cc.p(275,440),cc.p(680,440),cc.p(680,375),cc.p(840,375),cc.p(840,240),cc.p(605,240),cc.p(605,110),cc.p(960,110)];
        this.startGame();
    },

    //开始游戏
    startGame: function() {
        //初始化
        this.score = 0;
        this.scoreLab.string = this.score;
        this.coin = 500;
        this.coinsLab.string = this.coin;
        this.fatherBlood = 10;
        this.bloodLab.string = this.fatherBlood;
        this.time = 30;
        this.timeLab.string = this.time + " s";
        this.boshu = 1;
        this.perDaBo = 5;
        this.boshuLab.string = this.boshu;


        this.lockScore = 500;
        //解锁的buff个数
        this.buffNum = 1;
        //每波敌人个数
        this.perAttackNum = 4;
        this.enemyBlood = 10;
        this.enemySpeed = 100;
        //开启碰撞
        cc.director.getCollisionManager().enabled = true;
        this.enemyManager.init(this);
        this.bulletManager.init(this);
        this.cannons = this.enemyManager.enemyLayer.getChildren();

        //检测是否产生下一波:1.地图上无怪物 2.到达消灭当前怪物的时间限制
        this.schedule(function(){
            if (this.enemyManager.enemyPool.size() == 10){
                this.time = 30;
                this.nextAttack();
            }
        }, 5);
        this.schedule(function(){
            if (this.time == 0){
                this.time = 30;
                this.nextAttack();
            }
            this.time --;
            this.timeLab.string = this.time + "s";
        }, 1);
    },

    //停止游戏
    stopGame: function() {
        this.gameOverMenu.active = true;
        cc.director.getCollisionManager().enabled = false;
    },

    //回到主界面
    backMain: function() {
        cc.director.loadScene("main");
    },

    //重新开始
    reStart: function() {
        cc.director.loadScene("wujin");
    },

    //获得金币
    gainCoin: function() {
        this.coin += 100;
        this.coinsLab.string = this.coin;
    },

    //获得分数
    gainScore: function() {
        this.score += 100;
        this.scoreLab.string = this.score;
        if(this.score / this.lockScore == 1){
            this.unlockBuff();
            this.lockScore = this.lockScore * 2;
        }
    },

    //检测金币够不够花
    canBuy: function(coins) {
        if(this.coin - coins >= 0){
            return 1;
        }else{
            return 0;
        }
    },

    //解锁buff，增加每波敌人数
    unlockBuff: function() {
        this.buffNum ++;
        this.perAttackNum ++;
    },

    //花费金币(建炮塔)
    downCoin: function(coins) {
        this.coin -= coins;
        this.coinsLab.string = this.coin;
    },

    //花费金币(买buff)

    //减少爷爷的血
    downFatherBlood: function(){
        this.fatherBlood --;
        if (this.fatherBlood == 0) {
            this.grandFather.color = cc.Color.GRAY;
            this.stopGame();
        }
        this.bloodLab.string = this.fatherBlood;
    },

    //产生下一波怪物
    nextAttack: function() {
        this.boshu ++;
        if(this.enemyblood <= 20) {
            this.enemyblood ++;
        }
        if(this.enemySpeed <= 200) {
            this.enemySpeed += 10;
        }
        if (this.boshu % this.perDaBo == 0) {
            this.ydbygzzjj.active = true;
            this.scheduleOnce(function(){
                this.ydbygzzjj.active = false;
            }, 1);
        }else{
            this.ygzzjj.active = true;
            this.scheduleOnce(function(){
                this.ygzzjj.active = false;
            }, 1);
        }
        this.boshuLab.string = this.boshu;
        this.schedule(function(){
            this.enemyManager.createEnemy();
        }, 1, this.perAttackNum, 0);
    },

});
