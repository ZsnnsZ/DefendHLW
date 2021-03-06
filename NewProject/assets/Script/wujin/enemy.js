var State = cc.Enum({
    NONE:0,
    WALK:1,
    DEAD:2,
});

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 100,
        blood: 6,
        state: {
            type:State,
            default:State.NONE,
            visible:false,
        },
        bloodBar: cc.ProgressBar,

    },

    // use this for initialization
    init: function(game) {
        this.game = game;
        this.state = State.WALK;
        this.speed = B.game.enemySpeed;
        this.blood = B.game.enemyBlood;
        this.findRoad();
    },

    findRoad: function() {
        this.roadset = this.game.road_path;
        // console.log(this.roadset);
        // console.log(this.roadset[0].x);
        //只有一个点直接return
        if(this.roadset.length < 2){
            return;
        }

        this.node.x = this.roadset[0].x-480;    
        this.node.y = this.roadset[0].y-270;
        //下个点的索引
        this.next_step = 1;
        this.state = State.NONE;
        this.walkNext();
    },

    walkNext: function() {
        if(this.next_step >= this.roadset.length){
            this.state = State.DEAD;
            this.enemyToPool();
            return;
        }

        this.state = State.WALK;
        var start_pos = this.node.getPosition();
        // console.log(start_pos.x);
        var dst_pos = cc.p(this.roadset[this.next_step]);
        dst_pos.x -= 480;
        dst_pos.y -= 270;
        //两个向量的差
        var dir = cc.pSub(dst_pos,start_pos);
        //dir的长度
        var len = cc.pLength(dir);

        //x方向速度
        this.vx = this.speed * dir.x / len;
        //y方向速度
        this.vy = this.speed * dir.y / len;

        //到达下一个点的时间
        this.total_time = len / this.speed;
        //当前行走时间
        this.now_time = 0;
    },

    walkUpdate: function(dt){
        if(this.now_time >= this.total_time){
            return;
        }

        this.now_time += dt;
        //加上dt后可能大于total_time,减去多余的时间
        if(this.now_time > this.total_time){
            dt -= (this.now_time - this.total_time);
        }

        this.node.x += this.vx * dt;
        this.node.y += this.vy * dt;

        if(this.now_time >= this.total_time){
            this.next_step ++;
            this.walkNext();
        }
    },


    enemyToPool: function() {
        this.bloodBar.progress = 1;
        this.blood = B.game.enemyBlood;
        this.speed = B.game.enemySpeed;
        this.node.color = cc.color(255,255,255);
        B.enemyManager.destroyEnemy(this.node);
    },

    //怪物掉血
    hurt: function (power) {
        this.blood -= power;
        this.bloodBar.progress -= (1/B.game.enemyBlood)*power;
        // console.log("total blood " + B.game.enemyBlood);
        if (this.blood <= 0) {
            //cc.audioEngine.play(this.audioSource, false, 1);
            B.game.enemySource.play();
            this.game.gainCoin();
            this.game.gainScore();
            this.enemyToPool();
        }
    },

    onCollisionEnter:function(other, self){
        if(other.tag === 333){//碰到子弹
            // 根据子弹的属性
            // console.log("enemy109" + other.getComponent("bullet").state);
            switch(other.getComponent("bullet").state){
                case 0://正常
                    this.hurt(other.getComponent("bullet").power);
                    B.bulletManager.destroyBullet(other.node);
                    break;
                case 1://攻击增加
                    this.hurt(other.getComponent("bullet").power);
                    B.bulletManager.destroyBullet(other.node);
                    break;
                case 3://穿透
                    this.hurt(other.getComponent("bullet").power);
                    break;
                case 4://掉血
                    B.bulletManager.destroyBullet(other.node);
                    this.node.color = cc.color(0, 255, 0);
                    this.scheduleOnce(function() {
                        this.node.color = cc.color(255,255,255);                        
                    }, 4);

                    this.schedule(function(){
                        if(this.blood >= 1.2){
                            this.blood --;
                            this.bloodBar.progress -= (1/B.game.enemyBlood) * other.getComponent("bullet").power;
                        }else{
                            this.game.gainCoin();
                            this.game.gainScore();
                            this.enemyToPool();
                        }
                    }, 1, 3, 0);
                    
                    break;
                case 5://减速
                    B.bulletManager.destroyBullet(other.node);
                    this.node.color = cc.color(0, 255, 255);
                    this.scheduleOnce(function() {
                        this.node.color = cc.color(255, 255, 255);
                        this.speed = B.game.enemySpeed;                     
                    }, 7);
                    this.speed = this.speed * 0.8;
                    this.hurt(other.getComponent("bullet").power);
                    break;
                case 7://斩杀
                    B.bulletManager.destroyBullet(other.node);
                    if(this.blood <= B.game.enemyBlood * 0.3){
                        this.enemyToPool();
                    }
                    break;
            }
        } else if(other.tag === 222){//碰到爷爷
            this.enemyToPool();
            this.game.downFatherBlood();
        }
    },

    //dt 距离上一次刷新过去的时间
    update: function (dt) {
        if(this.state == State.WALK){
            this.walkUpdate(dt);
        }
    },
});
