var State = cc.Enum({
    NONE: 0,
    RED: 1,
    YELLOW: 3,
    GREEN: 4,
    CYAN: 5,
    PURPLE: 7,
});

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1000,
        power: 1,        
        canTututu: false,// 穿透 黄
        canFire: false,// 灼烧掉血 绿 
        canFreeze: false,// 减速 青
        canBiubiu: false,// 快速攻击 紫
        canCut:false,//斩杀线以下直接消灭敌人
        state: {
            type: State,
            default: State.NONE,
            visible: true,
        },
    },

    findRoad: function(start_pos, end_pos, state) {
        switch(state) {
            case 0:
                this.power = 1;
                this.state = State.NONE;
                //cc.audioEngine.play(this.audioEngine0, false, 1);
                B.game.bulletSource0.play();
                break;
            case 1:
                this.power = 3;
                this.state = State.RED;
                //cc.audioEngine.play(this.audioEngine1, false, 1);
                B.game.bulletSource1.play();
                break;
            case 3:
                this.canTututu = true;
                this.state = State.YELLOW;
                //cc.audioEngine.play(this.audioEngine2, false, 1);
                B.game.bulletSource2.play();
                break;
            case 4:
                this.canFire = true;
                this.state = State.GREEN;
                //cc.audioEngine.play(this.audioEngine3, false, 1);
                B.game.bulletSource3.play();
                break;
            case 5:
                this.canFreeze = true;
                this.state = State.CYAN;
                //cc.audioEngine.play(this.audioEngine4, false, 1);
                B.game.bulletSource4.play();
                break;
            case 7:
                //cc.audioEngine.play(this.audioEngine5, false, 1);
                this.canCut = true;
                this.state = State.PURPLE;
                B.game.bulletSource5.play();
                break;
            case 2:
                //cc.audioEngine.play(this.audioEngine6, false, 1);
                B.game.bulletSource6.play();
                break;
        }

        this.start_pos = start_pos;
        this.end_pos = end_pos;

        this.posSub = end_pos.sub(start_pos);
        var len = cc.pLength(this.posSub);

        this.speed_x = this.speed * this.posSub.x / len;
        this.speed_y = this.speed * this.posSub.y / len;

        var angle = cc.pToAngle(this.posSub)/Math.PI*180;
        this.node.rotation = -angle-90;
    },

    onCollisionEnter: function(other, self){
        if(other.tag === 444){
            B.bulletManager.destroyBullet();
        }
    },

    update:function(dt){
        //console.log("帧率"+dt);
        this.node.x += this.speed_x * dt
        this.node.y += this.speed_y * dt;
    }

});