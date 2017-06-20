var State = cc.Enum({
    NONE:0,
    WALK:1,
    SLOW:2,
    FREEZE:3,
    DEAD:4,
});

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 100,
        state: {
            type:State,
            default:State.NONE,
            visible:false,
        },
    },

    // use this for initialization
    init: function(game) {
        this.game = game;
        this.state = State.WALK;
        this.find_road();
    },

    find_road: function() {
        //查找挂载了wujinBG的节点
        var bg = cc.find("Canvas/wujinBG")
        //查找组件
        var map_inst = bg.getComponent("wujinBG");
        this.roadset = map_inst.get_road_set();
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
        this.walk_next();
    },

    walk_next: function() {
        if(this.next_step >= this.roadset.length){
            this.state = State.DEAD;
            return;
        }

        this.state = State.WALK;
        var start_pos = this.node.getPosition();
        // console.log(start_pos.x);
        var dst_pos = this.roadset[this.next_step];
        dst_pos.x -= 480;
        dst_pos.y -= 270;
        // console.log(dst_pos);
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

    walk_update: function(dt){
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
            this.walk_next();
        }
    },

    //dt 距离上一次刷新过去的时间
    update: function (dt) {
        if(this.state == State.WALK){
            this.walk_update(dt);
        }
    },
});
