cc.Class({
    extends: cc.Component,

    properties: {

    },

    init: function(){
        
    },

    findRoad: function(start_pos, end_pos) {
        this.posSub = start_pos.sub(end_pos);
        var angle = cc.pToAngle(this.posSub)/Math.PI*180;
        console.log(angle);
        this.node.rotation = angle;
        var action = cc.moveTo(1, end_pos);//1到达目的地的时间
        this.node.runAction(action);
    },

    onCollisionEnter: function(other, self){
        if(other.tag === 444){
            B.bulletManager.destroyBullet();
        }
    },

});