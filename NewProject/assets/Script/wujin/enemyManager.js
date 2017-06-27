cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefab: cc.Prefab,
        enemyPrefab2: cc.Prefab,
        enemyLayer: cc.Node,
    },

    init: function(game) {
        this.game = game;
        B.enemyManager = this;
        this.enemyPool = new cc.NodePool();
        this.enemyPool2 = new cc.NodePool();
        let initCount = 15;
        //蛇精
        for (let i = 0; i < initCount; ++i) {
            let enemy = cc.instantiate(this.enemyPrefab); // 创建节点
            this.enemyPool.put(enemy); // 通过 putInPool 接口放入对象池
        }
        //蝎子精
        for (let i = 0; i < initCount; ++i) {
            let enemy2 = cc.instantiate(this.enemyPrefab2); // 创建节点
            this.enemyPool2.put(enemy2); // 通过 putInPool 接口放入对象池
        }
        // 初始产生5个敌人
        this.schedule(function(){
            this.createEnemy(1);
        }, 1, 4, 0);

    },

    createEnemy: function(enemyType) {
        if(enemyType == 1){
            let enemy = null;
            if (this.enemyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                enemy = this.enemyPool.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                enemy = cc.instantiate(this.enemyPrefab);
            }
            enemy.getComponent('enemy').init(this.game); //接下来就可以调用 enemy 身上的脚本进行初始化
            this.enemyLayer.addChild(enemy); // 将生成的敌人加入节点树
        }
        if(enemyType == 2){
            let enemy2 = null;
            if (this.enemyPool2.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                enemy2 = this.enemyPool2.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                enemy2 = cc.instantiate(this.enemyPrefab2);
            }
            enemy2.getComponent('enemy').init(this.game); //接下来就可以调用 enemy 身上的脚本进行初始化
            this.enemyLayer.addChild(enemy2); // 将生成的敌人加入节点树
        }

    },

    destroyEnemy: function(node) {
        if(B.game.enemyType == 1){
            this.enemyPool.put(node)
        }else{
            this.enemyPool2.put(node);
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
