var State = cc.Enum({
    NONE: 0,
    RED: 1,
    YELLOW: 3,
    GREEN: 4,
    CYAN: 5,
});

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 300,
        power: 1,        
        canTututu: false,// 穿透 黄
        canFire: false,// 灼烧掉血 绿 
        canFreeze: false,// 减速 青
        canBiubiu: false,// 快速攻击 紫
        
        state: {
            type: State,
            default: State.NONE,
            visible: true,
        },


        audioSource0: {
            url: cc.AudioClip,
            default: null,
        },
        audioSource1: {
            url: cc.AudioClip,
            default: null,
        },
        audioSource2: {
            url: cc.AudioClip,
            default: null,
        },
        audioSource3: {
            url: cc.AudioClip,
            default: null,
        },
        audioSource4: {
            url: cc.AudioClip,
            default: null,
        },
        audioSource5: {
            url: cc.AudioClip,
            default: null,
        },
        audioSource6: {
            url: cc.AudioClip,
            default: null,
        },
    },

    findRoad: function(start_pos, end_pos, state) {
        switch(state) {
            case 0:
                this.power = 1;
                this.state = State.NONE;
                cc.audioEngine.play(this.audioSource0, false, 1);
                break;
            case 1:
                this.power = 2;
                this.state = State.RED;
                cc.audioEngine.play(this.audioSource1, false, 1);
                break;
            case 3:
                this.canTututu = true;
                this.state = State.YELLOW;
                cc.audioEngine.play(this.audioSource2, false, 1);
                break;
            case 4:
                this.canFire = true;
                this.state = State.GREEN;
                cc.audioEngine.play(this.audioSource3, false, 1);
                break;
            case 5:
                this.canFreeze = true;
                this.state = State.CYAN;
                cc.audioEngine.play(this.audioSource4, false, 1);
                break;
            case 7:
                cc.audioEngine.play(this.audioSource5, false, 1);
                break;
            case 2:
                cc.audioEngine.play(this.audioSource6, false, 1);
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
        this.node.x += this.speed_x * dt
        this.node.y += this.speed_y * dt;
    }

});