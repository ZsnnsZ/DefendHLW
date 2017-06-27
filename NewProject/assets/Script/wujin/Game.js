var EnemyManager = require("enemyManager");
var BulletManager = require("bulletManager");
cc.Class({
    extends: cc.Component,

    properties: {
        enemyManager: EnemyManager,
        bulletManager: BulletManager,
        gameOverMenu: cc.Node,
        setMenu: cc.Node,
        zantingTip: cc.Node,
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
        daojishiLab: cc.Label,
        unlockBuffTip: cc.Node,
        audioEngine:{
            url:cc.AudioClip,
            default:null,
        },
        audioEngine1:{
            url:cc.AudioClip,
            default:null,
        },
        audioEngine2:{
            url:cc.AudioClip,
            default:null,
        },
        audioEngine3:{
            url:cc.AudioClip,
            default:null,
        },
        audioEngine4:{
            url:cc.AudioClip,
            default:null,
        },
        bulletSource0:{
            type:cc.AudioSource,
            default:null
        },
        bulletSource0:{
            type:cc.AudioSource,
            default:null
        },
        bulletSource1:{
            type:cc.AudioSource,
            default:null
        },
        bulletSource2:{
            type:cc.AudioSource,
            default:null
        },
        bulletSource3:{
            type:cc.AudioSource,
            default:null
        },
        bulletSource4:{
            type:cc.AudioSource,
            default:null
        },
        bulletSource5:{
            type:cc.AudioSource,
            default:null
        },
        bulletSource6:{
            type:cc.AudioSource,
            default:null
        },
        enemySource:{
            type:cc.AudioSource,
            default:null
        },
        unlockSource:{
            type:cc.AudioSource,
            default:null
        },
        deadSource:{
            type:cc.AudioSource,
            default:null
        },
        hurtSource:{
            type:cc.AudioSource,
            default:null
        },
        putSource:{
            type:cc.AudioSource,
            default:null
        },
        clickSource:{
            type:cc.AudioSource,
            default:null
        }
    

    },

    // use this for initialization
    onLoad: function () {
        this.audioID = cc.audioEngine.play(this.audioEngine4, true, 1);
        this.shezhiBtn = 0;
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
        //倒计时
        this.daojishi = 3;
        this.daojishiLab.string = this.daojishi;
        // this.startFlag = 0;
        this.schedule(function(){
            this.daojishi --;
            if(this.daojishi == 0){
                this.daojishiLab.string = "开始游戏!";
                // this.startFlag = 1;
            }else{
                this.daojishiLab.string = this.daojishi;
            }
            if(this.daojishi == -1){
                this.daojishiLab.node.active = false;
                // cc.game.resume();
                this.startGame();
            }
        }, 1, 3, 0);
    },

    //开始游戏
    startGame: function() {
        //初始化
        this.score = 0;
        this.scoreLab.string = this.score;
        this.coin = 600;
        this.coinsLab.string = this.coin;
        this.towerCoin = 150;
        this.fatherBlood = 10;
        this.bloodLab.string = this.fatherBlood;
        this.time = 30;
        this.timeLab.string = this.time + " s";
        this.boshu = 1;
        this.perDaBo = 5;
        this.boshuLab.string = this.boshu;

        //每杀死一个敌人获得金币数
        this.getCoin = 80;
        //开启音效
        this.musicFlag = 1;
        //解锁第一个buff的分数
        this.lockScore = 500;
        //解锁的buff个数
        this.buffNum = 1;
        //每波敌人个数
        this.perAttackNum = 4;
        //每个敌人的血量
        this.enemyBlood = 6;
        //每个敌人的初始速度
        this.enemySpeed = 100;
        //Buff持续时间
        this.buffTime = 10;
        //怪物类型
        this.enemyType = 1;
        //开启碰撞
        cc.director.getCollisionManager().enabled = true;
        this.enemyManager.init(this);
        this.bulletManager.init(this);
        this.cannons = this.enemyManager.enemyLayer.getChildren();

        //检测是否产生下一波:1.地图上无怪物 2.到达消灭当前怪物的时间限制
        this.schedule(function(){
            if (this.enemyManager.enemyPool.size() == 15 && this.enemyManager.enemyPool2.size() == 15){
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
        this.clickSource.play();
        cc.audioEngine.play(this.audioEngine3, false, 1);
        this.gameOverMenu.active = true;
        cc.director.getCollisionManager().enabled = false;
    },

    //退出游戏
    onBtnExit: function() {
        this.clickSource.play();
        cc.game.end();
    },

    //设置
    onBtnSet: function() {
        this.clickSource.play();
        if(this.shezhiBtn == 0){
            this.setMenu.active = true;
            this.shezhiBtn = 1
        } else {
            this.setMenu.active = false;
            this.shezhiBtn = 0
        }
    },

    //背景音乐
    onBtnOffMusic: function(){
        if(this.musicFlag == 1){
            this.musicFlag = 0;
            cc.audioEngine.pauseAll();
        }else{
            this.musicFlag = 1;
            cc.audioEngine.resumeAll();
        }
        this.setMenu.active = false;
    },

    //回到主界面
    backMain: function() {
        this.clickSource.play();
        cc.game.resume();
        cc.audioEngine.stop(this.audioID);
        cc.director.loadScene("main");
    },

    //重新开始
    reStart: function() {
        this.clickSource.play();
        cc.game.resume();
        cc.audioEngine.stop(this.audioID);
        cc.director.loadScene("wujin");
    },

    //暂停游戏
    onBtnPauseGame: function() {
        this.clickSource.play();
        this.zantingTip.active = true;
        cc.game.pause();
        this.setMenu.active = false;
    },

    //继续游戏
    onBtnGoon:function(){
        this.clickSource.play();
        this.zantingTip.active = false;
        cc.game.resume();
        this.setMenu.active = false;
    },

    //获得金币
    gainCoin: function() {
        this.coin += this.getCoin;
        this.coinsLab.string = this.coin;
    },

    //获得分数
    gainScore: function() {
        this.score += this.getCoin;
        this.scoreLab.string = this.score;
        if(this.score > this.lockScore ){
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
        this.unlockSource.play();
        if(this.buffNum < 6){
            this.unlockBuffTip.active = true;
            this.scheduleOnce(function(){
                this.unlockBuffTip.active = false;
            }, 1); 
            //cc.audioEngine.play(this.audioEngine, false, 1);
            this.buffNum ++;
        }
        if(this.perAttackNum < 9){
            this.perAttackNum ++;
        }
    },

    //花费金币
    downCoin: function(coins) {
        this.coin -= coins;
        this.coinsLab.string = this.coin;
    },

    //减少爷爷的血
    downFatherBlood: function(){
        this.fatherBlood --;
        //cc.audioEngine.play(this.audioEngine2, false, 1);
        this.hurtSource.play();
        if (this.fatherBlood == 0) {
            this.grandFather.color = cc.Color.GRAY;
            //cc.audioEngine.play(this.audioEngine1, false, 1);
            this.deadSource.play();
            this.stopGame();
        }
        this.bloodLab.string = this.fatherBlood;
    },

    //产生下一波怪物
    nextAttack: function() {
        this.boshu ++;
        this.boshuLab.string = this.boshu;
        //每波切换怪物种类
        this.enemyType = 3 - this.enemyType;
        var tempAttackNum = this.perAttackNum;
        if(this.getCoin <= 130){
            this.getCoin += 5; 
        }
        if(this.enemyBlood <= 27) {
            this.enemyBlood += 3;
        }
        if(this.enemySpeed <= 200) {
            this.enemySpeed += 10;
        }
        if (this.boshu % this.perDaBo == 0) {
            //临时将怪物数量增加为1.5倍
            this.perAttackNum = this.perAttackNum + this.perAttackNum/2;
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
        // console.log("enemyNum: "+this.perAttackNum);
        this.schedule(function(){
            this.enemyManager.createEnemy(this.enemyType);
        }, 1, this.perAttackNum, 0);
        this.perAttackNum = tempAttackNum;
    },

});
