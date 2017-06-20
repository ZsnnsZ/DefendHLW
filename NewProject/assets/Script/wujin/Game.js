var EnemyPrefabManager = require("enemyPrefabManager");
cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefabManager: EnemyPrefabManager,
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
        this.startGame();
    },

    startGame: function() {
        this.coin = 0;
        this.coinsLab.string = this.coin;
        this.fatherBlood = 10;
        this.bloodLab.string = this.fatherBlood;
        this.time = 30;
        this.timeLab.string = this.time + " s";
        this.boshu = 1;
        this.totalBo = 5;
        this.boshuLab.string = this.boshu + " of " + this.totalBo;

        cc.director.getCollisionManager().enabled = true;
        this.enemyPrefabManager.init(this);
        this.cannons = this.enemyPrefabManager.enemyLayer.getChildren();
        // console.log("ppp"+this.enemyPrefabManager.enemyLayer.getChildren());
        //检测是否产生下一波:1.地图上无怪物 2.到达消灭当前怪物的时间限制
        this.schedule(function(){
            if (this.enemyPrefabManager.enemyPool.size() == 5){
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

    downFatherBlood: function(){
        this.fatherBlood --;
        this.bloodLab.string = this.fatherBlood;
    },

    nextAttack: function() {
        this.boshu ++;
        if (this.boshu == (this.totalBo/2)) {
            this.ydbygzzjj.active = true;//未完成：显示一秒后消失
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
            this.enemyPrefabManager.createEnemy();
        }, 1, 4, 0);
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.fatherBlood == 0) {
            this.grandFather.color = cc.Color.GRAY;
            this.stopGame();
        }
    },
});
