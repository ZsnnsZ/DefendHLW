var bulletManager = cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: cc.Prefab,
        bulletLayer: cc.Node,
    },

    init: function(game) {
        this.game = game;
        B.bulletManager = this;
        this.bulletPool = new cc.NodePool();
        let initCount = 10;
        for (let i = 0; i < initCount; ++i) {
            let bullet = cc.instantiate(this.bulletPrefab); // 创建节点
            this.bulletPool.put(bullet); // 通过 putInPool 接口放入对象池
        }
    },

    createBullet: function() {
        let bullet = null;
        if (this.bulletPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            bullet = this.bulletPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            bullet = cc.instantiate(this.bulletPrefab);
        }
        this.bulletLayer.addChild(bullet); // 将生成的子弹加入节点树
        return bullet;
    },

    destroyBullet: function(node) {
        this.bulletPool.put(node);
    }
});
